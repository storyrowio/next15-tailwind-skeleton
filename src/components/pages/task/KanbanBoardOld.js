'use client'

import {DragDropContext, Draggable, Droppable, resetServerContext } from "@adaptabletools/react-beautiful-dnd";
import {useEffect, useState} from "react";
import SimpleBar from "simplebar-react";
import classNames from "classnames";

const State = () => {

};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

export default function KanbanBoardOld() {
    const [states, setStates] = useState([
        {
            id: `state-1`,
            name: 'To Do',
            tasks: [
                { id: "1", title: 'Create' },
                { id: '2', title: 'Update' },
            ]
        },
        {
            id: `state-2`,
            name: 'In Progress',
            tasks: [
                { id: '3', title: 'Delete' },
                { id: '4', title: 'List' },
            ]
        }
    ]);
    const [windowReady, setWindowReady] = useState(false);

    useEffect(() => {
        setWindowReady(true);
    }, [])

    const handleOnDragEnd = (result) => {
        const { source, destination } = result;
        console.log(source, destination)
        // If drop outside column
        if (!destination) { return; }

        // If same destination column and same index
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        // if same dest column but different index
        if (source.droppableId === destination.droppableId) {
            const sourceStateIndex = states.findIndex(e => e.id === source.droppableId);
            const sourceTask = states[sourceStateIndex].tasks[source.index];
            states[sourceStateIndex].tasks.splice(source.index, 1);
            states[sourceStateIndex].tasks.splice(destination.index, 0, sourceTask);
            setStates([...states])
        }

        // if different column
        if (source.droppableId !== destination.droppableId) {
            const sourceStateIndex = states.findIndex(e => e.id === source.droppableId);
            const sourceTask = states[sourceStateIndex].tasks[source.index];
            states[sourceStateIndex].tasks.splice(source.index, 1);

            const destStateIndex = states.findIndex(e => e.id === destination.droppableId);
            states[destStateIndex].tasks.splice(destination.index, 0, sourceTask);

            setStates([...states])
        }
    };
    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="state-1">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {states[0].tasks.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
    console.log(states)
    return (
        <div className="flex gap-8 overflow-x-auto overflow-y-hidden">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {states.map((state, i) => {
                    if (!windowReady) {
                        return;
                    }

                    return (
                        <div key={i} className="column w-[280px] shrink-0">
                            <h3 className="heading-sm uppercase mb-6">
                                <span className="task-status inline-block h-3 w-3 rounded-full mr-3"></span>
                                {state.name} ({state.tasks.length})
                            </h3>
                            <Droppable droppableId={state.id}>
                                {(provided, snapshot) => {
                                    console.log(snapshot.isDraggingOver, snapshot, provided)
                                    const droppableClassNames = classNames({
                                        'h-full pb-12 flex flex-col gap-5': true,
                                        'bg-primary-200': snapshot.isDraggingOver
                                    });

                                    return (
                                        <ul key={i}
                                            className={droppableClassNames}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                            >
                                            {state.tasks.map((task, j) => {
                                                return (
                                                    <Draggable key={j} draggableId={task.id} index={j}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                className="p-4 bg-neutral-200"
                                                                {...provided.draggableProps} {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                                )}
                                                            >
                                                                {task.title}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </ul>
                                    )
                                }}
                            </Droppable>
                        </div>
                    )
                })}
            </DragDropContext>
        </div>
    )
}
