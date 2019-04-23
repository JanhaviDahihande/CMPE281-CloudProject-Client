// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import { AnimatedView, Panel } from '../../components';

class MyRequests extends PureComponent {

  constructor() {
    super();
    this.state = {
      data: [{
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }, {
        user_id: "123456",
        user_name: "A",
        zip_code: 1,
        number_of_nodes: 3,
        new_cluster: "yes",
        location: "lat lng",
        created_at: "1234",
      }]
    }
  }

  render() {
    let rows = this.state.data.map(request => {
      return <RequestRow key = {
        request.user_id
      }
      data = {
        request
      }
      />
    })

    return (
      <AnimatedView>
      <div className="row">
        <div className="col-xs-12">
          <div className="panel">
            <header className="panel-heading">My Requests</header>
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
                    <th>Zip Code</th>
                    <th>Number of nodes</th>
                    <th>New Cluster</th>
                    <th>Location</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                {
                  rows
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AnimatedView>
    );
  }
}

const RequestRow = (props) => {
  return (
    <tr>
      <td>
        { props.data.zip_code }
      </td>
      <td>
        { props.data.number_of_nodes }
      </td>
      <td>
        { props.data.new_cluster }
      </td>
      <td>
        { props.data.location }
      </td>
      <td>
        { props.data.created_at }
      </td>
    </tr>
  );
}

export default MyRequests;