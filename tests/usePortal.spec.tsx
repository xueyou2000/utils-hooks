import React from "react";
import { cleanup, renderHook } from "react-hooks-testing-library";
import { render } from "react-testing-library";
import { usePortal } from "../src";

describe("usePortal", () => {
    afterEach(cleanup);

    test("Should Render", () => {
        const container = document.createElement("div");
        const { result } = renderHook(() => usePortal("", container));
        const [renderPortal] = result.current;
        const { getByText, debug } = render(renderPortal(<p>hello</p>), { container });

        expect(getByText("hello")).toBeDefined();
        expect(getByText("hello").parentElement).toBe(container);
    });
});
