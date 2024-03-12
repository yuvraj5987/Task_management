import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const TaskForm = (props) => {
 
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);
    const [taskArray, setTaskArray] = useState([]);


    const generateRandomTwoDigitNumber=()=> {
      return Math.floor(Math.random() * 90 + 10); // Generates a random number between 10 and 99
    }

    const randomNumber = generateRandomTwoDigitNumber();

    useEffect(()=>{
      const retrievedData = JSON.parse(localStorage.getItem("taskData"));
      setTaskArray(retrievedData);
    },[])
    

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleRadioChange = (event) => {
        setCompleted(event.target.value === 'completed');
    };

    const handleSubmit = () => {
      if(title==""){
        alert("Title filed is required");
        return false
      }
      if (!Array.isArray(taskArray)) {
        setTaskArray([]);
        return;
      }
    const newTask = {
      id: randomNumber,
      completed: completed,
      title: title
    };

  const updatedTaskArray = [...taskArray, newTask];
  setTaskArray(updatedTaskArray);

  // Storing updated taskArray in localStorage
  localStorage.setItem("taskData", JSON.stringify(updatedTaskArray));
        props.toggle(); 
    };

   

    return (
        <div>
            <Modal isOpen={props.popup} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>Add Task</ModalHeader>
                <ModalBody>
                    <div>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Task title"
                           
                        />
                    </div>
                    <br></br>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="completed"
                                checked={completed}
                                onChange={handleRadioChange}
                            />
                            Completed
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="incomplete"
                                checked={!completed}
                                onChange={handleRadioChange}
                            />
                            Incomplete
                        </label>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                       submit
                    </Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default TaskForm;
