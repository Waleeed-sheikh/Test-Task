import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import "./style.css"






const personalInformationValidation = yup.object().shape({
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),
   dob: yup
  .date()
  .required("Date of birth is required")
  .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), "You must be at least 18 years old"),
 
  country: yup.string().required("Country is required"),
});

export default function PersonalInformationForm({ setPersonalInformation }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalInformationValidation),
  });

  const submitPersonalInformation = (data) => {
    setPersonalInformation(data);
    navigate("/family");
    console.log(data);
  };

  return (
    <div className="Personalform">
      <p>Step 1 of 2</p>
      <h3>Personal Information</h3>
      <form onSubmit={handleSubmit(submitPersonalInformation)}>


      <div className="inputFeild">
      <label htmlFor="firstName">First Name</label>
        <input {...register("firstName")} placeholder="First Name" />
        {errors.firstName && <p className="error">{errors.firstName.message}</p>}
        </div>
        
         


        <div className="inputFeild">

        <label htmlFor="lastName">Last Name</label>
        <input {...register("lastName")} placeholder="Last Name" />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
              </div>
        
        <div className="inputFeild">
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" {...register("dob")} />
       {errors.dob && <p className="error">{errors.dob.message}</p>}
        
       </div>



       <div className="inputFeild">
        <label htmlFor="country">Country</label>
        <select {...register("country")} defaultValue="">
          <option value="" disabled>Select Country</option>
          <option value="Pakistan">Pakistan</option>
          <option value="India">India</option>
          <option value="Australia">Australia</option>
          <option value="USA">USA</option>
        </select>
        {errors.country && <p className="error">{errors.country.message}</p>}
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}




