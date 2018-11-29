import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

export default class MapScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#33363B',
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          id: 1,
          latlng: {
            latitude: 10.800194,
            longitude: 106.718579,
          },
          title: 'CGV Pearl Plaza',
          description: "Toà nhà Pearl Plaza, 561 Điện Biên Phủ, Phường 25, Bình Thạnh, Hồ Chí Minh, Việt Nam"
        },
        {
          id: 2,
          latlng: {
            latitude: 10.803914,
            longitude: 106.720381,
          },
          title: 'The Vintage Coffee House',
          description: "167 Nguyen Van Thuong Street - Ward 25 - Binh Thanh District, 167 Đường Đường Nguyễn Văn Thương, Phường 25, Bình Thạnh, Hồ Chí Minh, Việt Nam"
        },
        {
          id: 3,
          latlng: {
            latitude: 10.803324,
            longitude: 106.719802,
          },
          title: 'Phòng Khám Da Liễu O2 SKIN Bình Thạnh',
          description: "Số 2 Đường Võ Oanh, Phường 25, Bình Thạnh, Hồ Chí Minh 700000, Việt Nam"
        },
        {
          id: 4,
          latlng: {
            latitude: 10.810921,
            longitude: 106.708948,
          },
          title: 'Cafe Thủy Trúc',
          description: "197 Đinh Bộ Lĩnh, Phường 26, Bình Thạnh, Hồ Chí Minh, Việt Nam"
        },
        {
          id: 5,
          latlng: {
            latitude: 10.802658,
            longitude: 106.714613,
          },
          title: 'Đại học Hutech',
          description: "475 A Điện Biên Phủ, Phường 25, Bình Thạnh, Hồ Chí Minh, Việt Nam"
        },
      ],
      myLocation: {
        latitude: 10.8030533,
        longitude: 106.720833,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
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
        </MapView>
        <TouchableOpacity
          style={styles.myLocation}
          onPress={this.findMyLocation}>
          <Image source={require('../assets/images/my-location.png')}></Image>
        </TouchableOpacity>
          
      </View>
    );
  }

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
