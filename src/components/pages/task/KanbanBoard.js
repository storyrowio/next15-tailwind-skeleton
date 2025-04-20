'use client';

import React, { useState } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors, useDroppable,
} from '@dnd-kit/core';
import {
    arrayMove, SortableContext,
    sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import KanbanColumn from "components/shared/kanban/components/KanbanColumn";
import KanbanItemCard from "components/shared/kanban/components/KanbanItemCard";

const initialTasks = [
    {
        id: '1',
        title: 'Implement authentication',
        description: 'Set up login and signup pages',
        status: 'todo',
        position: 0,
    },
    {
        id: '2',
        title: 'Design dashboard',
        description: 'Create UI mockups for the dashboard',
        status: 'todo',
        position: 1,
    },
    {
        id: '3',
        title: 'API integration',
        description: 'Connect frontend to backend APIs',
        status: 'in-progress',
        position: 0,
    },
    {
        id: '4',
        title: 'Database schema',
        description: 'Design the database structure',
        status: 'done',
        position: 0,
    },
    {
        id: '5',
        title: 'User profile page',
        description: 'Create profile page with edit functionality',
        status: 'review',
        position: 0,
    },
];

const statuses = ['todo', 'in-progress', 'done', 'review'];

function SortableItem({ id, children }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        // transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
}
function TaskCard({ task, isDragging }) {
    return (
        <div className={`p-4 mb-2 rounded-lg shadow-md bg-white border-l-4 ${
            task.status === 'todo' ? 'border-blue-500' :
                task.status === 'in-progress' ? 'border-yellow-500' :
                    task.status === 'done' ? 'border-green-500' : 'border-purple-500'
        } ${isDragging ? 'shadow-lg' : ''}`}>
            <h3 className="font-medium">{task.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            <div className="mt-2 text-xs text-gray-500 capitalize">
                {task.status.replace('-', ' ')}
            </div>
        </div>
    );
}

function Column({
                    id,
                    title,
                    tasks,
                }) {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className="flex-1 min-w-[250px] bg-gray-100 rounded-lg p-4 min-h-[200px]"
        >
            <h2 className="font-semibold mb-4 text-lg capitalize">{title}</h2>
            <SortableContext
                items={tasks.map(task => task.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-2">
                    {tasks.map(task => (
                        <SortableItem key={task.id} id={task.id}>
                            <TaskCard task={task} />
                        </SortableItem>
                    ))}
                    {/* Empty state drop area */}
                    {tasks.length === 0 && (
                        <div className="h-10 border-2 border-dashed border-gray-300 rounded-lg" />
                    )}
                </div>
            </SortableContext>
        </div>
    );
}

export function KanbanBoard() {
    const [tasks, setTasks] = useState(initialTasks);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const getTask = (id) => tasks.find(task => task.id === id);

    const activeTask = activeId ? getTask(activeId) : null;

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const {active, over} = event;
        if (!over) {
            setActiveId(null);
            return;
        }

        if (active.id !== over.id) {
            setTasks(items => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    };

    const handleDragOver = (event) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const activeTask = getTask(activeId);
        if (!activeTask) return;

        // When dropping into empty column
        if (statuses.includes(overId)) {
            setTasks(tasks => {
                const targetColumnTasks = tasks.filter(t => t.status === overId && t.id !== activeId);
                const newPosition = targetColumnTasks.length > 0
                    ? Math.max(...targetColumnTasks.map(t => t.position)) + 1
                    : 0;

                return tasks.map(task => {
                    // Update moved task
                    if (task.id === activeId) {
                        return {
                            ...task,
                            status: overId,
                            position: newPosition,
                        };
                    }
                    // Update positions in source column
                    if (task.status === activeTask.status && task.position > activeTask.position) {
                        return { ...task, position: task.position - 1 };
                    }
                    return task;
                });
            });
            return;
        }

        // When dropping on another task
        const overTask = getTask(overId);
        if (!overTask) return;

        setTasks(tasks => {
            // If moving to different column
            if (activeTask.status !== overTask.status) {
                const targetColumnTasks = tasks.filter(t =>
                    t.status === overTask.status && t.id !== activeId
                );

                // Find position in new column
                const overIndex = targetColumnTasks.findIndex(t => t.id === overId);
                let newPosition;

                if (overIndex === -1) {
                    newPosition = targetColumnTasks.length;
                } else {
                    newPosition = overTask.position;
                }

                return tasks.map(task => {
                    // Update the moved task
                    if (task.id === activeId) {
                        return {
                            ...task,
                            status: overTask.status,
                            position: newPosition,
                        };
                    }
                    // Update positions in target column
                    if (task.status === overTask.status && task.position >= newPosition && task.id !== overId) {
                        return { ...task, position: task.position + 1 };
                    }
                    // Update positions in source column
                    if (task.status === activeTask.status && task.position > activeTask.position) {
                        return { ...task, position: task.position - 1 };
                    }
                    return task;
                });
            }

            // If same column, just reorder
            const oldIndex = tasks.findIndex(t => t.id === activeId);
            const newIndex = tasks.findIndex(t => t.id === overId);

            return arrayMove(tasks, oldIndex, newIndex).map((task, index) => ({
                ...task,
                position: index,
            }));
        });
    };

    return (
        <div className="h-fit">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
            >
                <div className="flex gap-4 overflow-x-auto">
                    {statuses.map(status => (
                        <Column
                            key={status}
                            id={status}
                            title={status.replace('-', ' ')}
                            tasks={tasks.filter(task => task.status === status)}
                            // items={tasks.filter(task => task.status === status)}
                        />
                    ))}
                </div>

                <DragOverlay>
                    {activeTask ? (
                        <TaskCard
                            task={activeTask}
                            // item={activeTask}
                            isDragging
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
