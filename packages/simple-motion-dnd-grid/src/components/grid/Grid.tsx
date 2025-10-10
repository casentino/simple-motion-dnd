import { PropsWithChildren } from 'react';

interface GridProps {
  cols: number;
  gap: number;
}
export default function Grid({ children, cols, gap }: PropsWithChildren<GridProps>) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridGap: `${gap}px`,
      }}>
      {children}
    </div>
  );
}
