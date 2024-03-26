import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast, Bounce, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormDetails from "./FormDetails";

const Crud = () => {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState();

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
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [editFormDetails, setEditFormDetails] = useState({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7211/api/Employee")
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(editId);
  const handleEdit = (id) => {
    handleShow();
    setEditId(id);
    axios.get(`https://localhost:7211/api/Employee/${id}`).then((res) => {
      setEditFormDetails({
        name: res.data.name,
        email: res.data.email,
        phoneNumber: res.data.phoneNumber,
      });
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete") == true) {
      await axios
        .delete(`https://localhost:7211/api/Employee/${id}`)
        .then((res) => {
          if (res.status === 200) {
            toast.success("User deleted successfully");
            getData();
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error deleting");
        });
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEditChange = (e) => {
    const { value, name } = e.target;
    setEditFormDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const url = `https://localhost:7211/api/Employee/${editId}`;
    const data = {
      id: editId,
      name: editFormDetails.name,
      email: editFormDetails.email,
      phoneNumber: editFormDetails.phoneNumber,
    };
    await axios
      .put(url, data)
      .then((res) => {
        getData();
        clearEdit();
        toast.success("Update successfull.");
        setShow(false)
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const url = "https://localhost:7211/api/Employee";
    try {
      const res = await axios.post(url, formDetails);
      getData(); // Reload data after successful save
      toast.success("User saved Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
      clear();
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };
  const clear = () => {
    setFormDetails({
      name: "",
      email: "",
      phoneNumber: "",
    });
  };
  const clearEdit = () => {
    setEditFormDetails({
      id:"",
      name: "",
      email: "",
      phoneNumber: "",
    });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
      <div className="container d-flex justify-content-center my-2">
        <h1>CRUD Operations</h1>
      </div>
      <hr />
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Name"
            value={formDetails.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            value={formDetails.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="phone Number"
            value={formDetails.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          Add User
        </button>
      </form>
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
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td className="d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Name"
                value={editFormDetails.name}
                onChange={handleEditChange}
                name="name"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                value={editFormDetails.email}
                name="email"
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="phone Number"
                value={editFormDetails.phoneNumber}
                name="phoneNumber"
                onChange={handleEditChange}
              />
            </div>
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          </form>
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
