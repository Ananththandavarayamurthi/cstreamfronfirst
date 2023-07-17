import React from 'react';
import { useState, useEffect } from 'react';
import { useParams,Link,useNavigate } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import { empurl } from '../URL';

 function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate=useNavigate()
  const { _id } = useParams();
  const getemployees=(_id)=>{
    fetch(`${empurl}/${_id}`).then(res=>res.json()).then(res=>setEmployees(res))
  }
  useEffect(() => {
    getemployees(_id)
  }, [_id]);
const handleDeleteemployee=(_id)=>{
  fetch( `${empurl}/${_id}`,{
    method:"DELETE"
  } ).then(navigate("/"))
}
  return (
    <div>
      <span style={{display:"flex",justifyContent: 'flex-end'}}><IconButton color="primary" onClick={()=>navigate(`/`)}>Home<HomeIcon /></IconButton></span>
      <span style={{display:"flex",justifyContent: 'flex-end'}}><IconButton
                  color="danger"
                  aria-label="delete"
                  onClick={() => handleDeleteemployee(employees._id)}
                >
                  delete<DeleteIcon color="error" />
                </IconButton></span>
      <h1>Employee Details</h1>
      <div class="card" style={{width: "30rem"}}>
        <Link to={`/employer/edit/${employees._id}`}><span style={{ display: 'flex', justifyContent: 'flex-end' }}>Edit Details<EditIcon color="primary" /></span></Link>
      
        <div class="card-body">
          <h3 class="card-title">Name of Employee:  {employees.name}    </h3>
          <h5 class="card-text">Date of Birth:  {employees.dob&&employees.dob.slice(0,10)}</h5>
          <h5 class="card-text">Address:  {employees.address}</h5>
          <h5 class="card-text">Phone Number:  {employees.phoneNumber}</h5>
         
        </div>
      </div>
    </div>
  );
}

export default EmployeeList