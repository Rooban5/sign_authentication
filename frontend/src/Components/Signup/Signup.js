import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFormsToServer } from "../../Slice/UserSlice";
import { Button, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from "@mui/material";

const genders = ["Male", "Female", "Other"];

const Signup = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [dob, setDOB] = useState("");
  const[addedby,setAddedby] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);


  const validateUsername = (value) => {
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return "Username can only contain alphabets and digits.";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!/\S+@\S+\.\S+/.test(value)) {
      return "Invalid email format.";
    }
    return "";
  };

  const validatePassword = (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.*[a-zA-Z]).{8,}$/;
    
    if (!regex.test(value)) {
      return "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one numeric digit.";
    }
  
    return "";
  };
  

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      return "Passwords do not match.";
    }
    return "";
  };

  const validateFullName = (value) => {
    if (!/^[a-zA-Z]+$/.test(value)) {
      return "Full name can only contain alphabets.";
    }
    return "";
  };

  const validateDOB = (value) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (!dateRegex.test(value)) {
      return "Invalid date format. Please use YYYY-MM-DD format.";
    }
  
    const inputDate = new Date(value);
    const currentDate = new Date();
  
    if (isNaN(inputDate.getTime())) {
      return "Invalid date.";
    }
  
    // Assuming you want to allow DOB between 100 years ago and today
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
  
    if (inputDate > currentDate || inputDate < minDate) {
      return "Date of birth must be between 100 years ago and today.";
    }
  
    return "";
  };

  const validateGender = (value) => {
    if (!value) {
      return "Gender is required.";
    }
    return "";
  };
  


  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let error = "";

    if (name === "username") {
      error = validateUsername(value);
    } else if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    } else if (name === "confirmPassword") {
      error = validateConfirmPassword(value);
    } else if (name === "fullname") {
      error = validateFullName(value);
    } else if (name === "dob") {
      error = validateDOB(value);
    } else if (name === "gender") {
      error = validateGender(value);
    }

    setErrors((prevState) => ({ ...prevState, [name]: error }));
    // Update state with the entered value
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "fullname") {
      setFullName(value);
    } else if (name === "dob") {
      setDOB(value);
    } else if (name === "gender") {
      setGender(value);
    }
    if(name==='username'){
      setUsername(value);
      setAddedby(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validation logic...
    let validationPassed = true;
    const validationErrors = {};

    // Validation checks...
    if (!username) {
      validationErrors.username = "Username is required";
      validationPassed = false;
    }
    if (!email) {
      validationErrors.email = "Email is required";
      validationPassed = false;
    }
    if (!password) {
      validationErrors.password = "Password is required";
      validationPassed = false;
    }
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
      validationPassed = false;
    }
    if (!fullname) {
      validationErrors.fullname = "Full name is required";
      validationPassed = false;
    }
    if (!dob) {
      validationErrors.dob = "Date of birth is required";
      validationPassed = false;
    }
    if (!gender) {
      validationErrors.gender = "Gender is required";
      validationPassed = false;
    }

    if (!validationPassed) {
      setErrors(validationErrors);
      return;
    }

    // Form submission logic...
    try {
      await dispatch(
        addFormsToServer({
          username,
          email,
          password,
          fullname,
          dob,
          gender,
          addedby,
        })
      );
      setSubmitted(true);
    } catch (error) {
      // Handle error from API
      if (error.message === "Email already exists") {
        setErrors((prevState) => ({
          ...prevState,
          email: "Email already exists",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          email: "", // Clear the error for email if it was existing error
        }));
      }
    }
  };


  return (
    <div className="signup-container">
      <Typography variant="h6" style={{color:'red'}}>SIGN UP</Typography><br />
      <form onSubmit={handleSubmit} className="signup-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              value={username}
              onChange={handleInputChange}
              error={!!errors.username}
              helperText={errors.username}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={email}
              onChange={handleInputChange}
              error={!!errors.email || errors.email === "Email already exists"}  // Add this line
              helperText={errors.email || (errors.email === "Email already exists" && "Email already exists")}  // Add this line
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              variant="outlined"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              variant="outlined"
              name="fullname"
              value={fullname}
              onChange={handleInputChange}
              error={!!errors.fullname}
              helperText={errors.fullname}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label=""
              variant="outlined"
              name="dob"
              type="date"
              value={dob}
              onChange={handleInputChange}
              error={!!errors.dob}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className="form-field">
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={gender}
                onChange={handleInputChange}
                error={!!errors.gender}
              >
                <MenuItem value="">
                  <em>Select a Gender</em>
                </MenuItem>
                {genders.map((genderOption, index) => (
                  <MenuItem key={index} value={genderOption}>
                    {genderOption}
                  </MenuItem>
                ))}
              </Select>
              {errors.gender && <Typography color="error">{errors.gender}</Typography>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="User"
              variant="outlined"
              name="addedby"
              value={addedby}
              onChange={handleInputChange}
              error={!!errors.addedby}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" className="submit-button">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {submitted && (
        <div className="submission-message">
          <Typography variant="h6">Thank you!</Typography>
          <Typography variant="body1">form submitted successfully</Typography>
        </div>
      )}
    </div>
  );
};

export default Signup;