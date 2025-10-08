"use client";

import { type PropsWithChildren, useMemo, useState } from "react";

import { type HTMLMotionProps, motion } from "motion/react";
import { useMotionAsComponent } from "../hooks/useMotionAsComponent";
import { useMotionDnD } from "../context/MotionDnDProvider";

interface MotionDndItemProps extends HTMLMotionProps<keyof HTMLElementTagNameMap> {
  itemId: string | number;
  as?: keyof HTMLElementTagNameMap;
}
const DATA_ATTRIBUTE_ITEM_ID = "data-simple-dnd-item-id";
export function MotionDnDItem({
  itemId,
  as = "li",
  children,
  onDrag,
  onDragStart,
  onDragEnd,
  ...props
}: PropsWithChildren<MotionDndItemProps>) {
  const id = useMemo(() => (typeof itemId === "number" ? itemId.toString() : itemId), [itemId]);

  const { updateSort } = useMotionDnD();

  const Item = useMotionAsComponent(() => motion[as]);
  const [isDragging, setIsDragging] = useState(false);
  const checkOverlab = (x: number, y: number) => {
    const overlabElementId = document
      .elementFromPoint(x - window.scrollX, y - window.scrollY)
      ?.closest(`[${DATA_ATTRIBUTE_ITEM_ID}]`)
      ?.getAttribute(DATA_ATTRIBUTE_ITEM_ID);
    if (!overlabElementId || overlabElementId === id) {
      return;
    }
    return overlabElementId;
  };
  return (
    <div data-simple-dnd-item-id={id} style={{ position: "relative", zIndex: isDragging ? 12 : 10 }}>
      <Item
        {...props}
        drag
        dragSnapToOrigin
        layout="position"
        style={{
          position: "relative",
          userSelect: "none",
          pointerEvents: isDragging ? "none" : undefined,
          background: "transparent",
          touchAction: "none",
        }}
        onDragStart={(e, panInfo) => {
          setIsDragging(true);
          if (onDragStart) {
            onDragStart(e, panInfo);
          }
        }}
        onDrag={(event, panInfo) => {
          const overlabElementId = checkOverlab(panInfo.point.x, panInfo.point.y);
          if (overlabElementId) {
            updateSort(id, overlabElementId);
          }
          if (onDrag) {
            onDrag(event, panInfo);
          }
        }}
        onDragEnd={(e, panInfo) => {
          setIsDragging(false);
          if (onDragEnd) {
            onDragEnd(e, panInfo);
          }
        }}
      >
        {children}
      </Item>
    </div>
  );
}
