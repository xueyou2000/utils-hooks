import { cleanup, renderHook, act } from "react-hooks-testing-library";
import { useGlobalState, MonitorState } from "../src";

describe("useGlobalState", () => {
    afterEach(cleanup);

    test("get MonitorState value", () => {
        const store = new MonitorState(12);
        // default value
        expect(store.getState()).toBe(12);
        // act
        store.setState(55);
        expect(store.getState()).toBe(55);
    });

    test("subscribe MonitorState", () => {
        const store = new MonitorState(1);
        const fn = jest.fn();

        const unsubscribe = store.subscribe(fn);
        store.setState(33);
        expect(fn).toBeCalled();

        store.setState(33);

        expect(fn.mock.calls.length).toBe(2);

        // 测试取消订阅
        unsubscribe();

        store.setState(33);

        expect(fn.mock.calls.length).toBe(2);
    });

    // test("test useGlobalState", () => {
    //     const store = new MonitorState(12);
    //     const { result } = renderHook(() => useGlobalState(store));
    //     const [value, setValue] = result.current;

    //     expect(value).toBe(12);

    //     act(() => setValue(55));

    //     expect(result.current[0]).toBe(55);
    // });
});
