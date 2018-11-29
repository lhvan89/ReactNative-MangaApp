import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default class MapScreen extends React.Component {

  static navigationOptions = {
    title: 'Map',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#33363B',
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      myLocation: {
        latitude: 10.8030533,
        longitude: 106.720833,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      origin: {
        latitude: 10.803914,
        longitude: 106.720381,
      },
      destination: {
        latitude: 10.810921,
        longitude: 106.708948,
      }
    };
    this.getDataMarkers();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView 
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          region={this.state.myLocation} >
          {this.state.markers.map((marker) => (
            <Marker
                key={marker.id}
                coordinate={marker.latlng}
                image={marker.image}
                onPress={() => {}}
                onCalloutPress={() => {
                    marker.hideCallout();
                }}>
                <Callout
                    tooltip={true}>
                    <View style={styles.callout}>
                        <Text style={{fontWeight: 'bold'}}>{marker.title}</Text>
                        <Text>{marker.description}</Text>
                    </View>
                </Callout>
            </Marker>
        ))}
        <MapViewDirections
          origin={this.state.origin}
          destination={this.state.destination}
          strokeWidth={3}
  				strokeColor="hotpink"
          apikey={'AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8'}
        />
        </MapView>
        <TouchableOpacity
          style={styles.myLocation}
          onPress={this.findMyLocation}>
          <Image source={require('../assets/images/my-location.png')}></Image>
        </TouchableOpacity>
          
      </View>
    );
  }

    getDataMarkers = async () => {
      let response = await fetch('https://api.myjson.com/bins/quk6a', {
          method: 'GET',
      });
      let responseJson = await response.json();
      if (response.status >= 400) {
          Alert.alert(
              'Error',
              responseJson.message,
              [
                  {text: 'OK'},
              ],
              { cancelable: false }
          )
      } else {
          responseJson.data.map((data) => {
              // data.image = require('./../assets/pin.png');

              this.setState((prevState) => ({
                  markers: [...prevState.markers, data]
              }));
          });

      }
  };

  findMyLocation = () => {
    this.setState(({
      location: {
          latitude: this.state.myLocation.latitude,
          longitude: this.state.myLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      },
    }));
  }
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  myLocation: {
    position: 'absolute',
    bottom: 30,
    right: 30
  },
  callout: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    width: 200,
    shadowOffset:{ width: 5,  height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  }
});
