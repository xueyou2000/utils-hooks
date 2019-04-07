import { useEffect, useRef } from "react";

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
    const isInitialMount = useRef(true);

    useEffect(
        isInitialMount.current
            ? () => {
                  isInitialMount.current = false;
              }
            : effect,
        deps,
    );
};
