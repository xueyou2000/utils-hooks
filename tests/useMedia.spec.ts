import { cleanup, renderHook } from "react-hooks-testing-library";
import useMedia from "../src/useMedia";

describe("useMedia", () => {
    afterEach(cleanup);

    test("match media", () => {
        const mockMatchMedia = jest
            // 默认
            .fn(() => ({ matches: false, addListener: jest.fn(), removeListener: jest.fn() }))
            // 第一次结果
            .mockImplementationOnce(() => ({ matches: true, addListener: jest.fn(), removeListener: jest.fn() }))
            // 第二次结果
            .mockImplementationOnce(() => ({ matches: false, addListener: jest.fn(), removeListener: jest.fn() }));

        // Tips: mock window.matchMedia
        // Object.defineProperty(window, "matchMedia", mockMatchMedia);
        (global as any).matchMedia = mockMatchMedia;

        const { result } = renderHook(() => useMedia(["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"], [5, 4, 3], 2));
        const count = result.current;
        expect(count).toBe(5);
    });

    test("default value", () => {
        const mockMatchMedia = jest.fn(() => ({ matches: false, addListener: jest.fn(), removeListener: jest.fn() }));
        (global as any).matchMedia = mockMatchMedia;

        const { result } = renderHook(() => useMedia(["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"], [5, 4, 3], 2));
        const count = result.current;
        expect(count).toBe(2);
    });
});
