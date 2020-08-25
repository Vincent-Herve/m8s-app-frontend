/* eslint-disable no-console */
import axios from 'axios';

import {
  isLoading,
  registerUserActivity,
  deleteUserActivity,
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

const activityMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_ACTIVITIES: {
      axios.all([
        axios.get(`${baseUrl}/activity`),
        axios.get(`${baseUrl}/tag`),
      ])
        .then(axios.spread((activities, tags) => {
          // do something with both responses
          store.dispatch(saveTags(tags.data));
          store.dispatch(saveActivities(activities.data));
        }))
        .catch((error) => {
          console.error(error);
        });

      next(action);
      break;
    }
    case CREATE_ACTIVITY: {
      const state = store.getState();
      const { token, userId } = sessionStorage;
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
      axios({
        method: 'post',
        url: `${baseUrl}/activity`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          title,
          description,
          free_place,
          location,
          date,
          hour,
          tagId,
          userId,
        },
      }).then(() => {
        store.dispatch(isLoading());
        setTimeout(() => {
          store.dispatch(isLoading());
          store.dispatch(redirectionCreate());
        }, 500);
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
    default:
      next(action);
  }
};

export default activityMiddleware;
