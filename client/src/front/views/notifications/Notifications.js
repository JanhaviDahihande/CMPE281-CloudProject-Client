// @flow weak

import React, {
  PureComponent,
  Component
}                         from 'react';
// import GoogleMapReact from 'google-map-react';
import {InfoWindow, Marker, Map, GoogleApiWrapper} from 'google-maps-react'
import PropTypes          from 'prop-types';
import {
  AnimatedView,
  Panel,
  NotificationPanel,
  Notification
}                         from '../../components';
import Highlight          from 'react-highlight';
import '../../style/map_view.css';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Notifications extends React.Component {
  constructor(props){
		super(props);
		this.state = {
			showingInfoWindow: false,
			activeMarker: {},
      selectedPlace: {},
      fields: {}
    };
    this.addFields = this.addFields.bind(this);
	}

  async componentDidMount() {
    const { lat, lng } = await this.getcurrentLocation();
    this.setState(prev => ({
      fields: {
        ...prev.fields,
        location: {
          lat,
          lng
        }
      },
      currentLocation: {
        lat,
        lng
      }
    }));
  }

  getcurrentLocation() {
    if (navigator && navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          resolve({
            lat: coords.latitude,
            lng: coords.longitude
          });
        });
      });
    }
    return {
      lat: 0,
      lng: 0
    };
  }
  addMarker = (location, map) => {
    console.log("Latitude: " + location.lat());
    console.log("Longitude: " + location.lng());
    var node_selected = document.getElementsByName("node_radio");
    var selected_node_number;
    for (var i = 0, length = node_selected.length; i < length; i++)
    {
      if (node_selected[i].checked)
      {
        // do whatever you want with the checked radio
        var selected_node_id = node_selected[i].id;
        selected_node_number = selected_node_id.split('_')[2];

        // only one radio can be logically checked, don't check the rest
        break;
      }
    }
    console.log(node_selected);
    document.getElementById("node_lat_" + selected_node_number).value = location.lat();
    document.getElementById("node_lng_" + selected_node_number).value = location.lng();

    var number = document.getElementById("node_value").value;
    console.log(number);
    var container = document.getElementsByClassName("map");
    console.log(container);
    for (var i=0;i<number;i++){
      var mark = document.createElement("Marker");
      console.log(location.lat());
      mark.position="{{lat: " + location.lat() + ", lng:" + location.lng() + "}}";
      container[0].appendChild(mark);
      // Append a line break 
      container[0].appendChild(document.createElement("br"));
  }

    this.setState(prev => ({
      fields: {
        ...prev.fields,
        location
      }
    }));
    map.panTo(location);
  };

	onMarkerClick = (props, marker, e) => {
    console.log(props);
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
    });
    console.log(props);
	};

	onInfoWindowClose = () => {
		this.setState({
			showingInfoWindow: false,
			activeMarker: null
		});
  };
  

	onMapClicked = (props,e) => {
    console.log(props);
    let latitude = props.google.maps.LatLng.toString()
   let longtitude  = props.google.maps.LatLng.lng
   console.log(latitude);
   console.log(longtitude);
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
  };

  addFields = () => {
    // Number of inputs to create
    var number = document.getElementById("node_value").value;
    console.log(number);
    // Container <div> where dynamic content will be placed
    var container = document.getElementById("node_container");
    // Clear previous contents of the container

    if(container){
      while (container.hasChildNodes()) {
          container.removeChild(container.lastChild);
      }
      if(number!=0){
      for (var i=0;i<number;i++){
          
          var radio = document.createElement("input");
          radio.type="radio";
          radio.name="node_radio";
          radio.id="node_radio_" + i;
          container.appendChild(radio);

          // Append a node with a random text
          container.appendChild(document.createTextNode("Latitude " + (i+1)));
          // Create an <input> element, set its type and name attributes
          var input = document.createElement("input");
          input.type = "text";
          input.id = "node_lat_" + i;
          input.name = "lat" + i;
          container.appendChild(input);

          container.appendChild(document.createTextNode("Longitude " + (i+1)));
          // Create an <input> element, set its type and name attributes
          var input1 = document.createElement("input");
          input1.type = "text";
          input1.id = "node_lng_" + i;
          input1.name = "lng" + i;
          container.appendChild(input1);
          // Append a line break 
          container.appendChild(document.createElement("br"));
      }
    }
  }
}

  
  

	render() {
		return (
      <div>
        <h1>Farmer Request Page</h1>
        <form>
          <label for="zip_code">Zip Code</label>
          <input id="zip_code" type="text" /><br/>

          <label htmlFor="new_cluster">New Cluster?</label>
          <div>
            <input id="new_cluster_yes" type="radio" name="new_cluster" />Yes <br/>
            <input id="new_cluster_no" type="radio" name="new_cluster" />No
          </div>
          <div>
          <label>Number of nodes</label>
            <select id="node_value" onChange={this.addFields}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <div id="node_container"></div>
          </div>
          <div>
          <label>Zone</label>
            <select>
              <option value="zone_one">1</option>
              <option value="zone_two">2</option>
              <option value="zone_three">3</option>
              <option value="zone_four">4</option>
              <option value="zone_five">5</option>
            </select>
          </div>
          <input type="submit" value="Submit"></input>
        </form>
			<div id="google-map-holder" style={{float: 'left'}}>
        <Map google={this.props.google}
            id="map_holder"
						style={{width: '80%', height: '70%', position: 'inherit', marginLeft:'3%'}}
						className={'map'}
						zoom={14}
						onClick={(t, map, c) => this.addMarker(c.latLng, map)}>
					<Marker
						mapCenter="aarr"
						onClick={this.onMarkerClick}
            name={'SOMA'}
						position={{lat: 37.778519, lng: -122.405640}} />
					<Marker
						onClick={this.onMarkerClick}
						name={'Dolores park'}
						position={{lat: 37.759703, lng: -122.428093}} />
          <Marker className="newMarker" position={this.state.fields.location} />
					<InfoWindow
						marker={this.state.activeMarker}
						visible={this.state.showingInfoWindow}
						onClose={this.onInfoWindowClose}>
							<div>
								<h1>{this.state.selectedPlace.name}</h1>
							</div>
					</InfoWindow>
				</Map>
		</div>
    
    </div>
		)
	}
}

//export default Notifications;
export default GoogleApiWrapper({
  apiKey: ("AIzaSyC7v62nZ5JExkxD3KOkJByZ9SZVjPb9YE8")
})(Notifications)
