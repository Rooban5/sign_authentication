import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: true,
  error: null,
  resetMessage: "",
};

const getToken = () => {
  const token = sessionStorage.getItem("authToken");
  return `Bearer ${token}`;
};


// Define the async thunk for user registration
export const Adduser = createAsyncThunk(
  'user/Adduser',
  async (userData, { rejectWithValue }) => {
    try {
      const token = getToken(); // Retrieve the token

      // Ensure you have the token before making the request
      if (!token) {
        return rejectWithValue('Token is missing');
      }

      const response = await axios.post(
        'http://localhost:3535/AdminSignup', // Replace with your endpoint URL
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken(), // Include the Bearer token in the headers
          },
        }
      );

      const { token: responseToken, message } = response.data;
      return { success: true, message, token: responseToken };
    } catch (error) {
      console.error('Error in Adduser:', error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An error occurred');
      }
    }
  }
);
// admin Login User

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3535/logins', loginData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


// export const sendPasswordResetEmail = createAsyncThunk(
//   "user/sendPasswordResetEmail",
//   async (email, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3535/login/forgot-password",
//         { email }
//       );
//       return response.data.message;
//     } catch (error) {
//       return rejectWithValue("An error occurred");
//     }
//   }
// );

// export const resetPassword = createAsyncThunk(
//   "user/resetPassword",
//   async ({ token, passwords }, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3535/reset-password/${token}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ passwords }),
//         }
//       );

//       const data = await response.json();
//       return data.message;
//     } catch (error) {
//       return rejectWithValue("An error occurred");
//     }
//   }
// );

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Adduser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Adduser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(Adduser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
 
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
