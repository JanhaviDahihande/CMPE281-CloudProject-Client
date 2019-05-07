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

class HomeUser extends PureComponent {
  constructor() {
    super();
    this.state = {
      no_of_nodes: 0,
      no_of_clusters: 0,
      no_of_sensors: 0,
    };
  }

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

  async componentDidMount() {
    const {
      actions: {
        enterHome,
        fetchEarningGraphDataIfNeeded,
        fetchTeamMatesDataIfNeeded,
      },
    } = this.props;
    let user_id = JSON.parse(localStorage.getItem('user_id'));
  try {
       var url = process.env.REACT_APP_SERVER_URL + '/api/infrastructure/getdetails/user/totalnodes/' + user_id;
        console.log(url);
        await fetch(url)
          .then(res => res.json())
          .then(json => {
            console.log("Here");
            console.log(json.message);
            var data = json.message; //gets data in string
            data = JSON.parse(data);
            this.setState({ no_of_nodes: data, no_of_sensors: data*4 });
          });
    } catch (error) {
      console.log("Error");
    }

    try {
      url = process.env.REACT_APP_SERVER_URL + '/api/infrastructure/getdetails/user/totalclusters/' + user_id;
       console.log(url);
       await fetch(url)
         .then(res => res.json())
         .then(json => {
           console.log("Here");
           console.log(json.message);
           var data = json.message; //gets data in string
           data = JSON.parse(data);
           this.setState({ no_of_clusters: data });
         });
   } catch (error) {
     console.log("Error");
   }
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
              statValue={this.state.no_of_clusters}
              statLabel={'Total Clusters  '}
              icon={<i className="fa fa-wifi" />}
              backColor={'red'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={this.state.no_of_nodes}
              statLabel={'Total Nodes'}
              icon={<i className="fa fa-map-marker" />}
              backColor={'violet'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={this.state.no_of_sensors}
              statLabel={'Total Sensors'}
              icon={<i className="fa fa-dot-circle-o" />}
              backColor={'blue'}
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
        {/* <div className="row">
          <div className="col-md-8">
            <EarningGraph
              labels={earningGraphLabels}
              datasets={earningGraphDatasets}
            />
          </div>
          <div className="col-lg-4">
            <Notifications />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <WorkProgress />
          </div>
          <div className="col-md-4">
            <TwitterFeed />
          </div>
        </div>

        <div className="row">
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

export default HomeUser;
