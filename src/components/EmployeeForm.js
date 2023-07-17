
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import { orgurl } from '../URL';
import { empurl } from '../URL';
function EmployeeForm() {
  const { _id } = useParams();
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    const getOrganizationById = async () => {
      try {
        const response = await fetch(`${orgurl}/${_id}`);
        const data = await response.json();
        setOrganization(data);
      } catch (error) {
        console.error('Error fetching organization:', error);
      }
    };

    getOrganizationById();
  }, [_id]);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, dob, phoneNumber, address } = event.target.elements;

    // Perform your custom validation here
    if (!name.value || !dob.value || !phoneNumber.value || !address.value) {
      toast.error('Please fill in all fields');
      return;
    }

    // Add your API request logic here
    const values = {
      name: name.value,
      dob: dob.value,
      phoneNumber: phoneNumber.value,
      address: address.value,
      organizationName: organization?.name || '',
    };

    fetch(empurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Employee added successfully');
          navigate(`/organizations/${_id}`);
        } else {
          toast.error('Failed to add employee');
        }
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
        toast.error('An error occurred');
      });
  };

  if (!organization) {
    return <div>Loading organization...</div>;
  }

  return (
    <div>
      <span style={{display:"flex",justifyContent: 'flex-end'}}><IconButton color="primary" onClick={()=>navigate(`/`)}>Home<HomeIcon /></IconButton></span>
      <h2>Add Employee</h2>
      <div style={{ padding: '30px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '19px', flexDirection: 'column' }}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            placeholder="Name"
            type="text"
            name="name"
          />
          <TextField
            id="outlined-basic"
            label="DOB"
            variant="outlined"
            placeholder="DOB"
            type="date"
            name="dob"
          />
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            placeholder="Phone Number"
            type="text"
            name="phoneNumber"
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            placeholder="Address"
            type="text"
            name="address"
          />
          <button type="submit" className="btn-primary">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
