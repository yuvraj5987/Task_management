import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const TaskForm =(props)=>{
   console.log("propss",props);

    return(
        <div>
      <Button color="danger" onClick={props.toggle}>
        Click Me
      </Button>
      <Modal isOpen={props.popup} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Modal title</ModalHeader>
        <ModalBody>
          <div>
            <input type="text" name="title"></input>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
    )
}
export default TaskForm;