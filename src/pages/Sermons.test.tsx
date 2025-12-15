import { test, mock } from "node:test";
import assert from "node:assert";
import { screen, cleanup, act } from "@testing-library/react";
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
});
