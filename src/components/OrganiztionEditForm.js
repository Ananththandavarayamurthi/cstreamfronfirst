import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orgurl } from '../URL';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';

function OrganizatioEditForm() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState(null);
  const [editValue, setEditValue] = useState({
    name: '',
    registrationDate: '',
    address: ''
  });

  const getOrganizationById = (_id) => {
    fetch(`${orgurl}/${_id}`)
      .then((res) => res.json())
      .then((res) => {
        setOrganization(res);
        setEditValue({
          name: res&&res.name,
          registrationDate: res&&res.registrationDate,
          address: res&&res.address
        });
      })
      .catch((error) => {
        console.error('Error fetching organization:', error);
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
    if (!editValue.name || !editValue.registrationDate || !editValue.address) {
      toast.error('Please fill in all fields');
      return;
    }

    // Add your API request logic here
    const values = {
      name: editValue.name,
      registrationDate: editValue.registrationDate,
      address: editValue.address,
    };

    fetch(`${orgurl}/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Organization updated successfully');
          navigate(`/organizations/${_id}`);
        } else {
          toast.error('Failed to update organization');
        }
      })
      .catch((error) => {
        console.error('Error updating organization:', error);
        toast.error('An error occurred');
      });
  };

  if (!organization) {
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
            value={editValue.name}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="date"
            name="registrationDate"
            value={editValue.registrationDate}
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

export default OrganizatioEditForm;
