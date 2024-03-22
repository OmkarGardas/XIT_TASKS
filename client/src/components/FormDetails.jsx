import React from "react";

const FormDetails = (props) => {
  return (
    <>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="phone Number"
          />
        </div>
          <button className="btn btn-primary">
            {props.title}
          </button>

    </>
  );
};

export default FormDetails;
