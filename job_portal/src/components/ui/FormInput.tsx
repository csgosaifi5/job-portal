import React from "react";

const FormInput = ({ cn, label, placeholder,register,name,errors }: any) => {
  
  return (
    <>
      <div className={cn ? cn : "col-lg-6 col-md-6"}>
        <div className="form-group">
          <label>{label}:</label>
          {cn ? (
            <textarea className={`form-control ${errors[name] ? "border-danger" : ""}`} {...register(name)}></textarea>
          ) : (
            <input type={"text"} {...register(name)} 
            className={`form-control ${errors[name] ? "border-danger" : ""}`}
            placeholder={`Enter ${label}`} />
          )}
        </div>
      </div>
    </>
  );
};

export default FormInput;
