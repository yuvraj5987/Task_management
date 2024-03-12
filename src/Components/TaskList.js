import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
// import { Button } from "antd";
import TaskForm from "./TaskForm";


const TaskList = () => {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [inReview, setInReview] = useState([]);
    const [popup, setPopup] = useState(false);
    const [mockData, setMockData] = useState([]);

    useEffect(() => {
        const retrievedData = JSON.parse(localStorage.getItem("taskData"));
        setMockData(retrievedData);
    }, [])

    useEffect(() => {
        if (mockData?.length > 0) {
            const complted = mockData.filter(item => item.completed === true);
            const incompleted = mockData.filter(item => item.completed === false);
            setCompleted(complted);
            setIncomplete(incompleted);
        }
    }, [mockData]);

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

    const taskFormModel = () => {
        setPopup(!popup);
    }

    return (
        <div style={{ marginTop: "10px" }}>
            <div>
                <h2 style={{ textAlign: "center" }}>Task Management</h2>
                <button style={{ textAlign: "center" }} onClick={taskFormModel}>Add Task</button>

            </div>
            <br></br>
            <DragDropContext onDragEnd={handleDragEnd}>
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
            {popup && <TaskForm toggle={taskFormModel} popup={popup} />}


        </div>

    );
};

export default TaskList;
