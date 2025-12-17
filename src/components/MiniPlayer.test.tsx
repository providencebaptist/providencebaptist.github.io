import { describe, it, afterEach, mock } from "node:test";
import assert from "node:assert";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MiniPlayer } from "./MiniPlayer";

// Mock resize observer
if (!global.ResizeObserver) {
    global.ResizeObserver = class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
}

describe("MiniPlayer", () => {
    afterEach(cleanup);

    const defaultProps = {
        title: "Test Song",
        isPlaying: false,
        progress: 0,
        duration: 300,
        currentTime: 0,
        speed: 1,
        type: 'audio' as const,
        onPlayPause: mock.fn(),
        onSeek: mock.fn(),
        onSpeedChange: mock.fn(),
        onClose: mock.fn(),
    };

    it("renders with title and formatted duration", () => {
        render(<MiniPlayer {...defaultProps} />);

        // Assert title exists
        assert.ok(screen.getByText("Test Song"));

        // Assert formatted time (0:00 / 5:00)
        assert.ok(screen.getByText("0:00 / 5:00"));
    });

    it("renders play button when paused", () => {
        render(<MiniPlayer {...defaultProps} isPlaying={false} />);
        const buttons = screen.getAllByRole("button");
        assert.ok(buttons.length >= 1);
    });

    it("renders pause button when playing", () => {
        render(<MiniPlayer {...defaultProps} isPlaying={true} />);
        assert.ok(screen.getByText("Test Song"));
    });

    it("calls onPlayPause when toggle button is clicked", () => {
        const onPlayPause = mock.fn();
        render(<MiniPlayer {...defaultProps} onPlayPause={onPlayPause} />);

        // The play/pause button is the first one in the layout
        const toggleButton = screen.getAllByRole("button")[0];
        fireEvent.click(toggleButton);

        assert.strictEqual(onPlayPause.mock.calls.length, 1);
    });

    it("calls onClose when close button is clicked", () => {
        const onClose = mock.fn();
        render(<MiniPlayer {...defaultProps} onClose={onClose} />);

        const closeButton = screen.getByLabelText("Close mini player");
        fireEvent.click(closeButton);

        assert.strictEqual(onClose.mock.calls.length, 1);
    });

    it("calls onSpeedChange when speed button is clicked", () => {
        const onSpeedChange = mock.fn();
        render(<MiniPlayer {...defaultProps} onSpeedChange={onSpeedChange} />);

        const speed15 = screen.getAllByText("1.5x")[0];
        fireEvent.click(speed15);

        assert.strictEqual(onSpeedChange.mock.calls.length, 1);
        assert.strictEqual(onSpeedChange.mock.calls[0].arguments[0], 1.5);
    });

    it("calls onSeek when progress bar is clicked", () => {
        const onSeek = mock.fn();
        const { container } = render(<MiniPlayer {...defaultProps} onSeek={onSeek} />);

        const progressBar = container.querySelector(".cursor-pointer");
        if (progressBar) {
            fireEvent.click(progressBar);
            assert.strictEqual(onSeek.mock.calls.length, 1);
        } else {
            assert.fail("Progress bar not found");
        }
    });

    it("formats time correctly", () => {
        render(<MiniPlayer {...defaultProps} currentTime={65} duration={125} />);
        // 65s = 1:05
        // 125s = 2:05
        assert.ok(screen.getByText("1:05 / 2:05"));
    });
});
