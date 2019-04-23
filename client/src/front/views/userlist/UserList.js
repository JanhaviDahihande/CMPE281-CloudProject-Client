// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import { AnimatedView, Panel } from '../../components';

class UserList extends PureComponent {

  constructor() {
    super();
    this.state = {
      data:[]
    };
  }

  async componentDidMount() {
    // const response = await fetch(`http://localhost:3002/api/myrequests/5cbd62b6a090d8249f70a016`);
    // const json = await response.json();
    // this.setState({ data: json });
    console.log("Heyy");
    let user_id = JSON.parse(localStorage.getItem('user_id'));
    console.log("User_id" + user_id);
    try {
      var url = "http://localhost:3002/api/myrequests/" + user_id;
      await fetch(url)
      .then(res => res.json())
      .then(json => { 
        console.log(json.message);
        var data = json.message; //gets data in string
        // console.log(typeof data); 
        data = JSON.parse(data);
        // console.log(typeof data);
        this.setState({ data:  data});
      })
      
    } catch (error) {
      console.log(error);
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
