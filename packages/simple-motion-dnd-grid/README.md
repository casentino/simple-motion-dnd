## @simple-motion-dnd/grid

### [Documentaion](https://simple-motion-dnd-docs.vercel.app/docs)

### 개요

`@simple-motion-dnd/grid`는 Motion의 Reorder 개념을 참고했지만, Reorder 컴포넌트는 수직, 수평 방향만 지원해서 그리드 형태도 가능하도록 구현했어요.
**위치 정보를 저장하지 않고 드래그 시점에만 계산하는 경량 구조**로 구현되었어요.  
DOM API를 직접 활용해 정확한 충돌 감지와 부드러운 전환을 제공합니다.

---

### 설치

```bash
npm install @simple-motion-dnd/grid
# or
yarn add @simple-motion-dnd/grid
```

---

### 기본 사용 예시

```tsx
import { MotionDnDGrid } from '@simple-motion-dnd/grid';
import { useState } from 'react';

export default function Example() {
  const [items, setItems] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

  return (
    <MotionDnDGrid.Group items={items} onSorted={setItems} cols={2} gap={10}>
      {items.map((item) => (
        <MotionDnDGrid.Item key={item.id} itemId={item.id}>
          <div>{item.id}</div>
        </MotionDnDGrid.Item>
      ))}
    </MotionDnDGrid.Group>
  );
}
```

---

### Props 요약

#### `MotionDnDGrid.Group`

| Prop           | 설명                                        |
| -------------- | ------------------------------------------- |
| `items`        | 재정렬할 아이템 배열                        |
| `onSorted`     | 새로운 순서가 계산될 때 호출되는 콜백       |
| `cols`         | 한 줄의 열 개수                             |
| `gap`          | 아이템 간 간격(px)                          |
| `layoutScroll` | 스크롤 가능한 컨테이너에서 사용할 때 `true` |

#### `MotionDnDGrid.Item`

| Prop     | 설명                                |
| -------- | ----------------------------------- |
| `itemId` | 아이템의 고유 ID                    |
| `as`     | 렌더링할 HTML 태그 (기본값: `'li'`) |
