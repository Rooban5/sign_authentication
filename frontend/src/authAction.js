// authActions.js
import { setToken, signupUser } from './Store'; // Import actions

export const authenticateUser = (userData) => async (dispatch) => {
  try {
    // Make an API request to obtain token after signup or login
    const response = await axios.post('http://localhost:3535/login', userData);
    const { token } = response.data; // Assuming the API returns a token
    dispatch(setToken(token));
    // Dispatch signupUser with the token
    await dispatch(signupUser(userData));
  } catch (error) {
    console.error(error);
  }
};
