import ReactDOM from "react-dom";
import useContainer, { GetContainer } from "./useContainer";

/**
 * 使用Portal, 弹出内容
 * @param getContainer 
 */
function usePortal(getContainer?: GetContainer): (node: React.ReactNode) => React.ReactPortal {
    const container = useContainer(getContainer);

    return (node: React.ReactNode) => {
        if (!container) { return null; }
        return ReactDOM.createPortal(node, container);
    };
}

export default usePortal;