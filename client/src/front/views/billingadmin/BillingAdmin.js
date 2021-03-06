// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import {
  AnimatedView,
  Panel,
  StatsCard as StatsCardComponent,
  EarningGraph as EarningGraphComponent,
  Label,
} from '../../components';

class BillingAdmin extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      enterEarningGraph: PropTypes.func.isRequired,
      leaveEarningGraph: PropTypes.func.isRequired,
    }),
  };

  state = {
    no_of_nodes: 0,
    no_of_clusters: 0,
    no_of_sensors: 0,
    no_of_farmers: 0,
    labels: [
      'Cluster 1',
      'Cluster 2',
      'Cluster 3',
      'Cluster 4',
      'Cluster 5',
      'Cluster 6',
    ],
    datasets: [
      {
        label: 'Nodes per cluster',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [4, 6, 3, 5, 2, 3],
      },
      {
        label: 'Sensors per Cluster',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [16, 12, 18, 22, 8, 12],
      },
    ],
  };

  componentWillMount() {
    const {
      actions: { enterEarningGraph },
    } = this.props;
    enterEarningGraph();
  }

  componentWillUnmount() {
    const {
      actions: { leaveEarningGraph },
    } = this.props;
    leaveEarningGraph();
  }

  async componentDidMount() {
    try {
      var url =
        process.env.REACT_APP_SERVER_URL +
        '/api/infrastructure/getdetails/registeredfarmers';
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log('Here');
          console.log(json.message);
          var data = json.message; //gets data in string
          data = JSON.parse(data);
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
  }

  render() {
    const { labels, datasets } = this.state;
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
                    statLabel={'Registered Farmers'}
                    icon={<i className="fa fa-users" />}
                    backColor={'green'}
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
          <Panel
            title="Earning Statistics"
            hasTitle={true}
            bodyBackGndColor={'#F4F5F6'}
          >
            <div className="col-xs-6">
              <EarningGraphComponent labels={labels} datasets={datasets} />
            </div>
            <div className="col-xs-6">
              <Panel
                title="Earning Summary"
                hasTitle={true}
                bodyBackGndColor={'#FFF'}
              >
                <table>
                  <tr>
                    <td>
                      <label htmlFor="billing">Total farmers registered:</label>
                    </td>
                    <td>
                      <label htmlFor="billing" id="billing_selected">
                        {this.state.no_of_farmers}
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="billing">Total earnings:</label>
                    </td>
                    <td>
                      <label htmlFor="billing" id="billing_cost">
                        $ 50,500
                      </label>
                    </td>
                  </tr>
                </table>
              </Panel>
            </div>
          </Panel>
        </div>
      </AnimatedView>
    );
  }
}

export default BillingAdmin;
