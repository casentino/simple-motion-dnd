import { PropsWithChildren, useRef } from "react";
import { MotionDnDValue } from "./type";
import { HTMLMotionProps, motion, useMotionValue } from "motion/react";
import { useMotionAsComponent } from "../hooks/useMotionAsComponent";
import { useMotionDnD } from "../context/MotionDnDProvider";

interface MotionDndItemProps<T extends MotionDnDValue> extends HTMLMotionProps<keyof HTMLElementTagNameMap> {
  value: T;
  as?: keyof HTMLElementTagNameMap;
}
const DATA_ATTRIBUTE_ITEM_ID = "data-simple-dnd-item-id";
export function MotionDnDItem<T extends MotionDnDValue>({
  value,
  as = "li",
  children,
  onDrag,
  onDragStart,
  onDragEnd,
  ...props
}: PropsWithChildren<MotionDndItemProps<T>>) {
  const startDragScrollY = useRef(0);
  const startDragScrollX = useRef(0);
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const { updateSort, containerScrollY, containerScrollX } = useMotionDnD();

  const Item = useMotionAsComponent(() => motion[as]);
  const isDragging = useRef(false);
  const checkOverlab = (x: number, y: number) => {
    const overlabElementId = document
      .elementFromPoint(x - window.scrollX, y - window.scrollY)
      ?.closest(`[${DATA_ATTRIBUTE_ITEM_ID}]`)
      ?.getAttribute(DATA_ATTRIBUTE_ITEM_ID);
    if (!overlabElementId) {
      return;
    }
    if (value.id === overlabElementId) {
      return overlabElementId;
    }
    return;
  };
  return (
    <div data-simple-dnd-item-id={value.id}>
      <Item
        {...props}
        drag
        dragSnapToOrigin
        style={{
          position: "relative",
          userSelect: "none",
          pointerEvents: isDragging.current ? "none" : undefined,
          background: "transparent",
          touchAction: "none",
          cursor: "grab",
          y,
          x,
        }}
        onDragStart={(e, panInfo) => {
          if (onDragStart) {
            onDragStart(e, panInfo);
          }
          startDragScrollY.current = containerScrollY.get();
          startDragScrollX.current = containerScrollX.get();
          offsetX.set(0);
          offsetY.set(0);
          isDragging.current = true;
        }}
        onDrag={(event, panInfo) => {
          y.set(y.get() + offsetY.get());
          const overlabElementId = checkOverlab(panInfo.point.x, panInfo.point.y);
          if (overlabElementId) {
            updateSort(value.id, overlabElementId);
          }
          if (onDrag) {
            onDrag(event, panInfo);
          }
        }}
        onDragEnd={(e, panInfo) => {
          isDragging.current = false;
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
