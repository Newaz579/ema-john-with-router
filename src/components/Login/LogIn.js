import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './LogIn.css';

const LogIn = () => {

    const { signIn, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useState();
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
                form.reset();
            })
            .catch(error => {
                console.error(error);
            })

        logOut()
            .then(() => {

            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div className='form-container'>
            <h3 className='form-title'>LogIn</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder='your email' id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder='your password' id="" required />
                </div>
                <button className='btn-submit'>LogIn</button>
            </form>
            <p><small>New to ema john <Link to='/signup'>Create a New Account</Link></small></p>
        </div>
    );
};

export default LogIn;