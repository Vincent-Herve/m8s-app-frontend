export const CHANGE_VALUE = 'CHANGE_VALUE';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER_ID = 'SET_USER_ID';
export const SIGNIN = 'SIGNIN';
export const SUBMIT_CONNECT = 'SUBMIT_CONNECT';
export const SAVE_USER = 'SAVE_USER';
export const CHECK_IS_LOGGED = 'CHECK_IS_LOGGED';
export const REDIRECTION = 'REDIRECTION';
export const IS_LOADING = 'IS_LOADING';
export const SIGNUP = 'SIGNUP';
export const SIGNOUT = 'SIGNOUT';
export const UNSUBSCRIBE = 'UNSUBSCRIBE';
export const EDIT_PROFIL = 'EDIT_PROFIL';
export const REGISTER_USER_ACTIVITY = 'REGISTER_USER_ACTIVITY';
export const DELETE_USER_ACTIVITY = 'DELETE_USER_ACTIVITY';
export const MESSAGE_ERROR = 'MESSAGE_ERROR';
export const GET_RESET_PASSWORD = 'GET_RESET_PASSWORD';
export const PATCH_RESET_PASSWORD = 'PATCH_RESET_PASSWORD';
export const GET_VERIFY_ACCOUNT = 'GET_VERIFY_ACCOUNT';
export const SET_RESET = 'SET_RESET';
export const SET_IS_VERIFIED = 'SET_IS_VERIFIED';


// controlled field in component ==> Signup, Signin, EditProfil
export const changeValue = (value, name) => ({
  type: CHANGE_VALUE,
  name,
  value,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setUserId = (id) => ({
  type: SET_USER_ID,
  id,
});

// redirection used in case ajaxMiddleware ==> SIGNIN, SIGNUP, SIGNOUT, UNSUBSCRIBE, EDIT_PROFIL
export const redirection = () => ({
  type: REDIRECTION,
});

// isLoading used in case ajaxMiddleware ==> SIGNIN, SIGNUP, EDIT_PROFIL, SEARCH_ACTIVITY
export const isLoading = () => ({
  type: IS_LOADING,
});

// action ajaxMiddleware signin
export const signin = (userId) => ({
  type: SIGNIN,
  userId,
});

// action ajaxMiddleware submitConnect
export const submitConnect = () => ({
  type: SUBMIT_CONNECT,
});

// action reducer/user saveUser
export const saveUser = (user) => ({
  type: SAVE_USER,
  username: user.username,
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
});

// action ajaxMiddleware checkIsLogged
export const checkIsLogged = () => ({
  type: CHECK_IS_LOGGED,
});

// action ajaxMiddleware signup
export const signup = () => ({
  type: SIGNUP,
});

// action ajaxMiddleware and reducer/user signout
export const signout = () => ({
  type: SIGNOUT,
});

// action ajaxMiddlewate unsubscribe
export const unsubscribe = () => ({
  type: UNSUBSCRIBE,
});

// action ajaxMiddleware editProfil
export const editProfil = () => ({
  type: EDIT_PROFIL,
});

// action reducer/user registerUserActivity, remount app for refresh reducer/activities/list
// with action fetchActivities
export const registerUserActivity = () => ({
  type: REGISTER_USER_ACTIVITY,
});

// action reducer/user deleteUserActivity, remount app for refresh reducer/activities/list
// with action fetchActivities
export const deleteUserActivity = () => ({
  type: DELETE_USER_ACTIVITY,
});

// action reducer/user messageError, used in case ajaxMiddleware SIGNUP, SIGNIN
export const messageError = (message) => ({
  type: MESSAGE_ERROR,
  message,
});

// action ajaxMiddleware getResetPassword
export const getResetPassword = (token) => ({
  type: GET_RESET_PASSWORD,
  token,
});

// action ajaxMiddleware getVerifyAccount
export const getVerifyAccount = (token) => ({
  type: GET_VERIFY_ACCOUNT,
  token,
});

// action ajaxMiddleware patchResetPassword
export const patchResetPassword = (token) => ({
  type: PATCH_RESET_PASSWORD,
  token,
});

// action reducer/user setReset
export const setReset = (bool) => ({
  type: SET_RESET,
  bool,
});

// action reducer/user setIsVerified
export const setIsVerified = (bool) => ({
  type: SET_IS_VERIFIED,
  bool,
});
