import '../App.css';
import {MdClose} from 'react-icons/md'
const FormDetails = ({handleSubmit,handleChange, handleCloseModal,rest}) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleCloseModal}>
          <MdClose />
        </div>
        <label htmlFor="employeeNname">Name: </label>
        <input
          type="text"
          id="name"
          name="employeeName"
          placeholder="Enter name"
          onChange={handleChange}
          value={rest.employeeName}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          value={rest.email}
        />
        <label htmlFor="phoneNo">Mobile No:</label>
        <input
          type="number"
          id="mobile"
          name="phoneNo"
          placeholder="Enter mobile number"
          onChange={handleChange}
          value={rest.phoneNo}
        />
        <button className="btn btn-submit">Submit</button>
      </form>
    </div>
  );
};

export default FormDetails;
