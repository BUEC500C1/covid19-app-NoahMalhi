import React from 'react';
import { StyleSheet, Text, View , TextInput, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { SearchBar } from 'react-native-elements';
import Geocoder from "react-native-geocoding";

Geocoder.init('AIzaSyCAUoM4Hr9cKjrC4WasbnPbhL9uoZbiViE');

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    justifyContent: 'flex-end',
  },
  map: {
    flex: 1,
    top:0,
    left:0,
    right:0,
    bottom:0,
  },

  bar: {
    position: 'absolute',

  },
}); 


get_data = (country) => {
    country = country.replace(" ", "-")
    console.log("hi")
    console.log(country)
    const URL = `https://api.covid19api.com/total/country/${country}`;
      return fetch(URL)
              .then((final) => final.json());
  }


export default class App extends React.Component {
 
  onRegionChange(region) {
    this.setState({ region });
  }
  constructor(props) {
    super(props);
      this.state = {
        coordinate: {
          latitude: 31.669746,
          longitude: -7.973328,
          title: '',
        },
        country: '',
        total_cases: '',
        total_recovered: '',
        total_deaths: '',
        search: '',
      }
      this.on_enter = this.on_enter.bind(this);
 };
  
 
  on_enter() {
   
    get_data(this.state.country)
      .then((final) => {
        console.log(final)
        for(let i = 0; i < final.length; i++) {
          this.setState({
            total_cases: final[i]['Confirmed'],   
            total_recovered: final[i]['Recovered'],
            total_deaths: final[i]['Deaths'], 
                
          });
          console.log(final)
        }
      })
  
      Geocoder.from(this.state.country)
      .then(json => {
        var location = json.results[0].geometry.location
        console.log(location)
        this.setState({
          coordinate: {
            latitude: location.lat,
            longitude: location.lng
          }
        });
      });
      
  }
  

  update_search = search => {
    this.setState({ search });
    this.setState({
      country: search
    });

    console.log(this.state.country)
  };



  render() {

    const { search } = this.state;
    var mapStyle = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ]
  
    return (
      <View style={styles.container}>
      
        
        <SearchBar
          style={styles.bar}
          ref='searchBar'
          placeholder='Enter a Country'
          onChangeText = {this.update_search}
          value = {search}           
        /> 
        <Button style = {styles.button}
            title="Enter"
            onPress={this.on_enter}            
        />
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.coordinate.latitude,
            longitude: this.state.coordinate.longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
         
          customMapStyle={mapStyle}
        >
           <MapView.Marker
              coordinate={this.state.coordinate}
              title = {this.state.country}
            />
        </MapView>
        
        <Text>Total Cases: {this.state.total_cases}</Text> 
        <Text>Total Deaths: {this.state.total_deaths}</Text> 
        <Text> Total Recovered: {this.state.total_recovered} </Text>
        
       
      </View>
    );
  }
}