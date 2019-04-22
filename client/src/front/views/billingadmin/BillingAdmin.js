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
    labels: [
      'Cluster A',
      'Cluster B',
      'Cluster C',
      'Cluster D',
      'Cluster E',
      'Cluster F',
    ],
    datasets: [
      {
        label: 'Number of Nodes per Cluster',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [4, 7, 5, 10, 4, 2],
      },
      {
        label: 'Number of Sensors per Cluster',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [15, 25, 20, 23, 10, 5],
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
                      <label htmlFor="billing" id="billing_selected" />
                      13
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="billing">Total earnings:</label>
                    </td>
                    <td>
                      <label htmlFor="billing" id="billing_cost" />$ 1,500
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
