// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import { AnimatedView, Panel } from '../../components';

class FarmerRequests extends PureComponent {
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
    console.log('Heyy');
    let user_id = JSON.parse(localStorage.getItem('user_id'));
    console.log('User_id' + user_id);
    try {
      var url = 'http://localhost:3002/api/farmerrequests/';
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

  render() {
    let rows = this.state.data.map(request => {
      return <RequestRow key={request.user_id} data={request} />;
    });

    return (
      <AnimatedView>
        <div className="row">
          <div className="col-xs-12">
            <div className="panel">
              <header className="panel-heading">Farmer Requests</header>
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
                      <th>Request ID</th>
                      <th>User ID</th>
                      <th>User Name</th>
                      <th>Zip Code</th>
                      <th>Number of nodes</th>
                      <th>New Cluster</th>
                      <th>Location</th>
                      {/* <th>Created At</th> */}
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Panel
            title="Request Actions"
            hasTitle={true}
            bodyBackGndColor={'#FFF'}
          >
            <form className="form-horizontal tasi-form" method="get">
              <div className="form-group">
                <label className="col-sm-2 control-label">Request ID:</label>
                <div className="col-md-3">
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 col-sm-2 control-label">
                  Action:
                </label>
                <div className="col-md-2">
                  <select className="form-control m-b-10">
                    <option>Approve</option>
                    <option>Decline</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="col-lg-offset-2 col-lg-10">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                  <button type="reset" className="btn btn-danger">
                    Cancel
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

export default FarmerRequests;

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
