"use client";

import { HTMLMotionProps, motion, useScroll } from "motion/react";
import { useRef, type PropsWithChildren } from "react";
import { useMotionAsComponent } from "../hooks/useMotionAsComponent";
import { MotionDnDProvider } from "../context/MotionDnDProvider";
import { sortItem } from "../utils/array";
import { MotionDnDValue } from "./type";

interface MotionDnDGroupProps<V extends MotionDnDValue>
  extends Omit<HTMLMotionProps<keyof HTMLElementTagNameMap>, "values"> {
  as?: keyof HTMLElementTagNameMap;
  values: V[];
  onSorted?: (items: V[]) => void;
  layoutScroll?: boolean;
  cols: number;
  gap: number;
}

export function MotionDnDGroup<V extends MotionDnDValue>({
  children,
  as = "ul",
  values,
  onSorted,
  layoutScroll = true,
  cols,
  gap,
  ...props
}: PropsWithChildren<MotionDnDGroupProps<V>>) {
  const Group = useMotionAsComponent(() => motion[as]);
  const container = useRef<HTMLDivElement>(null);
  const { scrollY, scrollX } = useScroll({
    container,
  });
  const updateSort = (dragItem: string, target: string) => {
    const sortedList = sortItem(values, dragItem, target);
    if (onSorted) {
      onSorted(sortedList);
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
        }}
      >
        <MotionDnDProvider containerScrollY={scrollY} containerScrollX={scrollX} updateSort={updateSort}>
          {children}
        </MotionDnDProvider>
      </div>
    </Group>
  );
}
