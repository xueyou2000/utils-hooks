import { renderHook } from "react-hooks-testing-library";
import { fireEvent } from "react-testing-library";
import { useOutsideClick } from "../src";

describe("useOutsideClick", () => {
    test("should be outside click", () => {
        const fn = jest.fn();
        const div = document.createElement("div");
        const div2 = document.createElement("div");
        document.body.append(div);
        document.body.append(div2);

        renderHook(() => useOutsideClick([div], fn));

        fireEvent.click(div);

        expect(fn.mock.calls.length).toBe(0);

        fireEvent.click(div2);

        expect(fn).toBeCalled();
    });
});
