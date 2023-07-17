import React, { useState,useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { orgurl } from '../URL';



function OrganizationList() {
    const [organizations, setOrganizations] = useState();
    console.log(organizations)
    const navigate=useNavigate()
  const getorganization=()=>{
        fetch(orgurl).then(res=>res.json()).then(res=>setOrganizations(res))
  }
    useEffect(() => {
      getorganization()
    }, []);
  return (
    <div><h1>Organization List</h1>
     <span style={{display:"flex",justifyContent: 'flex-end'}}><IconButton color="primary" onClick={()=>navigate(`/organization/Add`)}>Add organization<AddIcon /></IconButton></span>
     
    {organizations&&organizations.map((organization) => (
        
        <Link to={`/organizations/${organization._id}`}> <li key={organization.id} style={{fontSize:"30px"}}>
        
       
       
          {organization.name}
        
        
      </li></Link>
    ))}
    
    </div>
  )
}

export default OrganizationList
