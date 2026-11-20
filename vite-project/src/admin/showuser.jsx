import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'; 
import {  NavLink, useNavigate } from 'react-router-dom';
export default function Showuser() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/register')
      .then((response) => {
        console.log('Fetched data:', response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Data fetch error:', error);
      });
  }, []);
 const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios
        .delete(`http://localhost:5000/register/${id}`)
        .then(() => {
          // State se delete kiye gaye user ko filter out kar rahe hain
          setUsers(users.filter((user) => user._id !== id));
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
  };
  return (
    <div className="container mt-4">
            
      <h2 className="mb-4">Users List</h2>
 <NavLink
            to="/admin/Adduser"
            className="nav-link text-white text-end "
          >
          <button className="btn btn-info"> Add room </button>
          </NavLink>
      <Table striped bordered hover responsive className="mx-auto w-75">
        <thead>
          <tr>
        
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Phone</th>
        
            <th>delete</th>
                 <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>{user.phone}</td>
              
                    <td>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </td>
                    <td><Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => navigate(`/admin/edituser/${user._id}`)}
                    >
                      Edit
                    </Button>
                    </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    
  );
}
