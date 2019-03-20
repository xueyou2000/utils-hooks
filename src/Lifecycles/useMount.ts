import { useEffect } from "react";

export const useMount = (mount: React.EffectCallback) => useEffect(mount, []);
