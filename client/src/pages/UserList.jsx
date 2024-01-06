import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'


export default function UserList() {
    const [users, setUsers] = useState([]) 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/users');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            // console.log(data.users)
            setUsers(data.users);
          } catch (error) {
            console.error('Error fetching data:', error);
            // You can handle errors here, for example, set an error state
          }
        };
    
        fetchData();
      }, []);

        const handleDelete = async (id) =>{
            try {
                const response = await fetch(`http://localhost:3000/user/${id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data.message);
                alert(data.message)
                window.location = '/';
              } catch (error) {
                console.error('Error fetching data:', error);
                // You can handle errors here, for example, set an error state
              }
    }


  return (
    <div className="d-flex justify-content-center align-items-center bg-black " style={{height:`100vh`}}>
       <div className="bg-white p-5 rounded-2 w-50 ">
            <h1 className="text-center">User List</h1>

            <button className='btn btn-primary ' data-bs-toggle="modal" data-bs-target="#openModal">Add +</button>
            <Modal targetId={`openModal`} />
            <hr/>   
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email address</th>
                    <th scope="col">Age</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                    {/* data fetch */}  
                    {users.map(user=>{
                        // destructure 
                        const {name, email, age} = user;
                        return(
                            <tr key={user._id}>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{age}</td>
                                <td>
                                    <Link to={`/update/${user._id}`} state={{name, email, age}}  className="btn btn-primary me-2">Update</Link>
                                    <button onClick={(e)=> handleDelete(user._id) } className="btn btn-danger" >Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    
                   
                {/* <tr>
                    <td>John Doe</td>
                    <td>john.doe@example.com</td>
                    <td>Admin</td>
                    <td>
                        <Link to={`/update`} className="btn btn-primary me-2">Update</Link>
                        <button className="btn btn-danger">Delete</button>
                    </td>
                </tr>  */}
                </tbody>
            </table>

       </div>
    </div>
  )
}
