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
let Realm = require('realm');
var Home = require('./ImageGallery');

var options = {
  title: null,
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

function storeImage(location) {

  console.log('this is the location:')
  console.log(location);

    // let realm = new Realm({
    //   schema: [{name: 'Photo', properties: {id: 'int', location: 'string'}}]
    // })
    //
    // let allPhotos = realm.objects('Photo');
    //
    // realm.write(() => {
    //   realm.delete(allPhotos);
    //   realm.create('Photo', {id: 1, location: location})
    // })
    //
    // for (var i = 0; i < allPhotos.length; i++){
    //   console.log(allPhotos[i].location);
    // }
  }

var AwesomeProject = React.createClass({
  // Set the initial state
  getInitialState: function() {
    return {
      source: null
    };
  },

  requestCamera: function() {
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
              // var source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

              // or a reference to the platform specific asset location
              if (Platform.OS === 'ios') {
                var source = {uri: response.uri.replace('file://', ''), isStatic: true};
              } else {
                var source = {uri: response.uri, isStatic: true};
              }
              this.setState({
                avatarSource: source
              });
              console.log(source.uri) // gives only the location

            }
        });
  },

  render: function() {

    return (
      <View style={styles.container}>

        {/* Upper view contains a TouchableHighlight to open the camera.  */}

        <View style={styles.cameraView}>
            <TouchableHighlight style={styles.openCamera} onPress={this.requestCamera}>
              <Text style={styles.cameraText}>Select an whut...</Text>
            </TouchableHighlight>
        </View>

        {/* Lower view contains a TouchableHighlight to show the results.  */}

        <View style={styles.photos}>
          <Image source={this.state.avatarSource} style={styles.image} />
        </View>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: { flexDirection: 'column', flex: 1, padding: 20},
  cameraView: {
    flex: .5,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  openCamera: {
    flex: 1
  },
  image: {
    height: 100,
    width: 100
  },
  photos: {
    backgroundColor: 'blue',
    flex: 0.5
  },
});

AppRegistry.registerComponent('CameraApp', () => AwesomeProject)
