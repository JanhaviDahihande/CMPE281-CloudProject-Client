// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import { AnimatedView, Panel } from '../../components';

class UserList extends PureComponent {

  constructor() {
    super();
    this.state = {
      data: [{
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }, {
        first_name: "A",
        last_name: "Q",
        email: "a@a.com",
        role: "admin",
        isDeleted: "yes",
        sign_up_date: "12345"
      }]
    }
  }

  render() {
    let rows = this.state.data.map(user => {
      return <UserRow key = {
        user.email
      }
      data = {
        user
      }
      />
    })

    return (
      <AnimatedView>
      <div className="row">
        <div className="col-xs-12">
          <div className="panel">
            <header className="panel-heading">Users</header>
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
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Is Deleted</th>
                      <th>Sign up date</th>
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

const UserRow = (props) => {
  return (
    <tr>
      <td>
        { props.data.first_name }
      </td>
      <td>
        { props.data.last_name }
      </td>
      <td>
        { props.data.email }
      </td>
      <td>
        { props.data.role }
      </td>
      <td>
        { props.data.isDeleted }
      </td>
      <td>
        { props.data.sign_up_date }
      </td>
    </tr>
  );
}

export default UserList;
