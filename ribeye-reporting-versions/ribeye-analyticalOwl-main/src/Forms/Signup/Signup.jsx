import React from "react";
import { Link } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
// Assets
import ribeyeLogo from "../../assets/images/ribeye-logo.jpeg";

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="form_wrapper">
      <form className="max-w-[500px] w-[95%] rounded-[8px] mx-auto py-[50px] px-[40px] text-center bg-white flex flex-col">
        <img width={"80"} className="mx-auto mb-3" src={ribeyeLogo} alt="" />
        <h2 className="text-2xl">Welcome</h2>
        <p className="mt-3 text-sm">Sign Up to Ribeye to continue.</p>

        <div className="w-full mt-4 flex gap-x-3">
          <div>
            <TextField
              id="outlined-basic"
              className="outline-none"
              label="First Name"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              className="outline-none"
              label="Last Name"
              variant="outlined"
            />
          </div>
        </div>

        <div className="w-full mt-4">
          <TextField
            id="outlined-basic"
            className="w-full outline-none"
            label="Username"
            variant="outlined"
          />
        </div>
        <div className="w-full mt-4">
          <TextField
            id="outlined-basic"
            className="w-full outline-none"
            label="Email address"
            variant="outlined"
          />
        </div>
        <div className="w-full mt-4">
          <FormControl
            className="outlined_input"
            sx={{ width: "100%" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon
                        style={{ fontSize: "20px" }}
                        className="text-[#708090]"
                      />
                    ) : (
                      <VisibilityOutlinedIcon
                        style={{ fontSize: "20px" }}
                        className="text-[#708090]"
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        {/* --------Confirm Password */}
        <div className="w-full mt-4">
          <FormControl
            className="outlined_input"
            sx={{ width: "100%" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPasswordConfirm ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordConfirm}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPasswordConfirm ? (
                      <VisibilityOffOutlinedIcon
                        style={{ fontSize: "20px" }}
                        className="text-[#708090]"
                      />
                    ) : (
                      <VisibilityOutlinedIcon
                        style={{ fontSize: "20px" }}
                        className="text-[#708090]"
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        {/* ----------- */}
        <div className="w-full flex justify-start my-4 font-[700] text-sm text-[#2f20a3]">
          Already have an account?&nbsp;<Link to="/">Login here</Link>
        </div>
        <Link to="/">
          <button className="w-full py-3 rounded-lg mt-3 text-lg bg-[#708090] text-white">
            Create Account
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
