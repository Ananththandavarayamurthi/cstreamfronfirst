
// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OrganizationList from './components/OrganizationList';
import OrganizationDetails from './components/OrganizationDetails';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrganizatioForm from './components/OrganizationForm';
import OrganizatioEditForm from './components/OrganiztionEditForm';
import EmployeeEditForm from './components/EmployeeEditForm';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
      <Routes>
        <Route  path="/" element={<OrganizationList/>} />
        <Route  path="/employees" element={<EmployeeList/>} />
        <Route  path="/employees/:_id" element={<EmployeeList/>} />
        <Route  path="/organizations/:_id" element={<OrganizationDetails/>} />
        <Route  path="/employer/Add/:_id" element={<EmployeeForm/>} />
        <Route  path="/organization/Add" element={<OrganizatioForm/>} />
        <Route  path="/organization/Edit/:_id" element={<OrganizatioEditForm/>} />
        <Route  path="/employer/edit/:_id" element={<EmployeeEditForm/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;







