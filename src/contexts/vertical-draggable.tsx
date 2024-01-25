import {
  closestCenter,
  DndContext,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { PropsWithChildren } from 'react'

type SortableId = UniqueIdentifier | { id: UniqueIdentifier }

interface Props<T extends SortableId> extends PropsWithChildren {
  items: T[]
  onItemsChange?: (items: T[]) => void
  onItemsMove?: (oldIndex: number, newIndex: number) => void
}

export default function VerticalDraggableContext<T extends SortableId>({
  items,
  onItemsMove,
  onItemsChange,
  children,
}: Props<T>) {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToParentElement, restrictToVerticalAxis]}
      onDragEnd={({ active, over }) => {
        if (!over?.id) return

        if (active.id !== over.id) {
          const itemIds = items.map(item => (typeof item === 'object' ? item.id : item))
          const oldIndex = itemIds.indexOf(active.id)
          const newIndex = itemIds.indexOf(over.id)

          onItemsMove?.(oldIndex, newIndex)
          onItemsChange?.(arrayMove(items, oldIndex, newIndex))
        }
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
