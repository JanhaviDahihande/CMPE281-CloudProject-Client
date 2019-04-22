// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import { AnimatedView, Panel } from '../../components';

class BillingUser extends PureComponent {
  render() {
    return (
      <AnimatedView>
        <div>
          <div className="col-xs-6 col-xs-offset-3">
            <Panel
              title="Billing Models"
              hasTitle={true}
              bodyBackGndColor={'#FFF'}
            >
              <label htmlFor="billing">Select Billing Model</label>
              <br />
              <input id="billing_hourly" type="radio" name="billing" />
              Bill Hourly
              <span className="help-block">
                &emsp;Sensor nodes are charged $5 per hour, which will cost you
                $120 per day
              </span>
              <br />
              <input id="billing_daily" type="radio" name="billing" />
              Bill Daily
              <span className="help-block">
                &emsp;Sensor nodes are charged $15 per day
              </span>
              <br />
              <input id="billing_monthly" type="radio" name="billing" />
              Bill Monthly
              <span className="help-block">
                &emsp;Sensor nodes are charged $300 per month, which will cost
                you $10 per day
              </span>
              <br />
              <input id="billing_yearly" type="radio" name="billing" />
              Bill Yearly
              <span className="help-block">
                &emsp;Sensor nodes are charged $1500 per year, which will cost
                you $4 per day
              </span>
              <br />
              <input type="submit" className="btn btn-success" value="Submit" />
            </Panel>
          </div>
          <div className="col-xs-6 col-xs-offset-3">
            <Panel
              title="Billing Summary"
              hasTitle={true}
              bodyBackGndColor={'#FFF'}
            >
              <table>
                <tr>
                  <td>
                    <label htmlFor="billing">
                      Your Selected biling model:{' '}
                    </label>
                  </td>
                  <td>
                    <label htmlFor="billing" id="billing_selected" />
                    Billing model here
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="billing">Number of active nodes: </label>
                  </td>
                  <td>
                    <label htmlFor="billing" id="billing_nodes" />
                    Active nodes here
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="billing">Total charges:</label>
                  </td>
                  <td>
                    <label htmlFor="billing" id="billing_cost" />
                    Final cost here
                  </td>
                </tr>
              </table>
            </Panel>
          </div>
        </div>
      </AnimatedView>
    );
  }
}

export default BillingUser;
