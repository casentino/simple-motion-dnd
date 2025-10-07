import { HTMLMotionProps, motion, useScroll } from "motion/react";
import { useRef, type PropsWithChildren } from "react";
import { useMotionAsComponent } from "../hooks/useMotionAsComponent";
import { MotionDnDProvider } from "../context/MotionDnDProvider";
import { MotionDnDValue } from "./type";

interface MotionDnDGroupProps<V extends MotionDnDValue>
  extends Omit<HTMLMotionProps<keyof HTMLElementTagNameMap>, "values"> {
  as?: keyof HTMLElementTagNameMap;
  values: V[];
  onSorted?: (items: V[]) => void;
  layoutScroll?: boolean;
  cols: number;
  gap: number;
  rowGap: number;
  columnGap: number;
}

export function MotionDnDGroup<V extends MotionDnDValue>({
  children,
  as = "ul",
  values,
  onSorted,
  layoutScroll = true,
  cols,
  gap,
  rowGap,
  columnGap,
  ...props
}: PropsWithChildren<MotionDnDGroupProps<V>>) {
  const Group = useMotionAsComponent(() => motion[as]);
  const container = useRef<HTMLDivElement>(null);
  const { scrollY, scrollX } = useScroll({
    container,
  });
  const updateSort = (dragItem: number | string, target: number | string) => {
    if (onSorted) {
      onSorted([...values]);
    }
  };
  return (
    <Group
      {...props}
      layoutScroll={layoutScroll}
      ref={container}
      style={{
        overflow: "scroll",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: `${gap}px`,
          rowGap: `${rowGap}px`,
          columnGap: `${columnGap}px`,
        }}
      >
        <MotionDnDProvider containerScrollY={scrollY} containerScrollX={scrollX} updateSort={updateSort}>
          {children}
        </MotionDnDProvider>
      </div>
    </Group>
  );
}
