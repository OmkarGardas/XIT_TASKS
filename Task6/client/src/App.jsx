import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import FormDetails from "./component/FormDetails";

axios.defaults.baseURL = "http://localhost:8070/";

function App() {
  const [addDetails, setAddDetails] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [formDetails, setFormDetails] = useState({
    employeeName: "",
    email: "",
    phoneNo: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    employeeName: "",
    email: "",
    phoneNo: "",
    id: "",
  });

  const [dataList, setDataList] = useState([]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^\+?[0-9\s-]{10}$/;

  function isValidEmail(content) {
    return emailRegex.test(content);
  }

  function isValidMobile(content) {
    return mobileRegex.test(content);
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(formDetails.email)) {
      return alert("Enter valid email id");
    } else if (!isValidMobile(formDetails.phoneNo)) {
      return alert("Enter valid mobile number");
    }
    const data = await axios.post("/create", formDetails);

    if (data.data.success) {
      setAddDetails(false);
      getFetchedData();
    }
  };

  const getFetchedData = async () => {
    try {
      const data = await axios.get("/");
      if (data.data.success) {
        setDataList(data.data.data);
      }
    } catch (error) {
      console.log(`Error in fetching the data ${error}`);
    }
  };

  useEffect(() => {
    getFetchedData();
  }, []);

  const handleDelete = async (id) => {
    const response = await axios.delete("/delete/" + id);
    if (response.data.success) {
      getFetchedData();
      alert(response.data.msg);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put("/update", formDataEdit);
    if (res.data.success) {
      getFetchedData();
      alert(res.data.msg);
      setEditModal(false);
    }
  };

  const handleEditChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEdit = async (e) => {
    setFormDataEdit(e);
    setEditModal(true);
  };

  return (
    <>
      <div className="container">
        <div className="heading">
          <h2>Employee Details</h2>
          <button className="btn btn-add" onClick={() => setAddDetails(true)}>
            Add User
          </button>
        </div>
        {addDetails && (
          <FormDetails
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCloseModal={() => setAddDetails(false)}
            rest={formDetails}
          />
        )}
        {editModal && (
          <FormDetails
            handleSubmit={handleUpdate}
            handleChange={handleEditChange}
            handleCloseModal={() => setEditModal(false)}
            rest={formDataEdit}
          />
        )}
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((e1, index) => {
                return (
                  <tr key={e1._id}>
                    <td>{index + 1}</td>
                    <td>{e1.employeeName}</td>
                    <td>{e1.email}</td>
                    <td>{e1.phoneNo}</td>
                    <td className="buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() => {
                          handleEdit(e1);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(e1._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
