/* eslint-disable no-console */
import axios from 'axios';

import {
  SIGNUP,
  SIGNIN,
  SIGNOUT,
  SUBMIT_CONNECT,
  setToken,
  setUserId,
  signin,
  saveUser,
  redirection,
  isLoading,
  CHECK_IS_LOGGED,
  UNSUBSCRIBE,
  signout,
  EDIT_PROFIL,
  messageError,
} from 'src/actions/user';

const baseUrl = 'http://localhost:3000';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_CONNECT: {
      const state = store.getState();
      const { email, password } = state.user;
      axios.post(`${baseUrl}/auth/signin`, {
        email,
        password,
      })
        .then((response) => {
          store.dispatch(messageError(''));
          store.dispatch(setToken(response.data.token));
          store.dispatch(setUserId(response.data.userId));
          store.dispatch(signin(response.data.userId));
        })
        .catch(() => {
          store.dispatch(messageError('Email ou mot de passe incorrect'));
        });
      next(action);
      break;
    }

    case SIGNIN: {
      axios.get(`${baseUrl}/user/${action.userId}`)
        .then((response) => {
          store.dispatch(isLoading());
          setTimeout(() => {
            store.dispatch(isLoading());
            store.dispatch(redirection());
            store.dispatch(saveUser(response.data.user));
            sessionStorage.setItem('token', store.getState().user.token);
            sessionStorage.setItem('userId', store.getState().user.userId);
          }, 1000);
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;
    }

    case SIGNUP: {
      const state = store.getState();
      const {
        username,
        firstname,
        lastname,
        email,
        password,
        passwordConfirm,
      } = state.user;

      axios.post(`${baseUrl}/auth/signup`, {
        username,
        firstname,
        lastname,
        email,
        password,
        passwordConfirm,
      })
        .then(() => {
          store.dispatch(isLoading());
          setTimeout(() => {
            store.dispatch(isLoading());
            store.dispatch(redirection());
            store.dispatch(messageError(''));
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          store.dispatch(messageError('Email ou pseudo déjà existant'));
        });
      next(action);
      break;
    }

    case SIGNOUT: {
      sessionStorage.clear();
      store.dispatch(setToken(''));
      store.dispatch(setUserId(''));
      next(action);
      break;
    }

    case CHECK_IS_LOGGED: {
      const { token, userId } = sessionStorage;
      axios({
        method: 'post',
        url: `${baseUrl}/auth/checkIsLogged`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          userId,
        },
      }).then((response) => {
        if (response.data.logged) {
          store.dispatch(setToken(token));
          store.dispatch(setUserId(userId));
          store.dispatch(saveUser(response.data.user));
          sessionStorage.setItem('token', store.getState().user.token);
          sessionStorage.setItem('userId', store.getState().user.userId);
        }
      }).catch(() => {});
      next(action);
      break;
    }

    case UNSUBSCRIBE: {
      const { token, userId } = sessionStorage;
      axios({
        method: 'delete',
        url: `${baseUrl}/user/${userId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.data.finally) {
            store.dispatch(signout());
            store.dispatch(redirection());
          }
        })
        .catch((error) => {
          console.error(error);
        });

      next(action);
      break;
    }

    case EDIT_PROFIL: {
      const { token, userId } = sessionStorage;
      const state = store.getState();
      const {
        email, password, userProfil, username, firstname, lastname,
      } = state.user;
      const newEmail = (email !== '' ? email : userProfil.email);
      const newUsername = (username !== '' ? username : userProfil.username);
      const newFirstname = (firstname !== '' ? firstname : userProfil.firstname);
      const newLastname = (lastname !== '' ? lastname : userProfil.lastname);
      const newUserProfil = {
        email: newEmail,
        username: newUsername,
        firstname: newFirstname,
        lastname: newLastname,
      };
      axios({
        method: 'patch',
        url: `${baseUrl}/user/${userId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          email,
          password,
          firstname,
          lastname,
          username,
        },
      })
        .then(() => {
          store.dispatch(isLoading());
          setTimeout(() => {
            store.dispatch(isLoading());
            store.dispatch(redirection());
            store.dispatch(saveUser(newUserProfil));
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default userMiddleware;
