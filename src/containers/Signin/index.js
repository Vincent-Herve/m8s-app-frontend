// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Signin from 'src/components/Signin';

// Action Creators
import { submitConnect, changeValue, messageError } from 'src/actions/user';

const mapStateToProps = (state, ownProps) => ({
  email: state.user.email,
  password: state.user.password,
  isLoading: state.user.isLoading,
  messageError: state.user.messageError,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmitConnect: () => {
    dispatch(submitConnect());
  },
  changeField: (value, name) => {
    dispatch(changeValue(value, name));
  },
  setMessageError: (message) => {
    dispatch(messageError(message));
  },
});

// Container
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin);
