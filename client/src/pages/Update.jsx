import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function Update() {
  const locate = useLocation();
  const {id} = useParams();
  const navigate = useNavigate()
  
  const handleUpdate = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'PUT',
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
      navigate('/')
       // clear all form 
       e.target.reset();
    } catch (error) {
      alert(error)
    }
  }
  // console.log(locate.state)
  return (
    <div className="d-flex justify-content-center align-items-center bg-black " style={{height:`100vh`}}>
       <div className="bg-white p-5 rounded-2 w-50 ">
          <h1 className="text-center">Update</h1>
          <form onSubmit={handleUpdate} >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" defaultValue={locate.state.name} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" defaultValue={locate.state.email} required />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age</label>
              <input type="number" className="form-control" id="age" name="age" defaultValue={locate.state.age} required />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
       </div>
    </div>
  )
}
