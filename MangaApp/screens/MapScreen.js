import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Location, Permissions } from 'expo';

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
      location: {
        latitude: 10.803057684484573,
        longitude: 106.72133010970612,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      origin: {
        latitude: 10.803914,
        longitude: 106.720381,
      },
      destination: {
        latitude: 10.773734,
				longitude: 106.698066
      }
    };
    this.getDataMarkers();
  }

  componentWillMount() {
    this._getLocationAsync();
    // if (Platform.OS === 'android' && !Constants.isDevice) {
    //     this.setState({
    //         errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    //     });
    // } else {
    //     this._getLocationAsync();
    // }
}

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView 
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          region={this.state.location}
          initialRegion={this.state.region} >
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
      let response = await fetch('https://api.myjson.com/bins/i3hky', {
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
              data.image = require('./../assets/images/marker.png');

              this.setState((prevState) => ({
                  markers: [...prevState.markers, data]
              }));
          });

      }
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        this.setState({
            errorMessage: 'Permission to access location was denied',
        });
    }
    let location = await Location.getCurrentPositionAsync({});
    let myMarker = {
        id: 0,
        latlng: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        },
        image: require('./../assets/images/current-location.png'),
        title: "My location",
        description: "My location address"
    }
    this.setState(prevState => ({
        location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        myLocation: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        markers: [...prevState.markers, myMarker]
    }));
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
