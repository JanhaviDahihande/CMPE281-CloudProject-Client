// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  AnimatedView,
  Panel,
  StatsCard as StatsCardComponent,
  TabPanel as TabPanelComponent,
  TabPanelHeader as TabPanelHeaderComponent,
  TabPanelBody as TabPanelBodyComponent,
  TabPanelBodyContent as TabPanelBodyContentComponent,
} from '../../components';
import Highlight from 'react-highlight';

class ManageNode extends PureComponent {
  state = {
    mockHeader: [
      { name: 'Add Node', tablink: 'add', isActive: true },
      { name: 'View Node', tablink: 'view', isActive: false },
      { name: 'Update Node', tablink: 'update', isActive: false },
      { name: 'Delete Node', tablink: 'delete', isActive: false },
    ],
    cluster_id: '',
    latitude: '',
    longitude: '',
    node_id: '',
    data: [],
    no_of_nodes: 0,
    no_of_clusters: 0,
    no_of_sensors: 0,
    no_of_farmers: 0,
  };

  async componentWillMount() {
    const {
      actions: { enterTabPanel },
    } = this.props;
    enterTabPanel();

    try {
      var url =
        process.env.REACT_APP_SERVER_URL +
        '/api/infrastructure/getdetails/registeredfarmers';
      console.log('url: ' + url);
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log('Here');
          console.log(json.message);
          var data = json.message; //gets data in string
          data = JSON.parse(data);
          // console.log('farmers ' + data);
          this.setState({ no_of_farmers: data });
        });

      url =
        process.env.REACT_APP_SERVER_URL +
        '/api/infrastructure/getdetails/totalclusters';
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log('Here');
          console.log(json.message);
          var data = json.message; //gets data in string
          data = JSON.parse(data);
          this.setState({ no_of_clusters: data });
        });

      url =
        process.env.REACT_APP_SERVER_URL +
        '/api/infrastructure/getdetails/totalnodes';
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log('Here');
          console.log(json.message);
          var data = json.message; //gets data in string
          data = JSON.parse(data);
          this.setState({ no_of_nodes: data, no_of_sensors: data * 4 });
        });
    } catch (error) {
      console.log('Error');
    }

    try {
      var url =
        process.env.REACT_APP_SERVER_URL + '/api/manageinfrastruture/node/view';
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log(json.message);
          var data = json.message; //gets data in string
          // console.log(typeof data);
          data = JSON.parse(data);
          // console.log(typeof data);
          this.setState({ data: data });
        });
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    const {
      actions: { leaveTabPanel },
    } = this.props;
    leaveTabPanel();
  }

  render() {
    const { mockHeader, cluster_id, latitude, longitude, node_id } = this.state;

    let rows = this.state.data.map(request => {
      return <RequestRow key={request.cluster_id} data={request} />;
    });

    return (
      <AnimatedView>
        <div className="row">
          <div className="col-xs-12">
            <Panel
              title="Infrastructure Statistics"
              hasTitle={true}
              bodyBackGndColor={'#F4F5F6'}
            >
              <div className="row">
                <div className="col-md-3">
                  <StatsCardComponent
                    statValue={this.state.no_of_clusters}
                    statLabel={'Total Clusters'}
                    icon={<i className="fa fa-check-square-o" />}
                    backColor={'red'}
                  />
                </div>
                <div className="col-md-3">
                  <StatsCardComponent
                    statValue={this.state.no_of_nodes}
                    statLabel={'Total Nodes'}
                    icon={<i className="fa fa-envelope-o" />}
                    backColor={'violet'}
                  />
                </div>
                <div className="col-md-3">
                  <StatsCardComponent
                    statValue={this.state.no_of_sensors}
                    statLabel={'Total Sensors'}
                    icon={<i className="fa fa-dollar" />}
                    backColor={'blue'}
                  />
                </div>
                <div className="col-md-3">
                  <StatsCardComponent
                    statValue={this.state.no_of_farmers}
                    statLabel={'Total Farmers'}
                    icon={<i className="fa fa-paperclip" />}
                    backColor={'green'}
                  />
                </div>
              </div>
            </Panel>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">
            <Panel
              title="Manage Nodes"
              hasTitle={true}
              bodyBackGndColor={'#F4F5F6'}
            >
              <TabPanelComponent>
                <TabPanelHeaderComponent tabItems={mockHeader} />
                <TabPanelBodyComponent>
                  <TabPanelBodyContentComponent id="add" isActive>
                    <div>
                      <br />
                      <form className="form-horizontal tasi-form" method="get">
                        <div className="form-group">
                          <label className="col-sm-3 control-label">
                            Cluster Id:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              id="clusterid"
                              className="form-control"
                              onChange={this.handlesOnClusterIdChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-3 control-label">
                            Latitude:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              id="latitude"
                              className="form-control"
                              onChange={this.handlesOnLatitudeChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-3 control-label">
                            Longitude:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              id="longitude"
                              onChange={this.handlesOnLongitudeChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-offset-2 col-lg-10">
                            <button
                              type="submit"
                              className="btn btn-success"
                              onClick={this.handlesOnAddClick}
                            >
                              Add
                            </button>
                            <button type="reset" className="btn btn-danger">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </TabPanelBodyContentComponent>
                  <TabPanelBodyContentComponent id="view">
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="panel">
                          <header className="panel-heading">Nodes</header>
                          <div className="panel-body table-responsive">
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>Cluster ID</th>
                                  <th>Node ID</th>
                                  <th>Latitude</th>
                                  <th>Longitude</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>{rows}</tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanelBodyContentComponent>
                  <TabPanelBodyContentComponent id="update">
                    <div>
                      <br />
                      <label>Update position of the installed node-</label>
                      <form className="form-horizontal tasi-form" method="get">
                        <div className="form-group">
                          <label className="col-sm-3 control-label">
                            Cluster Id:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              value={cluster_id}
                              onChange={this.handlesOnClusterIdChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-3 control-label">
                            Node Id:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              value={node_id}
                              onChange={this.handlesOnNodeIdChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-3 control-label">
                            Latitude:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              value={latitude}
                              onChange={this.handlesOnLatitudeChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-3 control-label">
                            Longitude:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              value={longitude}
                              onChange={this.handlesOnLongitudeChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-offset-2 col-lg-10">
                            <button
                              type="submit"
                              onClick={this.handlesOnUpdateClick}
                              className="btn btn-success"
                            >
                              Update
                            </button>
                            <button type="reset" className="btn btn-danger">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </TabPanelBodyContentComponent>
                  <TabPanelBodyContentComponent id="delete">
                    <div>
                      <br />
                      <form className="form-horizontal tasi-form" method="get">
                        <div className="form-group">
                          <label className="col-sm-2 col-sm-2 control-label">
                            Cluster Id:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              onChange={this.handlesOnClusterIdChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 col-sm-2 control-label">
                            Node Id:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              onChange={this.handlesOnNodeIdChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-offset-2 col-lg-10">
                            <button
                              type="submit"
                              onClick={this.handlesDeleteNode}
                              className="btn btn-success"
                            >
                              Delete
                            </button>
                            <button type="reset" className="btn btn-danger">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </TabPanelBodyContentComponent>
                </TabPanelBodyComponent>
              </TabPanelComponent>
            </Panel>
          </div>
        </div>
      </AnimatedView>
    );
  }

  handlesOnClusterIdChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ cluster_id: event.target.value.trim() });
    }
  };

  handlesOnLatitudeChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ latitude: event.target.value.trim() });
    }
  };

  handlesOnLongitudeChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ longitude: event.target.value.trim() });
    }
  };

  handlesOnNodeIdChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ node_id: event.target.value.trim() });
    }
  };

  handlesOnAddClick = (event: SyntheticEvent<>) => {
    const { cluster_id, latitude, longitude } = this.state;
    // Post request to backend
    fetch(
      process.env.REACT_APP_SERVER_URL + '/api/manageinfrastruture/node/add',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cluster_id: cluster_id,
          latitude: latitude,
          longitude: longitude,
        }),
      },
    )
      .then(res => res.json())
      .then(json => {
        console.log('json', json);
        console.log('json role: ' + json['role']);
        if (json.success) {
          this.setState({
            cluster_id: '',
            latitude: '',
            longitude: '',
          });
        }
      });
  };

  handlesOnUpdateClick = (event: SyntheticEvent<>) => {
    const { cluster_id, node_id, latitude, longitude } = this.state;
    // Post request to backend
    fetch(
      process.env.REACT_APP_SERVER_URL + '/api/manageinfrastruture/node/update',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cluster_id: cluster_id,
          node_id: node_id,
          latitude: latitude,
          longitude: longitude,
        }),
      },
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            cluster_id: '',
            node_id: '',
            latitude: '',
            longitude: '',
          });
        }
      });
  };

  handlesDeleteNode = (event: SyntheticEvent<>) => {
    const { cluster_id, node_id } = this.state;
    // Post request to backend
    fetch(
      process.env.REACT_APP_SERVER_URL + '/api/manageinfrastruture/node/delete',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cluster_id: cluster_id,
          node_id: node_id,
        }),
      },
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            cluster_id: '',
            node_id: '',
          });
        }
      });
  };
}

ManageNode.propTypes = {
  actions: PropTypes.shape({
    enterTabPanel: PropTypes.func.isRequired,
    leaveTabPanel: PropTypes.func.isRequired,
  }),
};

const RequestRow = props => {
  return (
    <tr>
      <td>{props.data.cluster_id}</td>
      <td>{props.data.node_id}</td>
      <td>{props.data.latitude}</td>
      <td>{props.data.longitude}</td>
      <td>{props.data.status ? 'Active' : 'Inactive'}</td>
    </tr>
  );
};

export default ManageNode;
