import 'global-jsdom/register';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor() { }
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { },
        removeListener: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => { },
    }),
});

// Mock PointerEvents (sometimes needed for Radix UI)
// Ensure it extends the window.Event from JSDOM
if (typeof window !== 'undefined' && window.Event) {
    global.PointerEvent = class PointerEvent extends window.Event {
        constructor(type, props) {
            super(type, props);
        }
    }
}

// Mock CustomEvent
if (typeof window !== 'undefined' && window.CustomEvent) {
    global.CustomEvent = window.CustomEvent;
}

// Mock global fetch
global.fetch = (url) => {
    // console.log('Mock fetch called for:', url);
    return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(''),
        status: 200,
    });
};

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = function () { };

console.log("JSDOM environment initialized");
