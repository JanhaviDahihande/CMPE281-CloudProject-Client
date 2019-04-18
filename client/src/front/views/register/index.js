// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewsActions from '../../redux/modules/views';
import * as userAuthActions from '../../redux/modules/userAuth';
import Register from './Register';


const mapStateToProps = state => {
  return {
    currentView: state.views.currentView,
    isAuthenticated: state.userAuth.isAuthenticated,
    isFetching: state.userAuth.isFetching,
    isLogging: state.userAuth.isLogging,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...viewsActions,
      ...userAuthActions,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);