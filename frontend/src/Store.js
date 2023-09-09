import { configureStore } from "@reduxjs/toolkit"
import formreducer from './Slice/UserSlice'
import userReducer from './Slice/addminSlice'; // Import your user reducer

export const store = configureStore({
    reducer: {
        Forms:formreducer,
        user: userReducer,

    }
})



