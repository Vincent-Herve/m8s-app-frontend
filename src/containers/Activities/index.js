import { connect } from 'react-redux';

// == Import : local
import Activities from 'src/components/Activities';

// Action Creators
import { registerActivity, leftActivity, changeValue } from 'src/actions/activities';
import { changeTag } from 'src/actions/tag';

const mapStateToProps = (state, ownProps) => ({
  activities: state.activities.list,
  userId: state.user.userId,
  isLogged: state.user.isLogged,
  tags: state.tag.list,
  location: state.activities.location,
  tagName: state.tag.tagId,
  reload: state.user.reload,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  registerActivity: (id, user) => {
    dispatch(registerActivity(id, user));
  },
  leftActivity: (id, user) => {
    dispatch(leftActivity(id, user));
  },
  changeField: (value, name) => {
    dispatch(changeValue(value, name));
  },
  changeTag: (value) => {
    dispatch(changeTag(value));
  },
});
// Container
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Activities);
