import { useEffect } from "react";

export const useUnmount = (unmount: React.EffectCallback) => {
    useEffect(
        () => () => {
            if (unmount) unmount();
        },
        [],
    );
};
