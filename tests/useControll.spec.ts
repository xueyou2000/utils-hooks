import { cleanup, renderHook, act } from "react-hooks-testing-library";
import { useControll } from "../src";

describe("useControll", () => {
    afterEach(cleanup);

    test("value by default", () => {
        const { result } = renderHook(() => useControll({}, "value", "defaultValue", "abc"));
        const [value, , isControll] = result.current;

        expect(value).toBe("abc");
        expect(isControll).toBeFalsy();
    });

    test("defaultValue by checked", () => {
        const { result, rerender } = renderHook((props) => useControll(props, "checked", "defaultChecked"), { initialProps: { checked: true } });
        const [value, , isControll] = result.current;

        expect(value).toBeTruthy();
        expect(isControll).toBeTruthy();

        rerender({ checked: false });

        const [next_value, , next_isControll] = result.current;
        expect(next_value).toBeFalsy();
        expect(next_isControll).toBeTruthy();
    });

    test("defaultValue by defaultChecked", () => {
        const { result } = renderHook((props) => useControll(props, "checked", "defaultChecked"), { initialProps: { defaultChecked: true } });
        const [value, , isControll] = result.current;

        expect(value).toBeTruthy();
        expect(isControll).toBeFalsy();
    });

    test("should use setState value", () => {
        const { result } = renderHook(() => useControll<boolean>({ defaultChecked: true }, "checked", "defaultChecked"));
        const [, setValue] = result.current;

        act(() => setValue(false));
        const [value] = result.current;
        expect(value).toBeFalsy();
    });
});
