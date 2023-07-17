import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import { empurl } from '../URL';

function EmployeeEditForm() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  console.log(employee&&employee)
  const [editValue, setEditValue] = useState({
    name: '',
    dob: '',
    phoneNumber:'',
    address: ''
  });
  console.log(editValue&&editValue)

  const getOrganizationById = (_id) => {
    fetch(`${empurl}/${_id}`)
      .then((res) => res.json())
      .then((res) => {
        setEmployee(res)
        setEditValue({
          name: res.name,
          dob: res.dob,
          phoneNumber:res.phoneNumber,
          address: res.address
        });
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  };

  useEffect(() => {
    getOrganizationById(_id);
  }, [_id]);

  const handleChange = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform your custom validation here
    if (!editValue.name || !editValue.dob || !editValue.phoneNumber || !editValue.address) {
      toast.error('Please fill in all fields');
      return;
    }

    // Add your API request logic here
    const values = {
        name: editValue.name,
        dob: editValue.dob,
        phoneNumber: editValue.phoneNumber,
        address: editValue.address,
      };

    fetch(`${empurl}/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Organization updated successfully');
          navigate(`/employees/${_id}`);
        } else {
          toast.error('Failed to update Employee');
        }
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
        toast.error('An error occurred');
      });
  };

  if (!employee) {
    return <div>Loading organization...</div>;
  }

  return (
    <div>
        <span style={{display:"flex",justifyContent: 'flex-end'}}><IconButton color="primary" onClick={()=>navigate(`/`)}>Home<HomeIcon /></IconButton></span>
      <h2>Edit Organization</h2>
      <div style={{ padding: '30px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '19px', flexDirection: 'column' }}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            placeholder="Name"
            type="text"
            name="name"
            value={editValue&&editValue.name}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="date"
            name="dob"
            value={editValue.dob}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            name="phoneNumber"
            value={editValue.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            placeholder="Address"
            type="text"
            name="address"
            value={editValue.address}
            onChange={handleChange}
          />
          <button type="submit" className="btn-primary">
            Update Organization
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeEditForm;
