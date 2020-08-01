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
  registerUserActivity,
  deleteUserActivity,
  messageError,
  GET_RESET_PASSWORD,
  setReset,
  PATCH_RESET_PASSWORD,
  GET_VERIFY_ACCOUNT,
  setIsVerified,
} from 'src/actions/user';

import {
  FETCH_ACTIVITIES,
  saveActivities,
  CREATE_ACTIVITY,
  REGISTER_ACTIVITY,
  LEFT_ACTIVITY,
  redirectionCreate,
} from '../actions/activities';

import { saveTags } from '../actions/tag';

const baseUrl = 'http://localhost:3000';

const ajaxMiddleware = (store) => (next) => (action) => {
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
    case FETCH_ACTIVITIES: {
      axios.all([
        axios.get(`${baseUrl}/activity`),
        axios.get(`${baseUrl}/tag`),
      ])
        .then(axios.spread((activities, tags) => {
          // do something with both responses
          setTimeout(() => {
            store.dispatch(saveTags(tags.data));
            store.dispatch(saveActivities(activities.data));
          }, 700);
        }));

      next(action);
      break;
    }
    case CREATE_ACTIVITY: {
      const state = store.getState();
      const { userId } = state.user;
      const {
        title,
        description,
        // eslint-disable-next-line camelcase
        free_place,
        location,
        date,
        hour,
      } = state.activities;
      const { tagId } = state.tag;
      axios.post(`${baseUrl}/activity`, {
        title,
        description,
        free_place,
        location,
        date,
        hour,
        tagId,
        userId,
      })
        .then(() => {
          store.dispatch(isLoading());
          setTimeout(() => {
            store.dispatch(isLoading());
            store.dispatch(redirectionCreate());
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;
    }

    case REGISTER_ACTIVITY: {
      // eslint-disable-next-line prefer-destructuring
      const userId = action.user;
      axios.post(`${baseUrl}/activity/${action.id}/user`, {
        userId,
      })
        .then(() => {
          store.dispatch(registerUserActivity());
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;
    }

    case LEFT_ACTIVITY: {
      // eslint-disable-next-line prefer-destructuring
      axios.delete(`${baseUrl}/activity/${action.id}/user/${action.user}`, {
      })
        .then(() => {
          store.dispatch(deleteUserActivity());
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;
    }

    case GET_RESET_PASSWORD: {
      const { token } = action;
      axios.post('/api/reset-password', {
        token,
      })
        .then((response) => {
          if (response.data.reset) {
            store.dispatch(setReset(true));
          }
        })
        .catch(() => {
          store.dispatch(setReset(false));
        });
      next(action);
      break;
    }

    case PATCH_RESET_PASSWORD: {
      const state = store.getState();
      const { password, passwordConfirm } = state.user;
      const { token } = action;
      axios.patch(`${baseUrl}/user/reset-password`, {
        token,
        password,
        passwordConfirm,
      })
        .then((response) => {
          if (response.data.status === 'success') {
            store.dispatch(isLoading());
            setTimeout(() => {
              store.dispatch(isLoading());
              store.dispatch(redirection());
            }, 1500);
          }
        })
        .catch((error) => {
          console.error(error);
          store.dispatch(messageError('Demande de réinitialisation de mot de passe expirée ou invalide.'));
        });
      next(action);
      break;
    }

    case GET_VERIFY_ACCOUNT: {
      const { token } = action;
      axios.post(`${baseUrl}/user/verify-account`, {
        token,
      })
        .then((response) => {
          if (response.data.isVerified) {
            store.dispatch(setIsVerified(true));
          }
        })
        .catch(() => {
          store.dispatch(setIsVerified(false));
        });
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default ajaxMiddleware;
