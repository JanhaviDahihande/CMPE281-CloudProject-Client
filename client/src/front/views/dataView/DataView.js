// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import { AnimatedView, Panel } from '../../components';
import { UserComponent } from './UserComponent';

class DataView extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: [],
      userNames: [],
      clusterNames: [],
      nodeNames: [],
      sensor_data: [],
    };
    this.handleOnZipCodeChange = this.handleOnZipCodeChange.bind(this);
    this.handleOnClusterNameChange = this.handleOnClusterNameChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  async componentDidMount() {
    // const response = await fetch(`process.env.REACT_APP_SERVER_URL + '/api/myrequests/5cbd62b6a090d8249f70a016`);
    // const json = await response.json();
    // this.setState({ data: json });
    //console.log('Heyy');
    let user_id = JSON.parse(localStorage.getItem('user_id'));
    // console.log('User_id' + user_id);
    try {
      var url = process.env.REACT_APP_SERVER_URL + '/api/users';
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log(json.message);
          var data = json.message; //gets data in string
          // console.log(typeof data);
          data = JSON.parse(data);
          // console.log(typeof data);
          this.setState({ userNames: data });
        });
    } catch (error) {
      // console.log(error);
    }
  }

  async handleOnZipCodeChange(event: SyntheticEvent<>) {
    event.preventDefault();
    let user_name = document.getElementById('user_name').value;
    let zipcode = document.getElementById('zip_code').value;

    try {
      var url =
        process.env.REACT_APP_SERVER_URL +
        '/api/users/' +
        user_name +
        '/zip/' +
        zipcode;
      console.log(url);
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log(json.message);
          var data = json.message; //gets data in string
          // console.log(typeof data);
          data = JSON.parse(data);
          // console.log(typeof data);
          this.setState({ clusterNames: data });
        });
    } catch (error) {
      // console.log(error);
    }
  }

  async handleOnClusterNameChange(event: SyntheticEvent<>) {
    let cluster_name = document.getElementById('cluster_name').value;

    try {
      var url =
        process.env.REACT_APP_SERVER_URL + '/api/cluster/' + cluster_name;
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log(json.message);
          var data = json.message; //gets data in string
          // console.log(typeof data);
          data = JSON.parse(data);
          // console.log(typeof data);
          this.setState({ nodeNames: data });
        });
    } catch (error) {
      // console.log(error);
    }
  }

  async handleOnSubmit(event: SyntheticEvent<>) {
    event.preventDefault();
    console.log('in handleonsubmit');
    let node_id = document.getElementById('node').value;
    console.log('node_id: ' + node_id);
    try {
      var url =
        process.env.REACT_APP_SERVER_URL + '/api/dataview/sensor/' + node_id;
      console.log(url);
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log(json.message);
          var data = json.message; //gets data in string
          console.log(data);
          data = JSON.parse(data);
          console.log(data);
          this.setState({ sensor_data: data });
          console.log(this.state.sensor_data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let rows = this.state.clusterNames.map(request => {
      return (
        <RequestClusterNames key={request.user_id} clusterNames={request} />
      );
    });

    let nodes = this.state.nodeNames.map(request => {
      return <RequestNodeNames key={request.user_id} nodeNames={request} />;
    });

    let sensors = this.state.sensor_data.map(request => {
      return <RequestSensorData key={request.node_id} sensor_data={request} />;
    });

    return (
      <AnimatedView>
        <div>
          <Panel
            title="Request Actions"
            hasTitle={true}
            bodyBackGndColor={'#FFF'}
          >
            <form className="form-horizontal tasi-form" method="get">
              <div className="form-group">
                <label className="col-sm-2 control-label">Start Date:</label>
                <div className="col-md-2">
                  <input type="date" id="start_date" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">End Date:</label>
                <div className="col-md-2">
                  <input type="date" id="end_date" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 col-sm-2 control-label">
                  User Name:
                </label>
                <div className="col-md-2">
                  <UserComponent
                    id="user_name"
                    state={this.state}
                    onChange={this.handleOnUserNameChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Zip Code:</label>
                <div className="col-md-2">
                  <input type="text" id="zip_code" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 col-sm-2 control-label">
                  Cluster Name:
                </label>
                <div className="col-md-2">
                  <select
                    id="cluster_name"
                    className="form-control m-b-10"
                    // value={this.state.clusterNames}
                    onClick={this.handleOnZipCodeChange}
                  >
                    {rows}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 col-sm-2 control-label">Node:</label>
                <div className="col-md-2">
                  <select
                    id="node"
                    className="form-control m-b-10"
                    // value={this.state.nodes}
                    onClick={this.handleOnClusterNameChange}
                    onChange={this.handleOnNodeChange}
                  >
                    {nodes}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 col-sm-2 control-label">
                  Sensor Type:
                </label>
                <div className="col-md-2">
                  <select
                    id="sensor_type"
                    className="form-control m-b-10"
                    onChange={this.handleOnSensorTypeChange}
                    multiple
                  >
                    <option value="pH">pH</option>
                    <option value="temp">Temperature</option>
                    <option value="airflow">Airflow</option>
                    <option value="humidity">Humidity</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="col-lg-offset-2 col-lg-10">
                  <button
                    onClick={this.handleOnSubmit}
                    className="btn btn-success"
                  >
                    Submit
                  </button>
                  <button type="reset" className="btn btn-danger">
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </Panel>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="panel">
              <header className="panel-heading">Sensor Data</header>
              <div className="panel-body table-responsive ">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Sensor ID</th>
                      <th>Node ID</th>
                      <th>Cluster ID</th>
                      <th>Sensor Type</th>
                      <th>Value</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>{sensors}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </AnimatedView>
    );
  }
}

const RequestClusterNames = props => {
  return (
    <option key={props.clusterNames.cluster_name}>
      {props.clusterNames.cluster_name}
    </option>
  );
};

const RequestNodeNames = props => {
  return (
    <option key={props.nodeNames.node_id}>{props.nodeNames.node_id}</option>
  );
};

const RequestSensorData = props => {
  return (
    <tr>
      <td>{props.sensor_data.sensor_id}</td>
      <td>{props.sensor_data.node_id}</td>
      <td>{props.sensor_data.cluster_id}</td>
      <td>{props.sensor_data.type}</td>
      <td>{props.sensor_data.value}</td>
      <td>{props.sensor_data.status ? 'Active' : 'Inactive'}</td>
    </tr>
  );
};

export default DataView;

// <tr>
// <td>183</td>
// <td>John Doe</td>
// <td>11-7-2014</td>
// <td>
//   <span className="label label-success">Approved</span>
// </td>
// <td>
//   Bacon ipsum dolor sit amet salami venison chicken flank
//   fatback doner.
// </td>
// </tr>
