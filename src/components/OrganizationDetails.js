import React from 'react';
import { useState, useEffect } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { orgurl } from '../URL';


function OrganizationDetails() {
  const { _id } = useParams();
  // console.log("id",_id)
  const [organization, setOrganization] = useState(null);
  const navigate=useNavigate();
  const getorganizationbyid=(_id)=>{
    fetch(`${orgurl}/${_id}`).then(res=>res.json()).then(res=>setOrganization(res))
  }
  useEffect(() => {
    getorganizationbyid(_id)
  }, [_id]);
const handleDelete=(id)=>{
  fetch(`${orgurl}/${id}`,{
    method:"DELETE"
  }).then(navigate("/"))
}

  return (
    <div>
       <span style={{display:"flex",justifyContent: 'flex-end'}}><IconButton color="primary" onClick={()=>navigate(`/`)}>Home<HomeIcon /></IconButton></span>
        <h2>Organization Details</h2>
      {organization ? (
        <div class="card" style={{width: "30rem"}}>
        <span style={{display:"flex",justifyContent: 'flex-end'}}><IconButton color="primary" onClick={()=>navigate(`/organization/Edit/${organization._id}`)}>Edit organization<EditIcon /></IconButton></span>
        <span style={{display:"flex",justifyContent: 'flex-end'}}><IconButton color="primary" onClick={()=>handleDelete(organization._id)}>Delete<DeleteIcon /></IconButton></span>
        <div class="card-body">
          <h3 class="card-title">Name of Organization:  {organization.name}</h3>
          <h5 class="card-text">Date of registration:  {organization.registrationDate.slice(0,10)}</h5>
          <h5 class="card-text">Address:  {organization.address}</h5>
          <h5 class="card-text">Number of Employees:  {organization.numberOfEmployees}</h5>
          <span style={{display:"flex",justifyContent: 'flex-end'}}><IconButton color="primary" onClick={()=>navigate(`/employer/Add/${organization._id}`)}>Add Employee<AddIcon /></IconButton></span>
          
     
          <div>
          {organization.employees.map((employee) => (
          <div key={employee._id}>
            <li><span>{employee.name}</span>
            <IconButton
                  color="primary"
                  onClick={() => navigate(`/employees/${employee._id}`)}
                >
                  <InfoIcon />
                </IconButton>
               
                
            

                </li>
          </div>
        ))}

          </div>
        </div>
      </div>
      ) : (
        <p>Loading organization details...</p>
      )}
    </div>
  );
}


export default OrganizationDetails;