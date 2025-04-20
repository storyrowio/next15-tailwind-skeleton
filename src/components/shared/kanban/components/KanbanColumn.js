import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";
import KanbanSortableItem from "components/shared/kanban/components/KanbanSortableItem";
import KanbanItemCard from "components/shared/kanban/components/KanbanItemCard";
import SimpleBar from "simplebar-react";
import IconButton from "components/ui/buttons/IconButton";
import {Add01Icon} from "hugeicons-react";

export default function KanbanColumn(props) {
    const { id, title, items } = props;
    const sortedItems = [...items].sort((a, b) => a.position - b.position);

    const { setNodeRef } = useDroppable({id});

    return (
        <div
            ref={setNodeRef}
            className="flex-1 min-w-48 min-h-content md:min-h-[78vh] rounded-2xl"
        >
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-md capitalize">
                    {title}
                    <span className="ml-2 text-neutral-500">({items.length})</span>
                </h2>
                <IconButton>
                    <Add01Icon size={16} className="text-neutral-600"/>
                </IconButton>
            </div>
            <SimpleBar style={{maxHeight: '80vh'}}>
                <SortableContext
                    items={items.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-2">
                        {sortedItems.map(item => (
                            <KanbanSortableItem key={item.id} id={item.id}>
                                <KanbanItemCard item={item}/>
                            </KanbanSortableItem>
                        ))}
                        {/* Empty state drop area */}
                        {items.length === 0 && (
                            <div className="h-10 border-2 border-dashed border-gray-300 rounded-lg"/>
                        )}
                    </div>
                </SortableContext>
            </SimpleBar>
        </div>
    )
}
