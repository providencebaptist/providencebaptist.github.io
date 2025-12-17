import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert";
import { screen, waitFor, cleanup, act, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import { Routes, Route } from "react-router-dom";
import SermonDetail from "./SermonDetail";

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

describe("SermonDetail Page", () => {
    // Setup fetch mock
    const originalFetch = global.fetch;
    const originalScrollTo = global.window.scrollTo;

    // Mock HTMLMediaElement methods
    beforeEach(() => {
        cleanup();
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

        global.window.scrollTo = mock.fn();

        Object.defineProperty(HTMLMediaElement.prototype, 'play', {
            configurable: true,
            value: mock.fn(async () => { }),
        });
        Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
            configurable: true,
            value: mock.fn(),
        });
    });

    afterEach(() => {
        cleanup();
        global.fetch = originalFetch;
        global.window.scrollTo = originalScrollTo;
        mock.reset();
        // Restore prototypes if modified heavily, though JSDOM resets often
    });

    it("renders SermonDetail page and fetches data", async () => {
        await act(async () => {
            renderWithProviders(
                <Routes>
                    <Route path="/sermons/:id" element={<SermonDetail />} />
                </Routes>,
                { route: '/sermons/123' }
            );
        });

        // Wait for loading to finish and content to appear
        const sermonTitle = await screen.findAllByText("Test Sermon");
        assert.ok(sermonTitle.length > 0);

        assert.ok(screen.getByText("Test Speaker"));
        assert.ok(screen.getByText("About This Message"));
    });

    it("renders SermonDetail page not found state", async () => {
        await act(async () => {
            renderWithProviders(
                <Routes>
                    <Route path="/sermons/:id" element={<SermonDetail />} />
                </Routes>,
                { route: '/sermons/999' } // ID not in mock data
            );
        });

        const notFound = await screen.findByText("Sermon Not Found");
        assert.ok(notFound);
    });
    it("renders Audio and Video players and interacts", async () => {
        await act(async () => {
            renderWithProviders(
                <Routes>
                    <Route path="/sermons/:id" element={<SermonDetail />} />
                </Routes>,
                { route: '/sermons/123' }
            );
        });

        // Check for Audio Player
        const audioTitle = await screen.findByText("Listen to Sermon");
        assert.ok(audioTitle);

        // Play button (Audio)
        const playAudioBtn = screen.getByText("Play Audio");
        assert.ok(playAudioBtn);
        // We can't easily test actual audio playback in JSDOM, but we can click the button
        await act(async () => {
            fireEvent.click(playAudioBtn);
        });
        // Should change to Pause Audio
        assert.ok(screen.getByText("Pause Audio"));

        // Check for Video Player
        const videoTitle = await screen.findByText("Watch Sermon");
        assert.ok(videoTitle);

        // Play button (Video)
        const playVideoBtn = screen.getByText("Play Video");
        assert.ok(playVideoBtn);

        await act(async () => {
            fireEvent.click(playVideoBtn);
        });
        assert.ok(screen.getByText("Pause Video"));
    });

    it("renders download options", async () => {
        await act(async () => {
            renderWithProviders(
                <Routes>
                    <Route path="/sermons/:id" element={<SermonDetail />} />
                </Routes>,
                { route: '/sermons/123' }
            );
        });

        await screen.findByText("Test Sermon");

        // Check for download dropdowns or buttons
        // In the mock data, we have audio options, so "Download Audio" select trigger should be there
        const downloadAudio = screen.getByText("Download Audio");
        assert.ok(downloadAudio);

        // Video options exist too
        const downloadVideo = screen.getByText("Download Video");
        assert.ok(downloadVideo);
    });

    it("controls playback speed and seeking", async () => {
        await act(async () => {
            renderWithProviders(
                <Routes>
                    <Route path="/sermons/:id" element={<SermonDetail />} />
                </Routes>,
                { route: '/sermons/123' }
            );
        });

        await screen.findByText("Test Sermon");

        // Audio Speed Controls
        const speedButtons = screen.getAllByText("1.5x");
        assert.ok(speedButtons.length >= 1);

        await act(async () => {
            fireEvent.click(speedButtons[0]);
        });

        // Seek Audio
        // Mock HTMLMediaElement duration to avoid NaN
        Object.defineProperty(HTMLMediaElement.prototype, 'duration', {
            configurable: true,
            get() { return 100; }
        });
        const audioProgressBar = screen.getByTestId("audio-progress-bar");

        // Mock getBoundingClientRect
        const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
        Element.prototype.getBoundingClientRect = mock.fn(() => ({
            top: 0,
            bottom: 0,
            left: 0,
            right: 100,
            width: 100,
            height: 10,
            x: 0,
            y: 0,
            toJSON: () => { }
        }));

        await act(async () => {
            // Click halfway
            fireEvent.click(audioProgressBar, { clientX: 50 });
        });

        // Video interactions if video exists
        const videoProgressBar = screen.queryByTestId("video-progress-bar");
        if (videoProgressBar) {
            await act(async () => {
                fireEvent.click(videoProgressBar, { clientX: 50 });
            });

            if (speedButtons.length > 1) {
                await act(async () => {
                    fireEvent.click(speedButtons[1]);
                });
            }
        }

        // Restore mock
        Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });
    it("handles time updates and saves playback position", async () => {
        // Mock localStorage via Storage prototype to ensure it catches calls
        const setItemSpy = mock.fn();
        const getItemSpy = mock.fn(() => "10.0");
        const originalSetItem = Storage.prototype.setItem;
        const originalGetItem = Storage.prototype.getItem;

        Storage.prototype.setItem = setItemSpy;
        Storage.prototype.getItem = getItemSpy;

        await act(async () => {
            renderWithProviders(
                <Routes>
                    <Route path="/sermons/:id" element={<SermonDetail />} />
                </Routes>,
                { route: '/sermons/123' }
            );
        });

        await screen.findByText("Listen to Sermon");

        const audioEl = document.querySelector('audio') as HTMLAudioElement;
        assert.ok(audioEl, "Audio element not found");

        // Mock duration/currentTime
        Object.defineProperty(audioEl, 'duration', { configurable: true, get: () => 100 });

        // Trigger loadedmetadata
        await act(async () => {
            fireEvent.loadedMetadata(audioEl);
        });

        // Trigger timeUpdate
        await act(async () => {
            audioEl.currentTime = 20;
            fireEvent.timeUpdate(audioEl);
        });

        // Trigger timeUpdate at divisible by 5 for saving (25)
        await act(async () => {
            audioEl.currentTime = 25;
            fireEvent.timeUpdate(audioEl);
        });

        const callArgs = setItemSpy.mock.calls.flatMap(c => c.arguments);
        const hasSaved = callArgs.some(arg => typeof arg === 'string' && arg.includes('sermon-123-audio-position'));
        assert.ok(hasSaved, "Did not save playback position to localStorage");

        // Restore localStorage
        Storage.prototype.setItem = originalSetItem;
        Storage.prototype.getItem = originalGetItem;
    });

    it("toggles MiniPlayer on scroll", async () => {
        await act(async () => {
            renderWithProviders(
                <Routes>
                    <Route path="/sermons/:id" element={<SermonDetail />} />
                </Routes>,
                { route: '/sermons/123' }
            );
        });

        await screen.findByText("Listen to Sermon");

        // Mock getBoundingClientRect
        const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
        Element.prototype.getBoundingClientRect = mock.fn(() => ({
            top: -200, // Out of view
            bottom: -100,
            left: 0,
            right: 0,
            width: 100,
            height: 100,
            x: 0,
            y: 0,
            toJSON: () => { }
        }));

        // Need to be playing for mini player to show
        const playAudioBtn = screen.getByText("Play Audio");
        await act(async () => {
            fireEvent.click(playAudioBtn);
        });

        // Trigger scroll
        await act(async () => {
            fireEvent.scroll(window, { target: { scrollY: 500 } });
        });

        // Check for MiniPlayer presence
        // MiniPlayer has a "Close Player" button or title? 
        // Looking at MiniPlayer.tsx, it renders a card.
        // It has aria-label="Close mini player" on close button (added in previous session).
        const closeBtn = await screen.findByLabelText("Close mini player");
        assert.ok(closeBtn);

        // Video logic
        // Stop audio
        await act(async () => {
            fireEvent.click(screen.getByText("Pause Audio"));
        });
        // Start video
        await act(async () => {
            fireEvent.click(screen.getByText("Play Video"));
        });
        // Scroll again
        await act(async () => {
            fireEvent.scroll(window);
        });
        assert.ok(screen.getByLabelText("Close mini player"));

        // Restore
        Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });
});
