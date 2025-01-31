import{Link, Navigate} from 'react-router-dom';
import{useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const Signup=()=>{
    
    var [email,setEmail]=useState('');
    var [password,setPassword]=useState('');
    var Navigate=useNavigate();
    const HandleSignup= async (event)=>{
        event.preventDefault();
        console.log("Event triggered")
        try{
             
        const req= await axios.post('http://localhost:3001/signup',{
            
           email: email,
           password: password
        })
        alert(req.data)
        // console.log(req)
        Navigate('/')
    } catch(err){
        console.log(err)
    }
}
    return(
     
        <div style={{ textAlign: "center" }}>
            <h1 style={{ textAlign: "center" }}>Signup</h1>
            <div className="container">
                <div>
                    <form method='POST' onSubmit={HandleSignup} >
         
            <label for="email">Email:  </label>
            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <br /><br />
            <label for="password">Password: </label>
            <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <br /><br />
            <button type='submit'>Signup</button><br />
            Already have an account?<Link to="/">Login</Link>
            </form>
            
           
            </div>
            </div>
        </div>
    )
}
export default Signup