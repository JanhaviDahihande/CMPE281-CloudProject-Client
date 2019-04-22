// @flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  AnimatedView,
  Panel,
  RequestNodes as RequestNodesComponent
}                         from '../../components';
import Highlight          from 'react-highlight';


class RequestNodes extends PureComponent {
  componentWillMount() {
    const { actions: { enterStatsCard } } = this.props;
    enterStatsCard();
  }

  componentWillUnmount() {
    const { actions: { leaveStatsCard } } = this.props;
    leaveStatsCard();
  }

  render() {
    const source = `
      // import
      import { StatsCard } from './_SOMEWHERE_/components';

      // in render():
      <div className="col-md-3">
        <StatsCard
          statValue={'3200'}
          statLabel={'Total Tasks'}
          icon={<i className="fa fa-check-square-o"></i>}
          backColor={'red'}
        />
      </div>
      <div className="col-md-3">
        <StatsCard
          statValue={'2200'}
          statLabel={'Total Messages'}
          icon={<i className="fa fa-envelope-o"></i>}
          backColor={'violet'}
        />
      </div>
      <div className="col-md-3">
        <StatsCard
          statValue={'100,320'}
          statLabel={'Total Profit'}
          icon={<i className="fa fa-dollar"></i>}
          backColor={'blue'}
        />
      </div>
      <div className="col-md-3">
        <StatsCard
          statValue={'4567'}
          statLabel={'Total Documents'}
          icon={<i className="fa fa-paperclip"></i>}
          backColor={'green'}
        />
      </div>`;

    return(
      
    );
  }
}

RequestNodes.propTypes= {
  actions: PropTypes.shape({
    enterStatsCard: PropTypes.func.isRequired,
    leaveStatsCard: PropTypes.func.isRequired
  })
};

export default RequestNodes;
