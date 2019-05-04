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
    };
  }

  async componentDidMount() {
    // const response = await fetch(`http://localhost:3002/api/myrequests/5cbd62b6a090d8249f70a016`);
    // const json = await response.json();
    // this.setState({ data: json });
    //console.log('Heyy');
    const { lat, lng } = await this.getcurrentLocation();
    let user_id = JSON.parse(localStorage.getItem('user_id'));
    // console.log('User_id' + user_id);
    try {
      var url = 'http://localhost:3002/api/farmerrequests/';
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          // console.log(json.message);
          var data = json.message; //gets data in string
          console.log("Here:::::");
          console.log(data);
          data = JSON.parse(data);
          console.log("Here2222:::::");
          console.log(data);
          // console.log(typeof data);
          this.setState({ data: data });
        });
    } catch (error) {
      // console.log(error);
    }

    this.setState(prev => ({
      fields: {
        ...prev.fields,
        location: {
          lat,
          lng,
        },
      },
      currentLocation: {
        lat,
        lng,
      },
    }));
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
    console.log("Inside map: " + map);
    var pos = [];
    for(var i=0; i<this.state.data.length;i++){
      for(var j=0;j<this.state.data[i].latlong.length;j++){
        pos.push({lat: this.state.data[i].latlong[j].lat, lng: this.state.data[i].latlong[j].long});
      }
    }
    console.log("Pos: " + pos);
    this.setState({
      markers: pos
    })
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
        <Row>

        <div id="google-map-holder">
              <Map
                google={this.props.google}
                id="map_holder"
                ref="map_holder"
                style={{
                  width: '50%',
                  height: '30%',
                  zIndex: 2,
                  left: 500,
                }}
                className={'map'}
                zoom={14}
                onClick={(t, map, c) => this.appendMarker(map)}
              >
               {this.state.markers.map((marker, index)=> {
                  return (
                    <Marker
                      position={marker}
                      title="Click to zoom"
                    />
                  )
                })}
              </Map>
            </div>
          <Panel
            title="Request Actions"
            hasTitle={true}
            bodyBackGndColor={'#FFF'}
          >
            <form className="form-horizontal tasi-form" method="get">
              <div className="form-group">
                <label className="col-sm-2 control-label">Request ID:</label>
                <div className="col-md-3">
                  <input type="text" id="reqid" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 col-sm-2 control-label">
                  Action:
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
        </Row>
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
      </AnimatedView>
    );
  }
}

const RequestRow = props => {
  console.log(props.data.latlong.length);
  function location_data(){
    var a ="";
    for (var i = 0; i < props.data.latlong.length; i++) {
      if(props.data.latlong[i]){
        var lat_data = props.data.latlong[i].lat;
        var long_data = props.data.latlong[i].long;
        a+=lat_data+','+long_data+"\n";
      }

        console.log(props.data.latlong[i].lat);
        
  
     // $(".panel-title").append('<h3>'+mysubject+'</h3>');
  } 
  return a;
  }
  return (
    <tr>
      <td>{props.data._id}</td>
      <td>{props.data.user_id}</td>
      <td>{props.data.user_name}</td>
      <td>{props.data.zip_code}</td>
      <td id="node_row">{props.data.no_of_nodes}</td>
      <td>{props.data.new_cluster}</td>
      {location_data()}
      {/* <td>{props.data.updatedAt}</td> */}
      <td>{props.data.status}</td>
    </tr>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC7v62nZ5JExkxD3KOkJByZ9SZVjPb9YE8',
})(FarmerRequests);

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
