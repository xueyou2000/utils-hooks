import React, { useRef } from "react";
import { renderHook } from "react-hooks-testing-library";
import { fireEvent, render } from "react-testing-library";
import { useTrigger } from "../src";

describe("useTrigger", () => {
    test("hover trigger", () => {
        var state = false;
        const { result } = renderHook(() => useRef());
        const fn = jest.fn((act, actived: boolean) => {
            state = actived;
        });
        const { rerender } = renderHook(() => useTrigger(result.current, ["hover"], ["hover"], fn));

        const warpper = render(<div data-testid="div" ref={result.current} />);
        const div = warpper.getByTestId("div");

        rerender();

        fireEvent(
            div,
            new MouseEvent("mouseenter", {
                bubbles: true,
                cancelable: true
            })
        );
        expect(fn).toBeCalled();
        fireEvent(
            div,
            new MouseEvent("mouseenter", {
                bubbles: true,
                cancelable: true
            })
        );
        expect(state).toBeTruthy();

        fireEvent(
            div,
            new MouseEvent("mouseleave", {
                bubbles: true,
                cancelable: true
            })
        );

        expect(state).toBeFalsy();
    });

    test("click trigger", () => {
        var state = false;
        const { result } = renderHook(() => useRef());
        const fn = jest.fn((act, actived: boolean) => {
            state = actived;
        });
        const { rerender } = renderHook(() => useTrigger(result.current, ["click"], ["click"], fn));

        const warpper = render(<div data-testid="div" ref={result.current} />);
        const div = warpper.getByTestId("div");
        rerender();
        fireEvent.click(div);
        expect(fn).toBeCalled();
        fireEvent.click(div);
        expect(state).toBeFalsy();

        fireEvent.click(div);

        expect(state).toBeTruthy();
    });

    test("focus trigger", () => {
        var state = false;
        const { result } = renderHook(() => useRef());
        const fn = jest.fn((act, actived: boolean) => {
            state = actived;
        });
        const { rerender } = renderHook(() => useTrigger(result.current, ["focus"], ["focus"], fn));

        const warpper = render(<div data-testid="div" ref={result.current} />);
        const div = warpper.getByTestId("div");
        rerender();
        fireEvent.focus(div);
        expect(fn).toBeCalled();
        fireEvent.focus(div);
        expect(state).toBeTruthy();

        fireEvent.blur(div);

        expect(state).toBeFalsy();
    });

    test("contextMenu trigger", () => {
        var state = false;
        const { result } = renderHook(() => useRef());
        const fn = jest.fn((act, actived: boolean) => {
            state = actived;
        });
        const { rerender } = renderHook(() => useTrigger(result.current, ["contextMenu"], ["click"], fn));

        const warpper = render(<div data-testid="div" ref={result.current} />);
        const div = warpper.getByTestId("div");
        rerender();
        fireEvent.contextMenu(div);
        expect(fn).toBeCalled();
        fireEvent.click(div);
        expect(state).toBeFalsy();
    });
});
