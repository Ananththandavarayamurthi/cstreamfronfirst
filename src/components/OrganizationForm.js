
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import { orgurl } from '../URL';

function OrganizatioForm() {

  

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name,registrationDate , address } = event.target.elements;

    // Perform your custom validation here
    if (!name.value || !registrationDate.value || !address.value) {
      toast.error('Please fill in all fields');
      return;
    }

    // Add your API request logic here
    const values = {
      name: name.value,
      registrationDate: registrationDate.value,
      address: address.value,
    };

    fetch(orgurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('organization added successfully');
          navigate(`/`);
        } else {
          toast.error('Failed to add employee');
        }
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
        toast.error('An error occurred');
      });
  };

  

  return (
    <div>
        <span style={{display:"flex",justifyContent: 'flex-end'}}><IconButton color="primary" onClick={()=>navigate(`/`)}>Home<HomeIcon /></IconButton></span>
      <h2>Add organization</h2>
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
            variant="outlined"
            type="date"
            name="registrationDate"
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
            Add organization
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrganizatioForm;
