// @flow weak

import React, {
  PureComponent,
  Component, ReactDOM
}                         from 'react';
// import GoogleMapReact from 'google-map-react';
import {InfoWindow, Marker, Map, GoogleApiWrapper, Polygon} from 'google-maps-react'
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
type State = {
  zip_code: string,
  new_cluster: boolean,
  no_of_nodes: number,
  latlong: Array
};
class Notifications extends React.Component {
  constructor(props){
		super(props);
		this.state = {
			showingInfoWindow: false,
			activeMarker: {},
      selectedPlace: {},
      fields: {},
      visi_0:false,
      visi_1:false,
      visi_2:false,
      visi_3:false,
      position_1: {},
      position_2: {},
      position_3: {},
      position_4: {},

      zip_code: '',
      new_cluster: false,
      no_of_nodes: 0,
      latlong: []
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
    console.log("here: " + selected_node_number);
    document.getElementById("node_lat_" + selected_node_number).value = location.lat();
    document.getElementById("node_lng_" + selected_node_number).value = location.lng();
    
    var elem = this.refs.map_holder.props.children;
    for(var i=0; i< elem.length;i++){
      if(elem[i].ref == "marker_" + selected_node_number){
        console.log(elem[i]);
        if(selected_node_number==0){
          console.log("0000000");
          var lat = location.lat();
          var long = location.lng();
          this.setState(
            { visi_0: true, 
              position_1:{lat:location.lat(), lng: location.lng()}, 
              latlong:[...this.state.latlong, {lat, long}]
            }
          );
        }
        else if(selected_node_number==1){
          console.log("1111111");
          var lat = location.lat();
          var long = location.lng();
          this.setState(
            { visi_1: true,  
              position_2:{lat:location.lat(), lng: location.lng()}, 
              latlong:[...this.state.latlong, {lat, long}]}
            );
        }
        else if(selected_node_number==2){
          console.log("2222222");
          var lat = location.lat();
          var long = location.lng();
          this.setState(
            { visi_2: true,  
              position_3:{lat:location.lat(), lng: location.lng()},
              latlong:[...this.state.latlong, {lat, long}]
            });
        }
        else if(selected_node_number==3){
          console.log("3333333");
          var lat = location.lat();
          var long = location.lng();
          this.setState(
            { visi_3: true,  
              position_4:{lat:location.lat(), lng: location.lng()},
              latlong:[...this.state.latlong,{lat, long}]
            });
        }
        
      }
    }
   
    //console.log( this.refs..marker.visible);
    var container = document.getElementsByClassName("map");
    console.log(container);
   
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

  addFields = (changeEvent) => {
    this.setState({
      no_of_nodes: changeEvent.target.value
    });
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

handlesOnZipCodeChange = (event: SyntheticEvent<>) => {
  if (event) {
    event.preventDefault();
    // should add some validator before setState in real use cases
    this.setState({ zip_code: event.target.value.trim() });
  }
};

handleOptionChange = (changeEvent) => {
  this.setState({
    new_cluster: changeEvent.target.value
  });
};

handleOnSubmit = (event: SyntheticEvent<>) => {
  const {
    zip_code,
    no_of_nodes,
    latlong,
  } = this.state;

  fetch('http://localhost:3002/api/request/newRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        zip_code: zip_code,
        no_of_nodes: no_of_nodes,
        latlong: latlong,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          // setInStorage('my_key', { token: json.token });
         
          this.setState({
            zip_code: '',
            no_of_nodes: '',
            latlong: '',
          });
          
            
        } 
        
      });

};

	render() {
    const triangleCoords = [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757},
      {lat: 25.774, lng: -80.190}
    ];

    const {zip_code, new_cluster, no_of_nodes, latLng} = this.state
		return (
      
      <div>
        <h1>Farmer Request Page</h1>
        <form>
          <label for="zip_code">Zip Code</label>
          <input id="zip_code" type="text" onChange={this.handlesOnZipCodeChange}/><br/>

          <label htmlFor="new_cluster">New Cluster?</label>
          <div>
            <input id="new_cluster_yes" type="radio" name="new_cluster" onChange={this.handleOptionChange} />Yes <br/>
            <input id="new_cluster_no" type="radio" name="new_cluster" onChange={this.handleOptionChange} />No
          </div>
          <div>
          <label>Number of nodes</label>
            <select id="node_value" onChange={this.addFields} >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <div id="node_container"></div>
          </div>
          <div>
          </div>
          <input type="submit" value="Submit" onClick={this.handleOnSubmit}></input>
        </form>
			<div id="google-map-holder" style={{float: 'left'}}>
        <Map google={this.props.google}
            id="map_holder"
            ref="map_holder"
						style={{width: '80%', height: '70%', position: 'inherit', marginLeft:'3%'}}
						className={'map'}
						zoom={14}
						onClick={(t, map, c) => this.addMarker(c.latLng, map)}>
             <Polygon
          paths={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35} />
					<Marker
            id="marker_0"
            className={'markers'}
            mapCenter="aarr"
            visible={this.state.visi_0}
            ref="marker_0"
						onClick={this.onMarkerClick}
						position={this.state.position_1}/>
					<Marker
            id="marker_1"
						onClick={this.onMarkerClick}
            name={'Dolores park'}
            ref="marker_1"
            visible={this.state.visi_1}
						position={this.state.position_2} />
            <Marker
            id="marker_2"
            mapCenter="aarr"
            ref="marker_2"
						onClick={this.onMarkerClick}
            name={'SOMA'}
            visible={this.state.visi_2}
						position={this.state.position_3} />
					<Marker
            id="marker_3"
            onClick={this.onMarkerClick}
            ref="marker_3"
            name={'Dolores park'}
            visible={this.state.visi_3}
					  position={this.state.position_4}	 />
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
