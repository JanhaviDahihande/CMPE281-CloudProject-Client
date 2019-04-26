// flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  AnimatedView,
  StatsCard,
  EarningGraph,
  Notifications,
  WorkProgress,
  TwitterFeed,
  TodoListDemo,
  TeamMatesDemo,
} from '../../components';
import BarChart from "../../models/BarChart";
import PieChart from "../../models/PieChart";
import MapChart from "../../models/MapChart";

class Home extends PureComponent {
  static propTypes = {
    earningGraphLabels: PropTypes.array,
    earningGraphDatasets: PropTypes.array,
    teamMatesIsFetching: PropTypes.bool,
    teamMates: PropTypes.arrayOf(
      PropTypes.shape({
        picture: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        profile: PropTypes.string,
        profileColor: PropTypes.oneOf(['danger', 'warning', 'info', 'success']),
      }),
    ),
    actions: PropTypes.shape({
      enterHome: PropTypes.func,
      leaveHome: PropTypes.func,
      fetchEarningGraphDataIfNeeded: PropTypes.func,
      fetchTeamMatesDataIfNeeded: PropTypes.func,
    }),
  };

  componentDidMount() {
    const {
      actions: {
        enterHome,
        fetchEarningGraphDataIfNeeded,
        fetchTeamMatesDataIfNeeded,
      },
    } = this.props;

    enterHome();
    fetchEarningGraphDataIfNeeded();
    fetchTeamMatesDataIfNeeded();
  }

  componentWillUnmount() {
    const {
      actions: { leaveHome },
    } = this.props;
    leaveHome();
  }

  render() {
    const {
      teamMates,
      teamMatesIsFetching,
      earningGraphLabels,
      earningGraphDatasets,
    } = this.props;

    return (
      <AnimatedView>
        <div className="row" style={{ marginBottom: '5px' }}>
          <div className="col-md-3">
            <StatsCard
              statValue={'6'}
              statLabel={'Total Clusters  '}
              icon={<i className="fa fa-wifi" />}
              backColor={'red'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={'23'}
              statLabel={'Total Nodes'}
              icon={<i className="fa fa-map-marker" />}
              backColor={'violet'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={'88'}
              statLabel={'Total Sensors'}
              icon={<i className="fa fa-dot-circle-o" />}
              backColor={'blue'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={'23'}
              statLabel={'Registered Farmers'}
              icon={<i className="fa fa-users" />}
              backColor={'green'}
            />
          </div>
        </div>

        <div>
          <div className="col-md-6">
            <EarningGraph
              labels={earningGraphLabels}
              datasets={earningGraphDatasets}
            />
            <div className="row">
              <div className="col-md-6">
                <MapChart />
              </div>
              <div className="col-md-6">
                <PieChart />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <BarChart />
          </div>
        </div>

        {/* <div style={{margin: 10}}>
        <BarChart/>
        </div>
        <div style={{margin: 10}}>
        <PieChart/>
        </div>
        <div style={{margin: 10}}>
        <MapChart/>
        </div> */}
        
        {/* <div className="row">
          <div className="col-md-5">
            <TeamMatesDemo
              isFetching={teamMatesIsFetching}
              members={teamMates}
            />
          </div>
          <div className="col-md-7">
            <TodoListDemo />
          </div>
        </div> */}
      </AnimatedView>
    );
  }
}

export default Home;
