import { Store } from "../src";

describe("store", () => {
    test("init value", () => {
        const count = new Store<number>(13);
        expect(count.value).toBe(13);
    });

    test("subscribe", () => {
        const fn = jest.fn();
        const count = new Store<number>(1);

        count.subscribe(fn);

        expect(fn).not.toBeCalled();

        // Act: 改变值为 2
        count.change(2);
        // Assert: 断言fn被调用 1 次，第一次参数为 2
        expect(fn.mock.calls.length).toBe(1);
        expect(fn.mock.calls[0][0]).toBe(2);

        // Act: 改变值为 13
        count.change(13);
        // Assert: 断言fn被调用 2 次，第一次参数为 13
        expect(fn.mock.calls.length).toBe(2);
        expect(fn.mock.calls[1][0]).toBe(13);
    });

    test("unsubscribe", () => {
        const fn = jest.fn();
        const count = new Store<number>(1);
        count.subscribe(fn);

        // Act: 改变值为 2
        count.change(2);

        count.unsubscribe(fn);

        count.change(13);

        expect(fn.mock.calls.length).toBe(1);
    });

    test("static create", () => {
        const count = Store.Create(1);
        expect(count.value).toBe(1);
    });
});
