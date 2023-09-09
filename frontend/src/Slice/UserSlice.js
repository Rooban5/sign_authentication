import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    FormList:[],
    selectedTask:{},
    isLoading:false,
    error:''
}

const MY_URL = 'http://localhost:3535/signup'
// export const fetchTasks = createAsyncThunk(
//     "Courses/fetchTasks",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await fetch(MY_URL);
//             if (response.ok) {
//                 const jsonResponse = await response.json();
//                 return jsonResponse;
//             } else {
//                 return rejectWithValue({ error: 'Failed to fetch tasks' });
//             }
//         } catch (error) {
//             return rejectWithValue({ error: 'An error occurred while fetching tasks' });
//         }
//     }
// );
//GET
//get the data
export const getFormsFromServer = createAsyncThunk(
    "Forms/getFormsFromServer",
    async (_,{rejectWithValue}) => {
        const response = await fetch('http://localhost:3535/signup/get')
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'Forms not Found'})
        }
    }
)
//User Signup
export const addFormsToServer = createAsyncThunk(
    "Forms/addFormsToServer",
    async (form,{rejectWithValue}) => {
        const options = {
            method:'POST',
            body: JSON.stringify(form),
            headers: {
                "Content-type":"application/json",
                "Authorization": sessionStorage.getItem("authToken")
            }
        }
        const token = sessionStorage.getItem("authToken")

        const response = await fetch('http://localhost:3535/signup',options)
        console.log(response)
        console.log("SuccessFull Added")

        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'Forms Not Added'})
        }
    }
)



  
// //PATCH 
// export const updateCoursesInServer = createAsyncThunk(
//     "Courses/updateCoursesInServer",
//     async (form,{rejectWithValue}) => {
//         const options = {
//             method:'PATCH',
//             body: JSON.stringify(form),
//             headers: {
//                 "Content-type":"application/json; charset=UTF-8"
//             }
//         }
//         const response = await fetch(MY_URL + '/' + form.id,options)
//         if (response.ok) {
//             const jsonResponse = await response.json()
//             return jsonResponse
//         } else {
//             return rejectWithValue({error:'Courses Not updated'})
//         }
//     }
// )

//DELETE 
export const deleteFormsFromServer = createAsyncThunk(
    "Forms/deleteFormsFromServer",
    async (form,{rejectWithValue}) => {
        const options = {
            method:'DELETE',
           
        }
        const response = await fetch(`http://localhost:3535/signup/deletesignup/${form._id}`, options);
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'forms Not Delete'})
        }
    }
)

// forgot passsword
export const sendPasswordResetEmail = createAsyncThunk(
    "User/sendPasswordResetEmail",
    async (email, thunkAPI) => {
      try {
        const response = await axios.post(
          "http://localhost:3535/login/forgot-password",
          { email }
        );
        return response.data.message;
      } catch (error) {
        return thunkAPI.rejectWithValue("An error occurred");
      }
    }
  );
  //reset password
  export const resetPassword = createAsyncThunk(
    "User/resetPassword",
    async ({ token, passwords }, thunkAPI) => {
      try {
        const response = await fetch(
          `http://localhost:3535/reset-password/${token}`, // Pass the token in the URL
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ passwords }),
          }
        );
  
        const data = await response.json();
        return data.message;
      } catch (error) {
        return thunkAPI.rejectWithValue("An error occurred");
      }
    }
  );  

//   export const createUser = createAsyncThunk(
//     "user/createUser",
//     async (userData, { rejectWithValue }) => {
//       try {
//         const response = await axios.post("http://localhost:3535/signups", userData);
//         return response.data;
//       } catch (error) {
//         if (error.response) {
//           // Server responded with a non-2xx status code
//           return rejectWithValue(error.response.data);
//         } else {
//           // Network error or other issues
//           return rejectWithValue("An error occurred");
//         }
//       }
//     }
//   );

  
const FormsSlice = createSlice({
    name:'FormsSlice',
    initialState,
    reducers: {
        // addTaskToList:(state,action) => {
        //     const id = Math.random() * 100
        //     let task = {...action.payload,id}
        //     state.tasksList.push(task)
        // },
        removeTaskFromList:(state,action) => {
            state.FormList = state.FormList.filter((form) => form.id !== action.payload.id)
        },
        // updateTaskInList:(state,action) => {
        //     state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task )
        // },
        setSelectedTask:(state,action) => {
            state.selectedTask = action.payload
        }

    },
    extraReducers:(builder) => {
        builder
            .addCase(getFormsFromServer.pending,(state) => {
                state.isLoading = true
            })
            .addCase(getFormsFromServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.FormList = action.payload
            })
            .addCase(getFormsFromServer.rejected,(state,action) => {
                // state.error = action.payload.error
                state.isLoading = false
                state.FormList = []
            })
            .addCase(addFormsToServer.pending,(state) => {
                state.isLoading = true
            })
            .addCase(addFormsToServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.FormList.push(action.payload)
            })
            .addCase(addFormsToServer.rejected,(state,action) => {
                // state.error = action.payload.error
                state.isLoading = false
            })
           
            .addCase(deleteFormsFromServer.pending,(state) => {
                state.isLoading = true
            })
            .addCase(deleteFormsFromServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
            })
            .addCase(deleteFormsFromServer.rejected,(state,action) => {
                // state.error = action.payload.error
                state.isLoading = false
            })

            

            builder.addCase(sendPasswordResetEmail.fulfilled, (state, action) => {
                state.resetMessage = action.payload;
              });
              builder
              .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetPassword.message = action.payload;
                state.resetPassword.error = "";
              })
              .addCase(resetPassword.rejected, (state, action) => {
                state.resetPassword.message = "";
                state.resetPassword.error = action.error.message;
              });
    }

})

export const {addTaskToList,removeTaskFromList,updateTaskInList,setSelectedTask} = FormsSlice.actions

export default FormsSlice.reducer