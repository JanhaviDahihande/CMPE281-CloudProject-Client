// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import {
  AnimatedView,
  Panel,
  Tweet,
  WriteNewTweet,
  ListTweetsContainer,
} from '../../components';
import JannieIMG from '../../img/Jannie.png';
import EmmetIMG from '../../img/Emmet.png';

function DemoTweetMessage() {
  return (
    <p>
      In hac
      <a href="#">habitasse</a>
      platea dictumst. Proin ac nibh rutrum lectus rhoncus eleifend.
      <a href="#" className="text-danger">
        <strong>#dev</strong>
      </a>
    </p>
  );
}

class TwitterFeed extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      enterTwitterFeed: PropTypes.func.isRequired,
      leaveTwitterFeed: PropTypes.func.isRequired,
    }),
  };

  componentWillMount() {
    const {
      actions: { enterTwitterFeed },
    } = this.props;
    enterTwitterFeed();
  }

  componentWillUnmount() {
    const {
      actions: { leaveTwitterFeed },
    } = this.props;
    leaveTwitterFeed();
  }

  render() {
    return (
      <div>
        <div className="col-xs-6 col-xs-offset-3">
          <Panel
            title="Billing Models"
            hasTitle={true}
            bodyBackGndColor={'#FFF'}
          >
            <label htmlFor="billing">Select BIlling Model</label>
            <br />
            <input id="billing_hourly" type="radio" name="billing" />
            Bill Hourly
            <br />
            <p>
              &emsp; Sensor nodes are charged $5 per hour, which will cost you
              $120 per day
            </p>
            <input id="billing_daily" type="radio" name="billing" />
            Bill Daily
            <br />
            <p>&emsp; Sensor nodes are charged $15 per day</p>
            <input id="billing_monthly" type="radio" name="billing" />
            Bill Monthly
            <br />
            <p>
              &emsp; Sensor nodes are charged $300 per month, which will cost
              you $10 per day
            </p>
            <input id="billing_yearly" type="radio" name="billing" />
            Bill Yearly
            <br />
            <p>
              &emsp; Sensor nodes are charged $1500 per year, which will cost
              you $4 per day
            </p>
            <input type="submit" value="Submit" />
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
                  <label htmlFor="billing">Your Selected biling model: </label>
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
    );
  }
}

export default TwitterFeed;
