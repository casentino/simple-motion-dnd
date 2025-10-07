import { MotionValue } from "motion/react";


export type MotionDnDContextType = {
  scrollY: MotionValue<number>;
  updateSort: (dragItem: number | string, target: number | string) => void;
};
