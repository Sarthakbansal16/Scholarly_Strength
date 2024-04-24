import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { loginRoute, googleloginRoute } from '../utils/ApiRoutes';
import axios from "axios";
import {useNavigate} from "react-router-dom"
import Cookies from 'js-cookie';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

const toastOptions ={
    position: "bottom-right",
    autoClose:6000,
    pauseOnHover: true,
    draggable:true,
    theme: "dark",
  }

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
     //const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate();
    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(loginState)
        return authenticateUser();
    }

    const handleGoogleSuccess = async (response) => {
        const idToken = response.credential;
        console.log(response);
        const password = response.clientId;
        const decodedToken = jwtDecode(idToken);
        const { email,name } = decodedToken;
        console.log(decodedToken)
        // Send ID token to backend to verify and authenticate
        try {
            const res = await axios.post(googleloginRoute, { password,email,name });
            if (res.data.success) {
                const { accessToken, refreshToken } = res.data.data
                console.log(res);
                Cookies.set('accessToken', accessToken, { expires: 7, sameSite: 'Lax', secure: true });
                Cookies.set('refreshToken', refreshToken, { expires: 14, sameSite: 'Lax', secure: true });
                
                toast.success('Logged in successfully!', { position: "bottom-right", autoClose: 6000 });
                navigate('/Layout');
            } else {
                toast.error(res.data.message || 'Login failed.', { position: "bottom-right", autoClose: 6000 });
            }
        } catch (error) {
            console.error('Error logging in with Google:', error);
            toast.error('Error occurred while logging in. Please try again later.', { position: "bottom-right", autoClose: 6000 });
        }
    };

    const handleGoogleFailure = (error) => {
        console.error('Google login failed:', error);
        toast.error('Failed to log in with Google.', { position: "bottom-right", autoClose: 6000 });
    };

    //Handle Login API Integration here
    const authenticateUser = async() =>{
        if (!handleValidation()) { // Check for validation errors before sending request
            return;
        }

        try {
            const response = await axios.post(loginRoute,loginState)

            //console.log(response.data)
            if (response.data.success) {
                const { accessToken, refreshToken } = response.data.data;

                // Set cookies for accessToken and refreshToken
                Cookies.set('accessToken', accessToken, { expires: 7, sameSite: 'Lax' });
                Cookies.set('refreshToken', refreshToken, { expires: 14, sameSite: 'Lax'});

                toast.success('Logged in successfully!', toastOptions);
                navigate('/Layout'); // Navigate to the appropriate page
            } else {
                toast.error(response.data.message || 'Login failed.', toastOptions);
            }
        } catch (error) {
            console.error("Error while trying to log in into the account:", error);
            toast.error("An error occurred. Please try again later.", toastOptions);
        }  
      
    }


    const handleValidation = () => {
        const { password,username} = loginState;
        if (password === "") {
          toast.error(
            "Email and Password is required",
            toastOptions
          );
          return false;
        }
        else if (username.length === "") {
          toast.error(
            "Email and Password is required",
            toastOptions
          );
          return false;
          }
        return true;
      };    

    return(
          <form className=" space-y-6 " onSubmit={handleSubmit}>
              <div className="space-y-4">
                  {fields.map((field) => (
                      <Input
                          key={field.id}
                          handleChange={handleChange}
                          value={loginState[field.id]}
                          labelText={field.labelText}
                          labelFor={field.labelFor}
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          isRequired={field.isRequired}
                          placeholder={field.placeholder}
                      />
                  ))}
              </div>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
            />
              <FormExtra />
              <FormAction handleSubmit={handleSubmit} text="Login" />
              <ToastContainer />
          </form>
       
    )
}