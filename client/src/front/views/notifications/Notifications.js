// @flow weak

import React, {
  PureComponent
}                         from 'react';
import GoogleMapReact from 'google-map-react';

import PropTypes          from 'prop-types';
import {
  AnimatedView,
  Panel,
  NotificationPanel,
  Notification
}                         from '../../components';
import Highlight          from 'react-highlight';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Notifications extends PureComponent {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: myLatLng,
      map,
      title: 'Hello World!'
    });
  }
 
  render() {
    return (
      // Important! Always set the container height explicitly
      
      <div style={{ height: '50vh', width: '50%' }}>
        <GoogleMapReact
        onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
          bootstrapURLKeys={{ key: "AIzaSyC7v62nZ5JExkxD3KOkJByZ9SZVjPb9YE8" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Notifications;
