
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css"


const personalInformationValidation = yup.object().shape({
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),
  dob: yup
    .string()
    .required("Date of birth is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date of Birth must be in the format YYYY-MM-DD"),
  country: yup.string().required("Country is required"),
});


const familyMemberValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  relation: yup.string().required("Relation is required"),
});

export default function PersonalInformationForm1() {
  const [step, setStep] = useState(1);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [personalInformation, setPersonalInformation] = useState();

  
  const {
    register: registerPersonalInformation,
    handleSubmit: handleSubmitPersonalInformation,
    formState: { errors: personalInformationErrors },
    reset: resetPersonalInformation,
  } = useForm({
    resolver: yupResolver(personalInformationValidation),
  });

  
  const {
    register: registerFamilyMembers,
    handleSubmit: handleSubmitFamilyMembers,
    formState: { errors: familyMembersErrors },
    reset: resetFamilyMembers,
  } = useForm({
    resolver: yupResolver(familyMemberValidation),
  });

  
  const submitPersonalInformation = (data) => {
    setPersonalInformation(data); 
    resetPersonalInformation(); 
    setStep(2); 
  };

 
  const addFamilyMember = (data) => {
    setFamilyMembers([...familyMembers, data]); 
    resetFamilyMembers(); 
    
  };

 
  const submitAll = () => {
    const finalData = {
      personal: personalInformation,
      family: familyMembers,
    };
    alert(JSON.stringify(finalData, null, 2));
    
  };

  return (
    <div>
      
      {step === 1 && (
        
        <div className="Personal-form">
            <p>Step 1 of 2</p>
          <h3>Personal Information</h3>
          <form onSubmit={handleSubmitPersonalInformation(submitPersonalInformation)}>
            <label htmlFor="firstName">First Name</label>
            <input {...registerPersonalInformation("firstName")} placeholder="First Name" />
            {personalInformationErrors.firstName && <p>{personalInformationErrors.firstName.message}</p>}

            <label htmlFor="lastName">Last Name</label>
            <input {...registerPersonalInformation("lastName")} placeholder="Last Name" />
            {personalInformationErrors.lastName && <p>{personalInformationErrors.lastName.message}</p>}

            <label htmlFor="dob">Date of Birth</label>
            <input {...registerPersonalInformation("dob")} placeholder="Date of Birth (YYYY-MM-DD)" />
            {personalInformationErrors.dob && <p>{personalInformationErrors.dob.message}</p>}

            <label htmlFor="country">Country</label>
            <select {...registerPersonalInformation("country")} defaultValue="">
              <option value="" disabled>
                Select Country
              </option>
              <option value="Pakistan">Pakistan</option>
              <option value="India">India</option>
              <option value="Australia">Australia</option>
              <option value="USA">USA</option>
            </select>
            {personalInformationErrors.country && <p>{personalInformationErrors.country.message}</p>}

            <input type="submit" value="Submit Personal Info" />
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="Personal-form">
            <p>Step 2 of 2</p>
          <h3>Add Family Members</h3>
          <form onSubmit={handleSubmitFamilyMembers(addFamilyMember)}>
            <label htmlFor="name">Family Member Name</label>
            <input {...registerFamilyMembers("name")} placeholder="Enter Name" />
            {familyMembersErrors.name && <p>{familyMembersErrors.name.message}</p>}
             
            <label htmlFor="relation">Relation</label>
            <select {...registerFamilyMembers("relation")} defaultValue="">
              <option value="" disabled>
                Select Relation
              </option>
              <option value="brother">Brother</option>
              <option value="sister">Sister</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
              <option value="cousin">Cousin</option>
            </select>
            {familyMembersErrors.relation && <p>{familyMembersErrors.relation.message}</p>}

            <button type="submit">Add Family Member</button>
          </form>

         
          <div>
            <h3>Family Members List</h3>
            <ul>
              {familyMembers.map((member, index ) => (
                <li key={index}>
                  {member.name} - {member.relation}
                </li>
              ))}
            </ul>
          </div>

          
          <button onClick={submitAll}>Submit All</button>
        </div>
      )}
    </div>
  );
}
