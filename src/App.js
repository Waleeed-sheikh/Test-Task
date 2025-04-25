import React,{useState} from "react"
import  {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import PersonalInformationForm from "./step1"
import FamilyInformationForm from "./step2"


export default function App(){

    const [personalInformation,setPersonalInformation]=useState(null)
    const [familyMembers,setFamilyMembers]=useState([])


    return (
        
        <Router>
            <Routes>

                <Route path="/"
                element={
                    <PersonalInformationForm
                    setPersonalInformation={setPersonalInformation}
                    />
                }/>


                 <Route path="/family"
                 element={
                    <FamilyInformationForm 
                    personalInformation={personalInformation}
                    familyMembers={familyMembers}
                    setFamilyMembers={setFamilyMembers}
                    />
                 }
                 />
                 
            </Routes>
        </Router>
      )

    
 }