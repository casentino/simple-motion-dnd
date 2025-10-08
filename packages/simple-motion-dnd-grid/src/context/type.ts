import { MotionValue } from "motion/react";

export type MotionDnDContextType = {
  containerScrollY?: MotionValue<number>;
  containerScrollX?: MotionValue<number>;
  updateSort: (dragItem: string, target: string) => void;
};
