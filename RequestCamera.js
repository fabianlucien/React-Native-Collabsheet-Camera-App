'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View
} from 'react-native';

import Camera from 'react-native-camera';
var UIImagePickerManager = require('react-native-image-picker');
var Platform = require('react-native').Platform;

var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

var AwesomeProject = React.createClass({
  // Set the initial state
  getInitialState: function() {
    return {
      source: null
    };
  },

  test: function() {
          UIImagePickerManager.launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              // You can display the image using either data...
              const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

              // or a reference to the platform specific asset location
              if (Platform.OS === 'ios') {
                const source = {uri: response.uri.replace('file://', ''), isStatic: true};
              } else {
                const source = {uri: response.uri, isStatic: true};
              }
              this.setState({
                avatarSource: source
              });
            }
        });
  },

  render: function() {
    return (
      <View style={styles.container}>
      <Image source={this.state.avatarSource} style={styles.image} />
        <TouchableHighlight onPress={this.test}>
          <Text>Select an whut...</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  image: {
    height: 100,
    width: 100
  }
});

AppRegistry.registerComponent('CameraApp', () => AwesomeProject)
