
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import './signup.scss';
import { useNavigate } from 'react-router-dom';

const SIGNUP_USER = gql`
mutation Signup($user: SignUpInput!) {
    signup(user: $user) {
      token,
      user {
        id
        name,
        email,
      }
  
    }
  }
`;

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signup, { loading, error }] = useMutation(SIGNUP_USER);

    const handleSignup = async () => {
        try {
            const { data } = await signup({
                variables: {
                    user: { name, email, password },
                },
            });

            localStorage.setItem("token" , data.signup.token)
            localStorage.setItem("userId" , data.signup.user.id)
            navigate("/")
            console.log('Signup successful:', data.signup.token);
        } catch (err) {
            console.error('Signup error:', err.message);
        }
    };

    return (
        <div className="signup-container">
            <h2 className='header_cna'>Create a new account</h2>
            <div className="signup_form">
                <input type="text" placeholder='enter name' name='name' value={name} onChange={(e) => { setName(e.target.value) }} />
                <input type="text" placeholder='enter email' name='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input type="text" placeholder='enter password' name='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div> 

            <button onClick={handleSignup}>Sign Up</button>
            {/* <p onClick={()=>{navigate('/login')}}>Login to existing account</p> */}

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Signup;
