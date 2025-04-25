
import React  from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import "./style.css"


const familyMemberValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  relation: yup.string().required("Relation is required"),
});

export default function FamilyInformationForm({
  personalInformation,
  familyMembers,
  setFamilyMembers,
}) {
  
  const navigate=useNavigate();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(familyMemberValidation),
  });

  
 
  const addFamilyMember = (data) => {
    setFamilyMembers([...familyMembers, data]); 
    reset()
    
  };

 
  const submitAll = () => {
    const finalData = {
      personal: personalInformation,
      family: familyMembers,
    };
    alert(JSON.stringify(finalData, null, 2));
    
    navigate("/")
  };

  return (
    <div>
      
      
        <div className="Personalform">
            <p>Step 2 of 2</p>
          <h3>Add Family Members</h3>
          <form onSubmit={handleSubmit(addFamilyMember)}>

          <div className="inputFeild">
            <label htmlFor="name">Family Member Name</label>
            <input {...register("name")} placeholder="Enter Name" />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>


             
            <div className="inputFeild">
            <label htmlFor="relation">Relation</label>
            <select {...register("relation")} defaultValue="">
              <option value="" disabled>
                Select Relation
              </option>
              <option value="brother">Brother</option>
              <option value="sister">Sister</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
              <option value="cousin">Cousin</option>
            </select>
            {errors.relation && <p className="error">{errors.relation.message}</p>}
            </div>


            <button type="submit" className="addFamilyMemberButton">Add Family Member</button>
          </form>

         
          <div>
            <h3>Family Members List</h3>
            <ul className="familyMemberList">
              {familyMembers.map((member, index ) => (
                <li key={index}>
                  {member.name} - {member.relation}
                </li>
              ))}
            </ul>
          </div>

          
          <button onClick={submitAll} className="submitAllButton">Submit All</button>
        </div>
      
    </div>
  );
}
