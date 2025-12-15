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
    });

    afterEach(() => {
        cleanup();
        global.fetch = originalFetch;
        global.window.scrollTo = originalScrollTo;
        mock.reset();
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
        // Note: Shadcn Select component trigger contains the placeholder text "Download Audio"
        const downloadAudio = screen.getByText("Download Audio");
        assert.ok(downloadAudio);

        // Video options exist too
        const downloadVideo = screen.getByText("Download Video");
        assert.ok(downloadVideo);
    });
});
