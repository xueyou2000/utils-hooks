import ReactDOM from "react-dom";
import { useContainer, GetContainer } from "./useContainer";

/**
 * 使用Portal, 弹出内容
 * @param getContainer 
 */
export function usePortal(getContainer?: GetContainer): [(node: React.ReactNode) => React.ReactPortal, HTMLElement] {
    const container = useContainer(getContainer);

    function renderPortal(node: React.ReactNode) {
        if (!container) { return null; }
        return ReactDOM.createPortal(node, container);
    }

    return [renderPortal, container];
}