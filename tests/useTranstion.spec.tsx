import React from 'react';
import { cleanup, renderHook } from "react-hooks-testing-library";
import { render, fireEvent } from 'react-testing-library'
import useTranstion, { UNMOUNTED, ENTERING, ENTERED, EXITING, EXITED } from "../src/useTranstion";


describe('useTranstion', () => {
    afterEach(cleanup);

    test('init state should be unmounted', () => {
        const { result } = renderHook(() => useTranstion(false));
        const [_, state] = result.current;
        expect(state).toBe(UNMOUNTED);
    });

    test('change state to be entered', () => {
        const { result, rerender } = renderHook((visible: boolean) => useTranstion(visible));
        const ref = result.current[0];

        const { getByTestId } = render(<div ref={ref} data-testid="transtion-div" />);
        rerender(true);
        expect(result.current[1]).toBe(ENTERING);

        // 模拟过度完毕事件
        fireEvent.transitionEnd(getByTestId('transtion-div'));
        expect(result.current[1]).toBe(ENTERED);
    });

    test('change state to be exited', () => {
        const { result, rerender } = renderHook((visible: boolean) => useTranstion(visible));
        const ref = result.current[0];

        const { getByTestId } = render(<div ref={ref} data-testid="transtion-div" />);
        rerender(false);
        expect(result.current[1]).toBe(EXITING);

        // 模拟过度完毕事件
        fireEvent.transitionEnd(getByTestId('transtion-div'));
        expect(result.current[1]).toBe(EXITED);
    });

});