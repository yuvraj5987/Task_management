import React, { useState, useEffect } from "react";
import { DragDropContext,Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import mockData from "../mockData";
import { Button } from "antd";

export default function Board() {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [inReview, setInReview] = useState([]);

    useEffect(()=>{
     const complted= mockData.filter(item=>item.completed===true);
     const incompleted= mockData.filter(item=>item.completed===false);
     setCompleted(complted);
     setIncomplete(incompleted);
     
    },[])

    const handleDragEnd = (result) => {
        console.log("rahul1222",result)
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        deletePreviousState(source.droppableId, draggableId);

        const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview, ...backlog]);

        setNewState(destination.droppableId, task);

    };

    function deletePreviousState(sourceDroppableId, taskId) {
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
        }

    }
    function setNewState(destinationDroppableId, task) {
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
        }
    }
    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    return (
        <div style={{marginTop:"10px"}}>
        <div>
        <h2 style={{ textAlign: "center" }}>Task Management</h2>
             <Button style={{ textAlign: "center" }}>Add Task</Button>
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
                <Column title={"Added"} tasks={incomplete} id={"1"} />
                <Column title={"Started"} tasks={completed} id={"2"} />
                <Column title={"Completed"} tasks={inReview} id={"3"} />
            </div>
        </DragDropContext>
        </div>
    );
}