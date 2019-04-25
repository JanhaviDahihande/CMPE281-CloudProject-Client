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

class ManageCluster extends PureComponent {
  state = {
    mockHeader: [
      { name: 'Add Cluster', tablink: 'add', isActive: true },
      { name: 'View Cluster', tablink: 'view', isActive: false },
      { name: 'Update Cluster', tablink: 'update', isActive: false },
      { name: 'Delete Cluster', tablink: 'delete', isActive: false },
    ],
    areaCode: '',
    ipAddr: '',
    cluster_name: '',
    cluster_id: '',
    current_cluster_id: '',
    user_id:'',
    data: [],
  };

  async componentWillMount() {
    const {
      actions: { enterTabPanel },
    } = this.props;
    enterTabPanel();
    console.log('Heyy');
    try {
      var url = 'http://localhost:3002/api/manageinfrastruture/cluster/view';
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

  async componentWillUnmount() {
    const {
      actions: { leaveTabPanel },
    } = this.props;
    leaveTabPanel();
  }

  render() {
    const {
      mockHeader,
      areaCode,
      ipAddr,
      cluster_name,
      cluster_id,
      current_cluster_id,
      user_id,
    } = this.state;
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
              title="Manage Clusters"
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
                            Area Code:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              id="area_code"
                              value={areaCode}
                              onChange={this.handlesOnCodeChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-3 control-label">
                            IP Address:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              id="area_code"
                              value={ipAddr}
                              onChange={this.handlesOnIPChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-3 control-label">
                            Name:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              value={cluster_name}
                              onChange={this.handlesOnNameChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-offset-2 col-lg-10">
                            <button
                              type="submit"
                              className="btn btn-success"
                              onClick={this.handlesAddCluster}
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
                    <AnimatedView>
                      <div className="row">
                        <div className="col-xs-12">
                          <div className="panel">
                            <header className="panel-heading">Clusters</header>
                            <div className="panel-body table-responsive">
                              <div className="box-tools m-b-15">
                                <div className="input-group">
                                  <input
                                    type="text"
                                    name="table_search"
                                    className="form-control input-sm pull-right"
                                    style={{ width: '150px' }}
                                    placeholder="Search"
                                  />
                                  <div className="input-group-btn">
                                    <button className="btn btn-sm btn-default">
                                      <i className="fa fa-search" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th>Cluster ID</th>
                                    <th>IP address</th>
                                    <th>Area Code</th>
                                    <th>Cluster Name</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>{rows}</tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AnimatedView>
                  </TabPanelBodyContentComponent>
                  <TabPanelBodyContentComponent id="update">
                    <div>
                      <br />
                      <form className="form-horizontal tasi-form" method="get">
                        <div className="form-group">
                          <label className="col-sm-4 control-label">
                            Current Cluster Id:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              value={current_cluster_id}
                              onChange={this.handlesOnUpdate_CurrentIDChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-4 control-label">
                            New Cluster Id:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              value={cluster_id}
                              onChange={this.handlesOnUpdate_IDChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-4 control-label">
                            New Cluster Name:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              value={cluster_name}
                              onChange={this.handlesOnUpdate_NameChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-offset-2 col-lg-10">
                            <button
                              type="submit"
                              className="btn btn-success"
                              onClick={this.handlesUpdateCluster}
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
                          <label className="col-sm-3 control-label">
                            Cluster Id:
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              value={cluster_id}
                              onChange={this.handlesOnDelete_ID}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-offset-2 col-lg-10">
                            <button
                              type="submit"
                              className="btn btn-success"
                              onClick={this.handlesDeleteCluster}
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

  // #region form inputs change callbacks
  handlesOnUserIDChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ user_id: event.target.value.trim() });
    }
  };
  
  handlesOnCodeChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ areaCode: event.target.value.trim() });
    }
  };

  handlesOnIPChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ ipAddr: event.target.value.trim() });
    }
  };

  handlesOnNameChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ cluster_name: event.target.value.trim() });
    }
  };

  handlesOnUpdate_CurrentIDChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ current_cluster_id: event.target.value.trim() });
    }
  };

  handlesOnUpdate_IDChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ cluster_id: event.target.value.trim() });
    }
  };

  handlesOnUpdate_NameChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ cluster_name: event.target.value.trim() });
    }
  };

  handlesOnDelete_ID = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ cluster_id: event.target.value.trim() });
    }
  };

  handlesAddCluster = (event: SyntheticEvent<>) => {
    console.log('Inside on code change');
    const { areaCode, ipAddr, cluster_name } = this.state;
    // Post request to backend
    fetch('http://localhost:3002/api/manageinfrastruture/cluster/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        areaCode: areaCode,
        ipAddr: ipAddr,
        cluster_name: cluster_name,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('json', json);
        console.log('json role: ' + json['role']);
        if (json.success) {
          this.setState({
            code: '',
            ipAddr: '',
            name: '',
          });
        }
      });
  };

  handlesUpdateCluster = (event: SyntheticEvent<>) => {
    const { current_cluster_id, cluster_id, cluster_name } = this.state;
    // Post request to backend
    fetch('http://localhost:3002/api/manageinfrastruture/cluster/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        current_cluster_id: current_cluster_id,
        cluster_id: cluster_id,
        cluster_name: cluster_name,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            current_cluster_id: '',
            cluster_id: '',
            cluster_name: '',
          });
        }
      });
  };

  handlesDeleteCluster = (event: SyntheticEvent<>) => {
    const { cluster_id } = this.state;
    // Post request to backend
    fetch('http://localhost:3002/api/manageinfrastruture/cluster/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cluster_id: cluster_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            cluster_id: '',
          });
        }
      });
  };
}
ManageCluster.propTypes = {
  actions: PropTypes.shape({
    enterTabPanel: PropTypes.func.isRequired,
    leaveTabPanel: PropTypes.func.isRequired,
  }),
};

const RequestRow = props => {
  return (
    <tr>
      <td>{props.data.cluster_id}</td>
      <td>{props.data.ipAddr}</td>
      <td>{props.data.areaCode}</td>
      <td>{props.data.cluster_name}</td>
      <td>{props.data.status ? 'Active' : 'Inactive'}</td>
    </tr>
  );
};

export default ManageCluster;
