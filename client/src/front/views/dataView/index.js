// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../redux/modules/actions';
import DataView from './DataView';

const mapStateToProps = state => {
  return {
    currentView: state.views.currentView,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        // enterTwitterFeed: actions.enterTwitterFeed,
        // leaveTwitterFeed: actions.leaveTwitterFeed,
      },
      dispatch,
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataView);
