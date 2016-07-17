/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//https://www.raywenderlich.com/126063/react-native-tutorial
'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
import SearchPage from './ioscomps/SearchPage';

class HelloWorld extends Component {
  render() {
    return (
        <Text style={styles.text}>
         Hello World !
        </Text>
    );
  }
}

class PropertyFinder extends Component{
  render(){
    return (
      <NavigatorIOS
        style={styles.navbar}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage
        }}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  navbar:{
    flex: 1,
    backgroundColor:'white'
  }
});

//defines entry point to the application and provide root component.
AppRegistry.registerComponent('Project', () => PropertyFinder);
