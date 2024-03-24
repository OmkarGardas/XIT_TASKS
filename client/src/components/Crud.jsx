import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

import FormDetails from "./FormDetails";

const Crud = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const empdata = [
    {
      id: 1,
      Name: "Jon",
      Email: "a@gmail.com",
      PhoneNumber: "1234567890",
    },
    {
      id: 2,
      Name: "Doe",
      Email: "d@gmail.com",
      PhoneNumber: "1234567800",
    },
    {
      id: 3,
      Name: "rich",
      Email: "r@gmail.com",
      PhoneNumber: "1234567000",
    },
    {
      id: 4,
      Name: "sara",
      Email: "s@gmail.com",
      PhoneNumber: "3334567890",
    },
  ];

  const [formDetails, setFormDetails] = useState({
    id: "",
    Name: "",
    Email: "",
    PhoneNumber: "",
  });

  const [editFormDetails, setEditFormDetails] = useState({
    id: "",
    Name: "",
    Email: "",
    PhoneNumber: "",
  });

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(empdata);
  }, []);

  const handleEdit = () => {
    handleShow();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete") == true) {
      alert("Delete success");
    }
  };

  const handleChange = (e) =>{
    const {value, name} = e.target;
    setFormDetails((prev)=>{
      return{
        ...prev,
        [name]:value,
      }
    })
  }

  const handleEditChange = (e) => {
    const {value, name} = e.target;
    setEditFormDetails((prev) => {
      return{
        ...prev,
        [name]:value,
      }
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Hello")
  };

  return (
    <>
      <div className="container d-flex justify-content-center my-2">
        <h1>CRUD Operations</h1>
      </div>
      <hr />
      <FormDetails handleChange={handleChange} title="Add User" rest = {formDetails} handleUpdate={handleUpdate}/>
      <table className="table text-center my-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.Name}</td>
                  <td>{item.Email}</td>
                  <td>{item.PhoneNumber}</td>
                  <td className="d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit()}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete()}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <p>No data available</p>
          )}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormDetails title="Update" rest={editFormDetails} handleChange={handleEditChange} handleUpdate={handleUpdate}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Crud;
