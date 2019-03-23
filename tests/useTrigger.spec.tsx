import React from "react";
import { renderHook } from "react-hooks-testing-library";
import { fireEvent, render } from "react-testing-library";
import { useTrigger } from "../src";

describe("useTrigger", () => {
    test("hover trigger", () => {
        var state = false;
        const fn = jest.fn((actived: boolean) => {
            state = actived;
        });
        const { result, rerender } = renderHook(() => useTrigger(["hover"], ["hover"], fn));

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
        const fn = jest.fn((actived: boolean) => {
            state = actived;
            console.log("设置state", actived);
        });
        const { result, rerender } = renderHook(() => useTrigger(["click"], ["click"], fn));

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
        const fn = jest.fn((actived: boolean) => {
            state = actived;
        });
        const { result, rerender } = renderHook(() => useTrigger(["focus"], ["focus"], fn));

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
        const fn = jest.fn((actived: boolean) => {
            state = actived;
        });
        const { result, rerender } = renderHook(() => useTrigger(["contextMenu"], ["click"], fn));

        const warpper = render(<div data-testid="div" ref={result.current} />);
        const div = warpper.getByTestId("div");
        rerender();
        fireEvent.contextMenu(div);
        expect(fn).toBeCalled();
        fireEvent.click(div);
        expect(state).toBeFalsy();
    });
});
