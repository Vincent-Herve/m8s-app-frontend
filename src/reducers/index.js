import { combineReducers } from 'redux';
import user from './user';
import activities from './activities';
import tag from './tag';

export default combineReducers({
  user,
  activities,
  tag,
});
