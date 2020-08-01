import {
  CHANGE_VALUE,
  SET_USER_ID,
  SET_TOKEN,
  SAVE_USER,
  SIGNOUT,
  REDIRECTION,
  IS_LOADING,
  REGISTER_USER_ACTIVITY,
  DELETE_USER_ACTIVITY,
  MESSAGE_ERROR,
  SET_RESET,
  SET_IS_VERIFIED,
} from 'src/actions/user';

export const initialState = {
  token: '',
  userId: '',
  redirection: false,
  reset: '',
  isVerified: '',
  isLoading: false,
  reload: false,
  messageError: '',
  userProfil: {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
  },
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordConfirm: '',
  isLogged: false,
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.id,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SAVE_USER:
      return {
        ...state,
        isLogged: true,
        userProfil: {
          username: action.username,
          firstname: action.firstname,
          lastname: action.lastname,
          email: action.email,
        },
      };
    case SIGNOUT:
      return {
        ...state,
        isLogged: false,
        userProfil: {
          username: '',
          firstname: '',
          lastname: '',
          email: '',
        },
      };
    case REDIRECTION:
      return {
        ...state,
        redirection: !state.redirection,
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirm: '',
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case REGISTER_USER_ACTIVITY:
      return {
        ...state,
        reload: !state.reload,
      };
    case DELETE_USER_ACTIVITY:
      return {
        ...state,
        reload: !state.reload,
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        messageError: action.message,
      };
    case SET_RESET:
      return {
        ...state,
        reset: action.bool,
      };
    case SET_IS_VERIFIED:
      return {
        ...state,
        isVerified: action.bool,
      };
    default:
      return state;
  }
};

export default user;
