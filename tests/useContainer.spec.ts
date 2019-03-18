import { cleanup, renderHook } from "react-hooks-testing-library";
import useContainer from "../src/useContainer";

describe('useContainer', () => {
    afterEach(cleanup);

    test('Get Container By Default', () => {
        const { result, unmount } = renderHook(() => useContainer());

        expect(result.current).toBeDefined();
        expect(result.current.tagName).toBe('DIV');
        expect(result.current.parentElement).toBe(document.body);

        unmount();
        expect(result.current.parentElement).toBe(null);
    });


    test('Get Container By Element', () => {
        const ele = document.createElement('div');

        const { result } = renderHook(() => useContainer(ele));
        expect(result.current).toBe(ele);
    });

    test('Get Container By Function', () => {
        const ele = document.createElement('div');

        const { result } = renderHook(() => useContainer(() => ele));
        expect(result.current).toBe(ele);
    });


});