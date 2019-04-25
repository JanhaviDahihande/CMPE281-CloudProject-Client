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

class ManageSensor extends PureComponent {
  state = {
    mockHeader: [
      { name: 'Add Sensor', tablink: 'add', isActive: true },
      { name: 'View Sensor', tablink: 'view', isActive: false },
      { name: 'Delete Sensor', tablink: 'delete', isActive: false },
    ],
    cluster_id: '',
    node_id: '',
    sensor_id: '',
    sensor_type: '',
    sensor_status: '',
    data: [],
  };

  componentWillMount() {
    const {
      actions: { enterTabPanel },
    } = this.props;
    enterTabPanel();
  }

  componentWillUnmount() {
    const {
      actions: { leaveTabPanel },
    } = this.props;
    leaveTabPanel();
  }

  render() {
    const {
      mockHeader,
      cluster_id,
      node_id,
      sensor_id,
      sensor_status,
      sensor_type,
    } = this.state;

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
                    statValue={'6'}
                    statLabel={'Total Clusters'}
                    icon={<i className="fa fa-check-square-o" />}
                    backColor={'red'}
                  />
                </div>
                <div className="col-md-3">
                  <StatsCardComponent
                    statValue={'32'}
                    statLabel={'Total Nodes'}
                    icon={<i className="fa fa-envelope-o" />}
                    backColor={'violet'}
                  />
                </div>
                <div className="col-md-3">
                  <StatsCardComponent
                    statValue={'98'}
                    statLabel={'Total Sensors'}
                    icon={<i className="fa fa-dollar" />}
                    backColor={'blue'}
                  />
                </div>
                {/* <div className="col-md-3">
                  <StatsCardComponent
                    statValue={'5'}
                    statLabel={'Total Farmers'}
                    icon={<i className="fa fa-paperclip" />}
                    backColor={'green'}
                  />
                </div> */}
              </div>
            </Panel>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">
            <Panel
              title="Manage Sensors"
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
                              onChange={this.handlesOnNodeIdChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-3 control-label">
                            Type:
                          </label>
                          <div className="col-md-6">
                            <select
                              onChange={this.handlesOnSensorTypeChange}
                              className="form-control m-b-10"
                            >
                              <option value="temperature">
                                Temperature Sensor
                              </option>
                              <option value="ph">pH Sensor</option>
                              <option value="airflow">Airflow Sensor</option>
                              <option value="humidity">Humidity Sensor</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-offset-2 col-lg-10">
                            <button
                              type="submit"
                              onChange={this.handlesOnAddClick}
                              className="btn btn-success"
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
                    <h3>View</h3>
                  </TabPanelBodyContentComponent>

                  <TabPanelBodyContentComponent id="delete">
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
                              onChange={this.handlesOnNodeIdChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-3 control-label">
                            Sensor Id:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              onChange={this.handlesOnSensorIdChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-offset-2 col-lg-10">
                            <button
                              type="submit"
                              onChange={this.handlesOnDeleteClick}
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

  handlesOnNodeIdChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ node_id: event.target.value.trim() });
    }
  };

  handlesOnSensorIdChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ sensor_id: event.target.value.trim() });
    }
  };

  handlesOnSensorTypeChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ sensor_type: event.target.value.trim() });
    }
  };

  handlesOnAddClick = (event: SyntheticEvent<>) => {
    console.log('Add sensor');
    const { cluster_id, node_id, sensor_type } = this.state;

    // Post request to backend
    fetch('http://localhost:3002/api/manageinfrastruture/sensor/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cluster_id: cluster_id,
        node_id: node_id,
        sensor_type: sensor_type,
        sensor_status: true,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('json', json);
        console.log('json role: ' + json['role']);
        if (json.success) {
          this.setState({
            cluster_id: '',
            node_id: '',
            sensor_type: '',
          });
        }
      });
  };

  handlesOnDeleteClick = (event: SyntheticEvent<>) => {
    const { cluster_id, node_id, sensor_id } = this.state;
    // Post request to backend
    fetch('http://localhost:3002/api/manageinfrastruture/sensor/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cluster_id: cluster_id,
        node_id: node_id,
        sensor_id: sensor_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            cluster_id: '',
            node_id: '',
            sensor_id: '',
          });
        }
      });
  };
}

ManageSensor.propTypes = {
  actions: PropTypes.shape({
    enterTabPanel: PropTypes.func.isRequired,
    leaveTabPanel: PropTypes.func.isRequired,
  }),
};

export default ManageSensor;
