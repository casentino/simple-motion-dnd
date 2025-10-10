import { MotionValue, useMotionValue } from 'motion/react';
import { useEffect, useRef } from 'react';

export default function useOffsetScroll({
  isDragging,
  containerScroll,
}: {
  isDragging: boolean;
  containerScroll?: MotionValue<number>;
}) {
  const startDragScroll = useRef(0);
  const scroll = useMotionValue(0);
  const offest = useMotionValue(0);
  useEffect(() => {
    if (!containerScroll) {
      return;
    }
    containerScroll.on('change', (latest) => {
      if (isDragging) {
        offest.set(latest - startDragScroll.current);
      }
    });
  }, [containerScroll, isDragging, offest]);
  const setOffest = () => {
    scroll.set(scroll.get() + offest.get());
  };
  const clearOffset = () => {
    offest.set(0);
    if (!containerScroll) {
      return;
    }
    startDragScroll.current = containerScroll.get();
  };
  return {
    scroll,
    setOffest,
    clearOffset,
  };
}
