import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './SignUp.css';

const SignUp = () => {

    const { createUser } = useContext(AuthContext)
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);

        if (password.length < 6) {
            setError('password should be six characters or more');
            return;
        }
        if (password !== confirm) {
            setError('password did not match');
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className='form-container'>
            <h3 className='form-title'>SignUp</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder='your email' id="email-input" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder='your password' id="password-input" required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" placeholder='confirm your password' id="confirm-password-input" required />
                </div>
                <button className='btn-submit'>SignUp</button>
            </form>
            {<p className='text-error'>{error}</p>}
            <p><small>Already have an account?<Link to='/login'>LogIn</Link></small></p>
        </div>
    );
};

export default SignUp;