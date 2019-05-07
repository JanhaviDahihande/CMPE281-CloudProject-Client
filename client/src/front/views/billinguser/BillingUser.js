// @flow weak

import React, { PureComponent } from 'react';
import { AnimatedView, Panel } from '../../components';

type state = {
  bill_type: String,
  no_of_nodes: number,
  price: number,
  new_bill_type: String,
};

class BillingUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bill_type: 'Bill Daily',
      no_of_nodes: 0,
      price: 0,
      new_bill_type: '',
    };
  }

  handleOptionChange = changeEvent => {
    // console.log('Radio : ' + changeEvent.target.value);
    this.setState({
      new_bill_type: changeEvent.target.value,
    });
  };

  handleOnSubmit = (event: SyntheticEvent<>) => {
    // console.log('In submit button');
    let nodes = this.state.no_of_nodes;
    let billing = this.state.new_bill_type;
    let pricing = 0;

    // console.log(nodes);
    if (billing === 'Bill Hourly') {
      pricing = nodes * 18;
    } else if (billing === 'Bill Daily') {
      pricing = nodes * 15;
    } else if (billing === 'Bill Monthly') {
      pricing = nodes * 10;
    } else if (billing === 'Bill Yearly') {
      pricing = nodes * 4;
    }

    this.setState({ price: pricing, bill_type: billing });
  };

  async componentDidMount() {
    let user_id = JSON.parse(localStorage.getItem('user_id'));
    // console.log('User_id' + user_id);
    try {
      var url =
        process.env.REACT_APP_SERVER_URL +
        '/api/infrastructure/getdetails/user/totalnodes/' +
        user_id;

      console.log(url);
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          var data = json.message;
          data = JSON.parse(data);
          var nodes = data;
          var cost = nodes * 15;
          console.log(nodes);
          this.setState({ no_of_nodes: nodes, price: cost });
        });
    } catch (error) {
      console.log(error);
    }
  }

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
              <input
                id="billing_hourly"
                type="radio"
                name="billing"
                value="Bill Hourly"
                onChange={this.handleOptionChange}
              />
              Bill Hourly
              <span className="help-block">
                &emsp;Sensor nodes are charged $0.75 per hour, which will cost
                you $18 per day
              </span>
              <br />
              <input
                id="billing_daily"
                type="radio"
                name="billing"
                value="Bill Daily"
                onChange={this.handleOptionChange}
              />
              Bill Daily
              <span className="help-block">
                &emsp;Sensor nodes are charged $15 per day
              </span>
              <br />
              <input
                id="billing_monthly"
                type="radio"
                name="billing"
                value="Bill Monthly"
                onChange={this.handleOptionChange}
              />
              Bill Monthly
              <span className="help-block">
                &emsp;Sensor nodes are charged $300 per month, which will cost
                you $10 per day
              </span>
              <br />
              <input
                id="billing_yearly"
                type="radio"
                name="billing"
                value="Bill Yearly"
                onChange={this.handleOptionChange}
              />
              Bill Yearly
              <span className="help-block">
                &emsp;Sensor nodes are charged $1500 per year, which will cost
                you $4 per day
              </span>
              <br />
              <input
                type="submit"
                className="btn btn-success"
                onClick={this.handleOnSubmit}
                value="Submit"
              />
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
                    <label htmlFor="billing">Your Selected biling model:</label>
                  </td>
                  <td>{this.state.bill_type}</td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="billing">Number of active nodes: </label>
                  </td>
                  <td>{this.state.no_of_nodes}</td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="billing">Effective daily charges:</label>
                  </td>
                  <td>{this.state.price}</td>
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
