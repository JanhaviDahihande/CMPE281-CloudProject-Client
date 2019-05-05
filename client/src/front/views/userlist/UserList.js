// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import { AnimatedView, Panel } from '../../components';

class UserList extends PureComponent {
  constructor() {
    super();
    this.state = {
      user_id: '',
      data: [],
    };
  }

  async componentDidMount() {
    // const response = await fetch(`process.env.REACT_APP_SERVER_URL + '/api/myrequests/5cbd62b6a090d8249f70a016`);
    // const json = await response.json();
    // this.setState({ data: json });
    try {
      var url = process.env.REACT_APP_SERVER_URL + '/api/users/';
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
    const { user_id } = this.state;
    let rows = this.state.data.map(user => {
      return <UserRow key={user.email} data={user} />;
    });

    return (
      <AnimatedView>
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <Panel
              title="Delete User"
              hasTitle={true}
              bodyBackGndColor={'#F4F5F6'}
            >
              <form className="form-horizontal tasi-form" method="get">
                <div className="form-group">
                  <label className="col-sm-3 control-label">User Id:</label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      value={user_id}
                      onChange={this.handlesOnUserIdChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-lg-offset-2 col-lg-10">
                    <button
                      type="submit"
                      onClick={this.handlesOnDeleteClick}
                      className="btn btn-success"
                    >
                      Delete
                    </button>
                    <button type="reset" className="btn btn-danger">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </Panel>
          </div>
        </div>
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
                      <th>User Id</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      {/* <th>Is Deleted</th> */}
                      <th>Sign up date</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </AnimatedView>
    );
  }

  handlesOnUserIdChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ user_id: event.target.value.trim() });
    }
  };

  handlesOnDeleteClick = (event: SyntheticEvent<>) => {
    const { user_id } = this.state;
    // Post request to backend
    fetch(process.env.REACT_APP_SERVER_URL + '/api/user/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            user_id: '',
          });
        }
      });
  };
}

const UserRow = props => {
  console.log(props.data.isDeleted);
  return (
    <tr>
      <td>{props.data.user_id}</td>
      <td>{props.data.name}</td>
      <td>{props.data.lname}</td>
      <td>{props.data.email}</td>
      <td>{props.data.role}</td>
      {/* <td>
        { props.data.isDeleted }
      </td> */}
      <td>{props.data.signUpDate}</td>
    </tr>
  );
};

export default UserList;
