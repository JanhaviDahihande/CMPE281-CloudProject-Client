// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../redux/modules/actions';
import ManageCluster from './ManageCluster';

const mapStateToProps = state => {
  return {
    currentView: state.views.currentView,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        enterTabPanel: actions.enterTabPanel,
        leaveTabPanel: actions.leaveTabPanel,
      },
      dispatch,
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageCluster);
