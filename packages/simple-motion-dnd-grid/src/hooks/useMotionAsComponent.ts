import { FunctionComponent, PropsWithChildren, useRef } from "react";
import { HTMLMotionProps } from "motion/react";
export function useMotionAsComponent<T>(initialize: () => T) {
  const ref = useRef<T | null>(null);
  if (ref.current === null) {
    ref.current = initialize();
  }
  return ref.current as FunctionComponent<PropsWithChildren<HTMLMotionProps<keyof HTMLElementTagNameMap>>>;
}
