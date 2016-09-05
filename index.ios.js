/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  MapView,
  Text,
  View
} from 'react-native';
var Api = require('./src/api.js')
class Weather extends Component {
    constructor(props) {
    super(props);
    this.state = {
      pin: {
          latitude: 0,
          longitude: 0,
      },
        city: '',
        temperature: '',
        description: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView annotations={[this.state.pin]} onRegionChangeComplete = {this.onRegionChangeComplete.bind(this)} style={styles.map}>

      </MapView>
      <View style={styles.textWrapper}>
        <Text style={styles.textSettings}>City: {this.state.city}</Text>
        <Text style={styles.textSettings}>Temperature: {this.state.temperature}</Text>
        <Text style={styles.textSettings}>{this.state.description}</Text>
      </View>
      </View>
);
  }
  onRegionChangeComplete(region) {
     this.setState({
         pin: {
             latitude: region.latitude,
             longitude: region.longitude
         }
     })
    Api(region.latitude, region.longitude) 
      .then((data) => {
          //console.log(data)
          this.setState(data)
      })
  }

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: 'lightblue'
  },
  map: {
    flex: 6,
  },
  textWrapper: {
      flex: 2,
  },
  textSettings: {
      textAlign: 'center',
      fontSize: 25,
      color: 'blue'
  }
});

AppRegistry.registerComponent('Weather', () => Weather);
