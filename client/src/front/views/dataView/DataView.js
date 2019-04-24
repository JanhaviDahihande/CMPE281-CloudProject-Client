// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import { AnimatedView, Panel } from '../../components';

class DataView extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    // const response = await fetch(`http://localhost:3002/api/myrequests/5cbd62b6a090d8249f70a016`);
    // const json = await response.json();
    // this.setState({ data: json });
    //console.log('Heyy');
    let user_id = JSON.parse(localStorage.getItem('user_id'));
    // console.log('User_id' + user_id);
    try {
      var url = 'http://localhost:3002/api/farmerrequests/';
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          // console.log(json.message);
          var data = json.message; //gets data in string
          // console.log(typeof data);
          data = JSON.parse(data);
          // console.log(typeof data);
          this.setState({ data: data });
        });
    } catch (error) {
      // console.log(error);
    }
  }

  handleOnSubmit = (event: SyntheticEvent<>) => {
    console.log('in handleonsubmit');
    let reqid = document.getElementById('reqid').value;

    let status = document.getElementById('newstatus').value;

    fetch('http://localhost:3002/api/request/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        req_id: reqid,
        status: status,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          // console.log('update successfull');
        }
      });
  };

  render() {
    let rows = this.state.data.map(request => {
      return <RequestRow key={request.user_id} data={request} />;
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
                  <select id="newstatus" className="form-control m-b-10">
                    <option value="Approved">Approve</option>
                    <option value="Declined">Decline</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 col-sm-2 control-label">
                  Node:
                </label>
                <div className="col-md-2">
                  <select id="newstatus" className="form-control m-b-10">
                    <option value="Approved">Approve</option>
                    <option value="Declined">Decline</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 col-sm-2 control-label">
                  Sensor Type:
                </label>
                <div className="col-md-2">
                  <select id="newstatus" className="form-control m-b-10">
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
                    type="submit"
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
      </AnimatedView>
    );
  }
}

const RequestRow = props => {
  return (
    <tr>
      <td>{props.data._id}</td>
      <td>{props.data.user_id}</td>
      <td>{props.data.user_name}</td>
      <td>{props.data.zip_code}</td>
      <td id="node_row">{props.data.no_of_nodes}</td>
      <td>{props.data.new_cluster}</td>
      <td>
        <pre>
          {props.data.latlong[0].lat},{props.data.latlong[0].long}
        </pre>
      </td>
      {/* <td>{props.data.updatedAt}</td> */}
      <td>{props.data.status}</td>
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
