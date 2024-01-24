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
import { Dispatch, PropsWithChildren } from 'react'

interface Props<T extends UniqueIdentifier> extends PropsWithChildren {
  items: T[]
  setItems: Dispatch<(items: T[]) => T[]>
}

export default function VerticalDraggableContext<T extends UniqueIdentifier>({
  items,
  setItems,
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
          setItems(items => {
            const oldIndex = items.indexOf(active.id as T)
            const newIndex = items.indexOf(over.id as T)

            return arrayMove(items, oldIndex, newIndex) as T[]
          })
        }
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
