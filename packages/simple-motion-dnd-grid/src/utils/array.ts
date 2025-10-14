import { MotionDnDValue } from '../components/MotionDnDGrid/type';
export function sortItem<T extends MotionDnDValue>(
  list: T[],
  target: string,
  current: string,
) {
  const targetIdx = list.findIndex((item) => String(item.id) === target);
  const currentIdx = list.findIndex((item) => String(item.id) === current);

  if (
    targetIdx < 0 ||
    targetIdx >= list.length ||
    currentIdx < 0 ||
    currentIdx >= list.length
  ) {
    return list;
  }

  if (targetIdx === currentIdx) {
    return list;
  }

  const targetItem = list[targetIdx]!;

  const newList = [...list];

  newList.splice(targetIdx, 1);

  const insertIndex = currentIdx;
  newList.splice(insertIndex, 0, targetItem);

  return newList;
}
