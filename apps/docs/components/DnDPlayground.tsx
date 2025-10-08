"use client";
import { MotionDnDGrid } from "@simple-motion-dnd/grid";
import { useState } from "react";

const initialGrid = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }];
export default function DnDPlayground() {
  const [grid, setGrid] = useState(initialGrid);
  return (
    <MotionDnDGrid.Group values={grid} onSorted={setGrid} cols={3} gap={10}>
      {grid.map((item) => (
        <MotionDnDGrid.Item key={item.id} itemId={item.id}>
          <div className="bg-red-500 w-[120px] h-[120px] font-bold text-2xl text-white flex items-center justify-center">
            {item.id}
          </div>
        </MotionDnDGrid.Item>
      ))}
    </MotionDnDGrid.Group>
  );
}
