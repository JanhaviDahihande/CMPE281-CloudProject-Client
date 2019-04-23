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
    areaCode:'', 
    ipAddr:'', 
    cluster_name:'',
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
    const { mockHeader, areaCode, ipAddr,  cluster_name} = this.state;

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
                          <label className="col-sm-2 col-sm-2 control-label">
                            Area Code:
                          </label>
                          <div className="col-md-6">
                            <input type="text" className="form-control" 
                            id="area_code"
                            value={areaCode}
                            onChange={this.handlesOnCodeChange}/>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 col-sm-2 control-label">
                            IP Address:
                          </label>
                          <div className="col-md-6">
                            <input type="text" className="form-control" 
                            id="area_code"
                            value={ipAddr}
                            onChange={this.handlesOnIPChange}/>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 col-sm-2 control-label">
                            Name:
                          </label>
                          <div className="col-md-6">
                            <input type="text" className="form-control" 
                            id="name"
                            value={cluster_name}
                            onChange={this.handlesOnNameChange}/>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-offset-2 col-lg-10">
                            <button type="submit" className="btn btn-success"
                            onClick={this.handlesAddCluster}>
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
                  <TabPanelBodyContentComponent id="update">
                    <div>
                      <br />
                      <form className="form-horizontal tasi-form" method="get">
                        <div className="form-group">
                          <label className="col-sm-2 col-sm-2 control-label">
                            Cluster Id:
                          </label>
                          <div className="col-md-6">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 col-sm-2 control-label">
                            Name:
                          </label>
                          <div className="col-md-6">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-offset-2 col-lg-10">
                            <button type="submit" className="btn btn-success">
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
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-offset-2 col-lg-10">
                            <button type="submit" className="btn btn-success">
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

handlesAddCluster = (event: SyntheticEvent<>) => {
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
      cluster_name: cluster_name
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
}
ManageCluster.propTypes = {
  actions: PropTypes.shape({
    enterTabPanel: PropTypes.func.isRequired,
    leaveTabPanel: PropTypes.func.isRequired,
  }),
};

export default ManageCluster;
