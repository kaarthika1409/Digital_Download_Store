import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const HandleLogin = async (event) => {
        event.preventDefault();
        console.log("Event triggered");

        try {
            // Send login request to the backend
            const req = await axios.post('http://localhost:3000/login', {
                email: email,
                password: password
            });

            // Check the response
            if (req.data.message === "Login Successful") {
                alert("Login Successful"); // Notification for success
                navigate("/Home"); // Redirect to the home page
            } else {
                alert("Login Failed: " + req.data.message); // Notification for failure
            }
        } catch (err) {
            console.log(err);
            alert("Login Failed: An error occurred. Please try again."); // Notification for error
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <div className="container">
                <form method='POST' onSubmit={HandleLogin}>
                    <div style={{ textAlign: "center" }}>
                        <label htmlFor="email" required>Email: </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <br /><br />
                        <label htmlFor="password" required>Password: </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br /><br />
                        <button type='submit'>Login</button><br /><br />
                        <p>Don't have an Account? <Link to="/signup">SignUp</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;