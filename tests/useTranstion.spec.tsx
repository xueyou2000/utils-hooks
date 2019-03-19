import React from 'react';
import { cleanup, renderHook } from "react-hooks-testing-library";
import { render, fireEvent } from 'react-testing-library'
import { useTranstion, UNMOUNTED, ENTERING, ENTERED, EXITING, EXITED } from "../src";


describe('useTranstion', () => {
    afterEach(cleanup);

    test('init state should be unmounted', () => {
        const { result } = renderHook(() => useTranstion(false, true));
        const [ref] = result.current;
        render(<div ref={ref} data-testid="transtion-div" />);
        const [_, state] = result.current;
        expect(state).toBe(UNMOUNTED);
    });

    test('init transtion state should be entered', () => {
        const { result, rerender } = renderHook((visible: boolean) => useTranstion(visible, true));
        const [ref] = result.current;
        render(<div ref={ref} data-testid="transtion-div" />);

        rerender(true);

        const [_, state] = result.current;
        expect(state).toBe(ENTERED);
    });


    test('change state to be entered', () => {
        const { result, rerender } = renderHook((visible: boolean) => useTranstion(visible), { initialProps: false });
        const { getByTestId } = render(<div ref={result.current[0]} data-testid="transtion-div" />);

        // Tips: 通过设为null, 来跳过useEffect里的初次缓存, 模拟真实场景下某些不需要初始动画
        rerender(null);
        rerender(true);
        expect(result.current[1]).toBe(ENTERING);

        // 模拟过度完毕事件
        fireEvent.transitionEnd(getByTestId('transtion-div'));
        expect(result.current[1]).toBe(ENTERED);
    });

    test('change state to be exited', () => {
        const { result, rerender } = renderHook((visible: boolean) => useTranstion(visible), { initialProps: true });
        const { getByTestId } = render(<div ref={result.current[0]} data-testid="transtion-div" />);

        // Tips: 通过设为null, 来跳过useEffect里的初次缓存, 模拟真实场景下某些不需要初始动画
        rerender(null);
        rerender(false);
        expect(result.current[1]).toBe(EXITING);

        // 模拟过度完毕事件
        fireEvent.transitionEnd(getByTestId('transtion-div'));
        expect(result.current[1]).toBe(EXITED);
    });

});