import React from 'react';
import { Modal, StyleSheet, Text, View, Image, Platform, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Constants, Location, Permissions } from 'expo';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
                latitude: 10.8030533,
                longitude: 106.720833,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            destination: {
                latitude: 10.8030533,
                longitude: 106.720833,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            modalAutocompleteVisible: false,
            isShowSearchButton: true
        };
        this.getDataMarkers();
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this.getLocationAsync();
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalAutocompleteVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    {/* <View style={{height:22}}></View> */}
                    <View style={{ height: 50 }}>
                        <TouchableOpacity
                            style={{position: 'absolute', right: 10, bottom: 10}}
                            onPress={() => {
                                this.setModalAutocompleteVisible(!this.state.modalAutocompleteVisible)
                            }}>
                            <Text>Hide Search</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        fetchDetails={true}
                        returnKeyType={'search'} // Can be left out for default return key 
                        listViewDisplayed="auto" // true/false/undefined
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            // console.log(data)
                            // console.log(details)
                            global.maker = {
                                id: data.id,
                                latlng:{
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng
                                },
                                title: data.structured_formatting.main_text,
                                description: data.structured_formatting.secondary_text,
                                image: require('../assets/images/marker.png')
                            }
                            global.location = {
                                latitude: global.maker.latlng.latitude,
                                longitude: global.maker.latlng.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }

                            this.setState((prevState) => ({
                                markers: [...prevState.markers, global.maker],
                                location: global.location
                            }));
                            this.setModalAutocompleteVisible(!this.state.modalAutocompleteVisible);
                        }}
                        getDefaultValue={() => {
                        return ''; // text input default value
                        }}
                        query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyCV_USBqXyJegasxHc7HyP83rk6k3rdawY',
                        language: 'vi', // language of the results
                        //types: '(cities)', // default: 'geocode'
                        }}
                        styles={{
                        description: {
                            fontWeight: 'bold',
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb',
                        },
                        }}
                        
                        // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        // currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        types: 'food',
                        }}
                        
                        
                        filterReverseGeocodingByTypes={["administrative_area_level_1", "administrative_area_level_2", "administrative_area_level_3", "administrative_area_level_4", "administrative_area_level_5", "colloquial_area", "country", "establishment", "finance", "floor", "food", "general_contractor", "geocode", "health", "intersection", "locality", "natural_feature", "neighborhood", "place_of_worship", "political", "point_of_interest", "post_box", "postal_code", "postal_code_prefix", "postal_code_suffix", "postal_town", "premise", "room", "route", "street_address", "street_number", "sublocality", "sublocality_level_4", "sublocality_level_5", "sublocality_level_3", "sublocality_level_2", "sublocality_level_1", "subpremise"]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        
                        // predefinedPlaces={[homePlace, workPlace]}
                        
                        predefinedPlacesAlwaysVisible={true}
                    />
                </Modal>
                
                <MapView 
                    style={styles.mapView}
                    provider={PROVIDER_GOOGLE}
                    region={this.state.location}
                    initialRegion={this.state.region} >
                    
                    {this.state.markers.map((marker) => (
                        <Marker draggable
                            key={marker.id}
                            coordinate={marker.latlng}
                            image={marker.image}
                            onPress={() => {
                                global.maker = marker
                                global.location = {
                                    latitude: marker.latlng.latitude,
                                    longitude: marker.latlng.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }
                            }}
                            onCalloutPress={() => {
                                this.marker.hideCallout();
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
                        origin={this.state.myLocation}
                        destination={this.state.destination}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        apikey={'AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8'}
                    />
                </MapView>

                <TouchableOpacity
                    style={styles.myLocation}
                    onPress={this.findMyLocation}>
                    <Image source={require('../assets/images/my-location.png')} />
                </TouchableOpacity>
                { this.state.isShowSearchButton && 
                    <TouchableOpacity
                        style={styles.directionButton}
                        onPress={this.getDirection}>
                        <Image source={require('../assets/images/direction.png')} />
                    </TouchableOpacity>
                }

                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => {
                        this.setModalAutocompleteVisible(true);
                    }} >
                    <Image source={require('../assets/images/search.png')} />
                </TouchableOpacity>
                
            </View>
        );
    }

    setModalAutocompleteVisible(visible) {
        this.setState({modalAutocompleteVisible: visible});
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
                data.image = require('../assets/images/marker.png');
                this.setState((prevState) => ({
                    markers: [...prevState.markers, data]
                }));
            });
        }
    };

    getDirection = async () => {
        this.setState({
            destination: {
                latitude: global.maker.latlng.latitude,
                longitude: global.maker.latlng.longitude
            }, 
            location: global.location
        })
    }

    getLocationAsync = async () => {
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
            image: require('../assets/images/current-location.png'),
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
            markers: [...prevState.markers, myMarker],
            destination: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
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
    directionButton: {
        position: 'absolute',
        bottom: 90,
        right: 30
    },
    searchButton: {
        position: 'absolute',
        bottom: 30,
        left: 30
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
