const FormDetails = ({ title, rest, handleChange, handleUpdate }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Name"
            value={rest.Name}
            onChange={handleChange}
            name="Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            value={rest.Email}
            name="Email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="phone Number"
            value={rest.PhoneNumber}
            name="PhoneNumber"
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleUpdate}>
          {title}
        </button>
      </form>
    </>
  );
};

export default FormDetails;
