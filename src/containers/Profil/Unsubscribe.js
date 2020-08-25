import { connect } from 'react-redux';

import Unsubscribe from 'src/components/Profil/Unsubscribe';

import { unsubscribe } from 'src/actions/user';

const mapStateToProps = (state, ownProps) => ({
  activities: state.activities.list,
  userId: state.user.userId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleUnsubscribe: () => {
    dispatch(unsubscribe());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Unsubscribe);
