// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import { AnimatedView, Panel } from '../../components';
import '../../style/map_view.css';

import {
  InfoWindow,
  Marker,
  Map,
  GoogleApiWrapper,
  Polygon,
} from 'google-maps-react';
import { Row } from 'react-bootstrap';
class FarmerRequests extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: [],
      markers: [],
      center:{
        lat: 37.78281527707425,
        lng: -122.42396502648927
      },
    };
  }

  async componentDidMount() {
    let user_id = JSON.parse(localStorage.getItem('user_id'));
    try {
      var url = process.env.REACT_APP_SERVER_URL + '/api/farmerrequests';
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          var data = json.message; //gets data in string
          data = JSON.parse(data);
          this.setState({ data: data });
        });
    } catch (error) {}
  }

  getcurrentLocation() {
    if (navigator && navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          resolve({
            lat: coords.latitude,
            lng: coords.longitude,
          });
        });
      });
    }
    return {
      lat: 0,
      lng: 0,
    };
  }

  appendMarker(map) {
    console.log('Inside map: ' + map);
    var pos = [];
    for (var i = 0; i < this.state.data.length; i++) {
      for (var j = 0; j < this.state.data[i].latlong.length; j++) {
        pos.push({
          lat: this.state.data[i].latlong[j].lat,
          lng: this.state.data[i].latlong[j].long,
        });
      }
    }
    console.log('Pos: ' + pos);
    this.setState({
      markers: pos,
    });
  }

  handleOnSubmit = (event: SyntheticEvent<>) => {
    console.log('in handleonsubmit');
    let reqid = document.getElementById('reqid').value;

    let status = document.getElementById('newstatus').value;

    fetch(process.env.REACT_APP_SERVER_URL + '/api/request/update', {
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
    // for(var i=0; i<this.state.data.length;i++){
    //   for(var j=0;j<this.state.data[i].latlong.length;j++){
    //     console.log(this.state.data[i].latlong[j].lat);
    //     // this.appendMarker(this.map, this.state.data[i].latlong[j].lat, this.state.data[i].latlong[j].long, "Marker");

    //   }

    // }
    let rows = this.state.data.map(request => {
      return <RequestRow key={request.user_id} data={request} />;
    });

    return (
      <AnimatedView>
        <div className="row">
          <div>
            <Map
              google={this.props.google}
              defaultCenter={this.state.center}
              id="map_holder"
              ref="map_holder"
              style={{
                width: '51%',
                height: '30%',
                zIndex: 2,
                left: 500,
                //center: { lat: -25.363882, lng: 131.044922 },
              }}
              className={'map'}
              zoom={14}
              onIdle={(t, map, c) => this.appendMarker(map)}
            >
              {this.state.markers.map((marker, index) => {
                return (
                  <Marker
                    position={marker}
                    title="Click to zoom"
                    center={marker}
                    // animation= {google.maps.Animation.DROP}
                  />
                );
              })}
            </Map>
          </div>
          <div className="col-xs-8">
            <Panel
              title="Request Actions"
              hasTitle={true}
              bodyBackGndColor={'#FFF'}
            >
              <form className="form-horizontal tasi-form" method="get">
                <div className="form-group">
                  <label className="col-sm-2 control-label">Request ID:</label>
                  <div className="col-md-4">
                    <input type="text" id="reqid" className="form-control" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 col-sm-2 control-label">
                    Action:
                  </label>
                  <div className="col-md-4">
                    <select id="newstatus" className="form-control m-b-10">
                      <option value="Approved">Approve</option>
                      <option value="Declined">Decline</option>
                      <option value="Pending">Pending</option>
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
              <header className="panel-heading">Farmer Requests</header>
              <div className="panel-body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>User ID</th>
                      <th>Zip Code</th>
                      <th>Nodes Requested</th>
                      <th>New Cluster</th>
                      <th>Location</th>
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
  // console.log(props.data.latlong.length);
  function location_data() {
    var a = '';
    for (var i = 0; i < props.data.latlong.length; i++) {
      if (props.data.latlong[i]) {
        var lat_data = props.data.latlong[i].lat;
        var long_data = props.data.latlong[i].long;
        a += lat_data + ',' + long_data + '\n';
      }

      // console.log(props.data.latlong[i].lat);

      // $(".panel-title").append('<h3>'+mysubject+'</h3>');
    }
    return <pre>{a}</pre>;
  }

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
      <td>{props.data._id}</td>
      <td>{props.data.user_id}</td>
      <td>{props.data.zip_code}</td>
      <td>{props.data.no_of_nodes}</td>
      <td>{props.data.new_cluster}</td>
      <td>{location_data()}</td>
      <td>{status_format()}</td>
    </tr>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC7v62nZ5JExkxD3KOkJByZ9SZVjPb9YE8',
})(FarmerRequests);
