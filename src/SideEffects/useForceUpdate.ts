import { useState } from "react";

export const useForceUpdate = () => {
    const [, setIt] = useState(false);
    return () => setIt((it) => !it);
};
