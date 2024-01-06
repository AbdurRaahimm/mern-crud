import React from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function Modal({targetId}) {
   const navigate = useNavigate()
    const handleAddUser = async(e)=>{
        e.preventDefault();
        try { 
            const response = await fetch('http://localhost:3000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:e.target.name.value,
                    email:e.target.email.value,
                    age:e.target.age.value
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data.message);
            alert(data.message)
            // window.location = '/';
            navigate(0);


             // clear all form 
             e.target.reset();

        } catch (error) {
            alert(error)   
        }
    }
  return (
    <>
        <div className="modal fade" id={targetId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add New User</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleAddUser}>
                    <div className="mb-3">
                        <label htmlFor="user-name" className="col-form-label text-capitalize ">user name:</label>
                        <input type="text" className="form-control" id="user-name" name="name" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user-email" className="col-form-label text-capitalize ">user email:</label>
                        <input type="email" className="form-control" id="user-email" name="email" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="col-form-label text-capitalize ">age:</label>
                        <input type="number" className="form-control" id="age" name="age" required />   
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary text-capitalize">add user</button>
                    </div>
                </form>
            </div>
            
            </div>
        </div>
        </div>
    </>
  )
}
