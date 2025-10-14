import { PanInfo, useScroll } from 'motion/react';
import { useRef } from 'react';

export default function useContainerScroll() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container,
  });
  const onPan = (_event: PointerEvent, panInfo: PanInfo) => {
    if (!container.current) {
      return;
    }

    if (
      Math.abs(
        container.current.getBoundingClientRect().y -
          (panInfo.point.y - window.scrollY),
      ) >
      container.current.offsetHeight - 50
    ) {
      container.current.scroll({
        top: scrollY.get() + 5,
      });
    }
    if (
      Math.abs(
        container.current.getBoundingClientRect().y -
          (panInfo.point.y - window.scrollY),
      ) < 50
    ) {
      container.current.scroll({
        top: scrollY.get() - 5,
      });
    }
  };
  return { container, scrollY, onPan };
}
