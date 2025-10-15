'use client';

import { HTMLMotionProps, motion } from 'motion/react';
import { type PropsWithChildren } from 'react';
import { useMotionAsComponent } from '../../hooks/useMotionAsComponent';
import { MotionDnDProvider } from '../../context/MotionDnDProvider';
import { sortItem } from '../../utils/array';
import { MotionDnDValue } from './type';
import Grid from '../grid/Grid';
import useContainerScroll from '../../hooks/useContainerScroll';

interface MotionDnDGroupProps<V extends MotionDnDValue>
  extends HTMLMotionProps<keyof HTMLElementTagNameMap> {
  as?: keyof HTMLElementTagNameMap;
  items: V[];
  onSorted?: (items: V[]) => void;
  layoutScroll?: boolean;
  cols: number;
  gap: number;
}

export function MotionDnDGroup<V extends MotionDnDValue>({
  children,
  as = 'ul',
  items,
  onSorted,
  layoutScroll,
  cols,
  gap,
  ...props
}: PropsWithChildren<MotionDnDGroupProps<V>>) {
  const Group = useMotionAsComponent(() => motion[as]);

  const { container, scrollY, onPan } = useContainerScroll();
  let list = [...items];
  const updateSort = (dragItem: string, target: string) => {
    const sortedList = sortItem(list, dragItem, target);
    list = sortedList;
    if (onSorted) {
      onSorted(sortedList);
    }
  };
  return (
    <Group {...props} ref={container} layoutScroll={layoutScroll} onPan={onPan}>
      <Grid cols={cols} gap={gap}>
        <MotionDnDProvider updateSort={updateSort} containerScrollY={scrollY}>
          {children}
        </MotionDnDProvider>
      </Grid>
    </Group>
  );
}
