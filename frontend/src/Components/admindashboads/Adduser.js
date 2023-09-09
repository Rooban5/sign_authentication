import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Adduser } from "../../Slice/addminSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/AuthContext";
import './admin.css'
const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { username, } = useAuth(); // Access the authenticated user
  const addedby = useAuth().username
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    // username1: "",
    addedby: "",
  });

  const { username, email, password } = inputValue;
  const [formErrors, setFormErrors] = useState({
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username,
        email,
        password,
        // username1,
        addedby,
      };

      const response = await dispatch(Adduser(userData));
      const { success, message } = response.payload;

      if (success) {
        handleSuccess(message);
        console.log("response", response)

        console.log("addedby", addedby)
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      // username1: "",
      username: "",
    });
  };

  // const categories = useSelector((state) => state.categories.categories);

  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, [dispatch]);

  return (
    <div className="form_container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            name="username"
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="addedBy">Added By</label>
          <input
            type="text"
            name="addedby"
            value={addedby}
            placeholder="Enter the added by use
            rname"
            onChange={handleOnChange}
          />
        </div>

        <button type="submit">Submit</button>
        <br />
        <br />
        <Link to="/dashboard">
          {" "}
          <button type="submit">Go back</button>
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddUser;
