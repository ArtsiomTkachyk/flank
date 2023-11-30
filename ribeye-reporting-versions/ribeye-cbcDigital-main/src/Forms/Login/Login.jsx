import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ribeyeLogo from '../../assets/images/ribeye-logo.jpeg';
import googleIcon from '../../assets/icons/google_icon.png';
import { login } from '../../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Login.css';
import Loader from '../../utils/Loader';
import FormField from './FormField';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const { loading } = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  // Handler for input changes
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // Handler for toggling password visibility
  const togglePasswordVisibility = () => setShowPassword((show) => !show);

  // Handler for user login
  const userLogin = async (e) => {
    e.preventDefault();
    // Dispatch the login action with the form values
    dispatch(login(formValues));
    // Navigate to the campaigns page
    navigate('/reporting');
  };

  return (
    <div className="form_wrapper flex flex-col">
      <form className="max-w-[400px] w-[95%] rounded-[8px] mx-auto py-[50px] px-[40px] text-center bg-white flex flex-col">
        <img width={'80'} className="mx-auto mb-3" src={ribeyeLogo} alt="" />
        <h2 className="text-2xl">Welcome</h2>
        <p className="mt-3 text-sm">Log in to Ribeye to continue.</p>
        <button className="flex shadow_dark mt-8 items-center my-4 border-[1px] px-5 h-[50px] border-[gray300] rounded-lg">
          <img className="w-[25px] mr-4" src={googleIcon} alt="" />
          <span>Continue with Google</span>
        </button>
        <div className="flex items-center justify-between">
          <hr className="w-[42%] opacity-[1]" />
          <h4>OR</h4>
          <hr className="w-[42%] opacity-[1]" />
        </div>

        <FormField
          label="Email address"
          name="email"
          type="text"
          value={formValues.email}
          onChange={inputChangeHandler}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={inputChangeHandler}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <div className="w-full flex justify-start my-4">
          <a href="#" className="font-[700] text-sm text-[#000]">
            Forgot password?
          </a>
        </div>

        <button
          onClick={userLogin}
          type="submit"
          className="w-[100px] mx-auto py-3 max-h-[50px] flex justify-center items-center rounded-lg mt-3 text-lg bg-[#708090] text-white"
        >
          {!loading ? 'Continue' : <Loader color={'#fff'} />}
        </button>
      </form>
    </div>
  );
};

export default Login;
