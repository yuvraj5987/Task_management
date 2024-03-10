import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import mockData from "../mockData";

const TaskList = () => {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [inReview, setInReview] = useState([]);

    useEffect(() => {
        const complted = mockData.filter(item => item.completed === true);
        const incompleted = mockData.filter(item => item.completed === false);
        setCompleted(complted);
        setIncomplete(incompleted);
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        deletePreviousState(source.droppableId, draggableId);

        const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview, ...backlog]);

        setNewState(destination.droppableId, task);
    };

    const deletePreviousState = (sourceDroppableId, taskId) => {
        switch (sourceDroppableId) {
            case "1":
                setIncomplete(removeItemById(taskId, incomplete));
                break;
            case "2":
                setCompleted(removeItemById(taskId, completed));
                break;
            case "3":
                setInReview(removeItemById(taskId, inReview));
                break;
            case "4":
                setBacklog(removeItemById(taskId, backlog));
                break;
            default:
                break;
        }
    };

    const setNewState = (destinationDroppableId, task) => {
        let updatedTask;
        switch (destinationDroppableId) {
            case "1":   // TO DO
                updatedTask = { ...task, completed: false };
                setIncomplete([updatedTask, ...incomplete]);
                break;
            case "2":  // DONE
                updatedTask = { ...task, completed: true };
                setCompleted([updatedTask, ...completed]);
                break;
            case "3":  // IN REVIEW
                updatedTask = { ...task, completed: false };
                setInReview([updatedTask, ...inReview]);
                break;
            case "4":  // BACKLOG
                updatedTask = { ...task, completed: false };
                setBacklog([updatedTask, ...backlog]);
                break;
            default:
                break;
        }
    };

    const findItemById = (id, array) => {
        return array.find((item) => item.id === id);
    };

    const removeItemById = (id, array) => {
        return array.filter((item) => item.id !== id);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h2 style={{ textAlign: "center" }}>Task Management</h2>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "1200px",
                    margin: "0 auto"
                }}
            >
                <TaskItem title={"Added"} tasks={incomplete} id={"1"} />
                <TaskItem title={"Started"} tasks={completed} id={"2"} />
                <TaskItem title={"Completed"} tasks={inReview} id={"3"} />
            </div>
        </DragDropContext>
    );
};

export default TaskList;
