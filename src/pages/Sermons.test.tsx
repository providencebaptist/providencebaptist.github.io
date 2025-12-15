import { test, mock } from "node:test";
import assert from "node:assert";
import { screen, cleanup, act, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Sermons from "./Sermons";

// Mock data matches SermonApiResponse interface
const mockSermonsData = {
    results: [
        {
            sermonID: "123",
            displayTitle: "Test Sermon",
            preachDate: "2023-01-01",
            speaker: {
                displayName: "Test Speaker",
                bio: "Test Bio",
                portraitURL: "http://example.com/pic.jpg"
            },
            bibleText: "John 3:16",
            broadcaster: {
                bibleVersion: "KJV"
            },
            series: {
                displayTitle: "Test Series"
            },
            media: {
                audio: [
                    {
                        bitrate: 128,
                        downloadURL: "http://example.com/audio.mp3",
                        fileSizeBytes: 1000000,
                        streamURL: "http://example.com/stream.mp3"
                    }
                ],
                video: [
                    {
                        bitrate: 1000,
                        downloadURL: "http://example.com/video.mp4",
                        fileSizeBytes: 5000000,
                        streamURL: "http://example.com/stream.mp4",
                        adaptiveBitrate: true,
                        thumbnailImageURL: "http://example.com/thumb.jpg"
                    }
                ]
            },
            commentCount: 5,
            downloadCount: 10,
            videoDownloadCount: 20,
            audioDurationSeconds: 3600,
            moreInfoText: "Test Description",
            eventType: "Sunday - AM"
        }
    ]
};

// Larger mock data set for pagination testing
const mockPaginationData = {
    results: Array.from({ length: 50 }, (_, i) => ({
        sermonID: `${i}`,
        displayTitle: `Sermon ${i + 1}`,
        preachDate: "2023-01-01",
        speaker: { displayName: "Test Speaker" },
        bibleText: "John 3:16",
        broadcaster: { bibleVersion: "KJV" },
        media: {},
        audioDurationSeconds: 3600,
        eventType: "Sunday - AM"
    }))
};

test("Sermons Page Suite", async (t) => {
    // Setup fetch mock
    const originalFetch = global.fetch;

    const originalScrollTo = global.window.scrollTo;

    // Helper to setup environment before each subtest
    const setup = () => {
        cleanup();
        global.window.scrollTo = mock.fn();
    };

    // Helper to teardown after each subtest
    const teardown = () => {
        cleanup();
        global.fetch = originalFetch;
        global.window.scrollTo = originalScrollTo;
        mock.reset();
    };

    await t.test("renders Sermons page and fetches data", async () => {
        setup();
        // Mock fetch specifically for this test
        global.fetch = mock.fn(async (url) => {
            if (url.toString().includes('sermons-data.json')) {
                return {
                    json: async () => mockSermonsData,
                    ok: true,
                    status: 200,
                } as Response;
            }
            return originalFetch(url);
        });

        await act(async () => {
            renderWithProviders(<Sermons />);
        });

        // Ensure title is present first
        assert.ok(screen.getByText("Sermons & Messages"));

        // Wait longer for async data
        const sermonTitle = await screen.findAllByText("Test Sermon", {}, { timeout: 3000 });

        assert.ok(sermonTitle.length > 0);

        assert.ok(screen.getAllByText(/Test Speaker/));
        assert.ok(screen.getAllByText(/Test Series/));

        teardown();
    });

    await t.test("handles Sermon page fetch error", async () => {
        setup();
        global.fetch = mock.fn(async () => {
            throw new Error("Network error");
        });

        await act(async () => {
            renderWithProviders(<Sermons />);
        });

        // Should show empty state message
        const emptyMessage = await screen.findByText("No sermons found in this category.");
        assert.ok(emptyMessage);

        teardown();
    });
    await t.test("filters sermons by category from URL", async () => {
        setup();
        global.fetch = mock.fn(async (url) => {
            if (url.toString().includes('sermons-data.json')) {
                return {
                    json: async () => mockSermonsData,
                    ok: true,
                    status: 200,
                } as Response;
            }
            return originalFetch(url);
        });

        await act(async () => {
            // Render with a specific category query param
            renderWithProviders(<Sermons />, { route: '/sermons?category=Sunday+-+AM' });
        });

        // Should NOT see No sermons found if the category matches
        const sermonTitle = await screen.findAllByText("Test Sermon", {}, { timeout: 3000 });
        assert.ok(sermonTitle.length > 0);

        // Assert that the category tab is active/selected (rendering dependent)
        // Assuming visual indication or verify filtered results logic matches

        teardown();
    });

    await t.test("handles search functionality", async () => {
        setup();
        global.fetch = mock.fn(async (url) => {
            if (url.toString().includes('sermons-data.json')) {
                return {
                    json: async () => mockSermonsData,
                    ok: true,
                    status: 200,
                } as Response;
            }
            return originalFetch(url);
        });

        await act(async () => {
            renderWithProviders(<Sermons />);
        });

        await screen.findAllByText("Test Sermon", {}, { timeout: 3000 });

        // Get search input
        const searchInput = screen.getByPlaceholderText(/Search sermons/i);
        assert.ok(searchInput);

        // Type in a mismatch search
        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'NonExistentTerm' } });
        });

        // Should see "No sermons found"
        const emptyState = await screen.findByText("No sermons found in this category.");
        assert.ok(emptyState);

        // Clear search
        await act(async () => {
            fireEvent.change(searchInput, { target: { value: '' } });
        });

        // Should see sermon again
        const sermonTitle = await screen.findAllByText("Test Sermon");
        assert.ok(sermonTitle.length > 0);

        teardown();
    });

    await t.test("handles pagination", async () => {
        setup();
        global.fetch = mock.fn(async (url) => {
            if (url.toString().includes('sermons-data.json')) {
                return {
                    json: async () => mockPaginationData,
                    ok: true,
                    status: 200,
                } as Response;
            }
            return originalFetch(url);
        });

        await act(async () => {
            renderWithProviders(<Sermons />);
        });

        // Wait for first page items
        await screen.findAllByText("Sermon 1", {}, { timeout: 3000 });

        // Find 'Next' button (pagination renders next button if > 1 page)
        // Note: Shadcn pagination buttons might need specific selectors if text isn't displayed directly
        // But usually "Next" text is there. Let's check for aria-label or text.
        const nextButtons = screen.getAllByRole("link", { name: /Go to next page/i });
        // Or looking at the code, it uses PaginationNext which might render text or icon. 
        // Let's assume there is a next button we can find. Screen.getAllByRole('link') might find page numbers too.
        // PaginationNext normally has aria-label="Go to next page"

        const nextButton = nextButtons[0]; // Assuming valid
        assert.ok(nextButton);

        // Click next
        await act(async () => {
            fireEvent.click(nextButton);
        });

        // Should see Sermon 21 (page 2)
        const sermonPage2 = await screen.findAllByText("Sermon 21");
        assert.ok(sermonPage2.length > 0);

        teardown();
    });
});
