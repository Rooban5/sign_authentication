import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import './signup.css'
// import {
//   setSelectedTask,
//   removeTaskFromList,
//   deleteCoursesFromServer,
//   getCoursesFromServer
// } from "../../slices/coursesSlice";
import { getFormsFromServer,removeTaskFromList,deleteFormsFromServer } from "../../Slice/UserSlice";

// import './admin.css';

const SignupList = () => {
  const { FormList } = useSelector((state) => state.Forms);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getFormsFromServer());
  }, [dispatch]);

  const deleteTask = (form) => {
    if (window.confirm("Are you sure you want to delete this Form?")) {
      console.log("Unwanted Form");
      dispatch(deleteFormsFromServer(form))
        .unwrap()
        .then(() => {
          dispatch(removeTaskFromList(form));
        });
    }
  };

  const [modalShow, setModalShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showConfirmation, setShowConfirmation] = useState(false); // Added state for confirmation

  


  const handleDelete = () => {
    setShowConfirmation(false); 
  };
  return (
    <>
   <br /><br /><br /><br />
<h1 style={{color:'red',textAlign:'center'}}>Client Form List</h1>
<br /><br /><br />
<Table striped bordered hover className="tasks-table">
  <thead>
    <tr className="text-center">
      <th style={{ border: '2px solid red' }}>#</th>
      <th style={{ border: '2px solid red' }}>Name</th>
      <th style={{ border: '2px solid red' }}>Email</th>
      <th style={{ border: '2px solid red' }}>Added By</th>

      <th style={{ border: '2px solid red' }}>Actions</th>
    </tr>
  </thead>
  <tbody>
  {FormList &&
  FormList.map((form, index) => {
    return (
      <tr className="text-center" key={form.id}>
        <td className="bold-cell" style={{ border: '2px solid red' }}>{index + 1}</td>
        <td className="capitalize-cell" style={{ border: '2px solid red' }}>
          {form.username}
        </td>
        <td style={{ border: '2px solid red' }}>{form.email}</td>
        <td style={{ border: '2px solid red' }}>{form.addedby}</td>

        <td style={{ border: '2px solid red' }}>
          <Button
            variant="danger"
            className="delete-button"
            onClick={() => deleteTask(form)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  })}

  </tbody>
</Table>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this Form?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignupList;
