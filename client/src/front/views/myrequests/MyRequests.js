// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import { AnimatedView, Panel } from '../../components';

class MyRequests extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    //this.handleCLick = this.handleCLick.bind(this);
  }

  async componentDidMount() {
    // const response = await fetch(`process.env.REACT_APP_SERVER_URL + '/api/myrequests/5cbd62b6a090d8249f70a016`);
    // const json = await response.json();
    // this.setState({ data: json });
    // console.log('Heyy');
    let user_id = JSON.parse(localStorage.getItem('user_id'));
    console.log('User_id' + user_id);
    try {
      var url = process.env.REACT_APP_SERVER_URL + '/api/myrequests/' + user_id;
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
      console.log(error);
    }
  }

  // To get data on button click
  // async handleCLick ()  {
  //   console.log("Heyy");
  //   let user_id = JSON.parse(localStorage.getItem('user_id'));
  //   console.log("User_id" + user_id);
  //   try {
  //     var url = process.env.REACT_APP_SERVER_URL + '/api/myrequests/" + user_id;
  //     await fetch(url)
  //     .then(res => res.json())
  //     .then(json => {
  //       console.log(json.message);
  //       var data = json.message; //gets data in string
  //       // console.log(typeof data);
  //       data = JSON.parse(data);
  //       // console.log(typeof data);
  //       this.setState({ data:  data});
  //     })

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  render() {
    let rows = this.state.data.map(request => {
      return <RequestRow key={request.user_id} data={request} />;
    });

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
                {/* <button className="btn btn-sm btn-default" onClick={this.handleCLick} >
                      <i className="fa fa-search" />Get data
                    </button> */}
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Zip Code</th>
                      <th>Number of nodes</th>
                      <th>New Cluster</th>
                      <th>Location</th>
                      <th>Created At</th>
                      <th>Status</th>
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
}

const RequestRow = props => {
  // console.log('Here');
  // console.log(props);
  function status_format() {
    if (props.data.status == 'Approved') {
      return (
        <div>
          <label className="btn btn-xs btn-success">{props.data.status}</label>
        </div>
      );
    } else if (props.data.status == 'Declined') {
      return (
        <div>
          <label className="btn btn-xs btn-danger">{props.data.status}</label>
        </div>
      );
    } else if (props.data.status == 'Pending') {
      return (
        <div>
          <label className="btn btn-xs btn-warning">{props.data.status}</label>
        </div>
      );
    }
  }
  return (
    <tr>
      <td>{props.data.zip_code}</td>
      <td>{props.data.no_of_nodes}</td>
      <td>{props.data.new_cluster}</td>
      <td>{props.data.updatedAt}</td>
      <td>{props.data.updatedAt}</td>
      <td>{status_format()}</td>
    </tr>
  );
};

export default MyRequests;
