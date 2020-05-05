import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { Block } from 'galio-framework';
import { Card, Button } from '../component';
import { argonTheme } from "../constants";

const { width } = Dimensions.get('screen');
const options = {
  title: 'Select a photo',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1,
};

class Cameras extends Component {
  constructor(props) {
    super(props)
    console.log('props')
    console.log(props.route)
    this.state = {
      info: this.props.route.params.data,
      id: this.props.route.params.data.id,
      imageSource: null,
      data: null,
      sName: null,
      menu: [],
      sId: null,
    }
    console.log(this.state)
  }

  selectPhoto() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = { uri: response.uri };
        this.setState({
          imageSource: source,
          data: response.data,
        });
      }
    });
  }

  uploadPhoto() {
    RNFetchBlob.fetch('POST', 'http://52.78.224.30/getMenu/' + this.state.id, {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
      // {uri:this.state.imageSource}
    ]).then((res) => {
      console.log('data')
      this.setState({
        menu: JSON.parse(res.data).menu,
        sName: JSON.parse(res.data).sName,
        sId: JSON.parse(res.data).sId,
        favorite: JSON.parse(res.data).favorite,
      })
      { this.state.sName == null && alert('No store') }
      { this.state.sName != null && this.props.navigation.navigate('Restaurant', { data: this.state }) }
      console.log(this.state.sName)
      this.setState({
        imageSource: null,
        data: null,
        sName: null,
        menu: [],
        sId: null,
      })
    }).catch((err) => {
      // ...
    })
  }

  render() {
    var imurl = this.state.imageSource != null ? this.state.imageSource : '../../image/android_img.png'
    return (
      <Block flex center style={styles.home}>
        <Block flex row>
          <Card item={
            {
              image: imurl,
              title: '',
              horizontal: true,
            }
          }
            full />
        </Block>
        <Block
          middle
          row
          space="evenly"
          style={{ marginTop: 20, paddingBottom: 24 }}
        >
          <Button
            small
            style={{ backgroundColor: argonTheme.COLORS.INFO, marginRight: 20 }}
            onPress={this.selectPhoto.bind(this)}
          >
            Select
      </Button>
          <Button
            small
            style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
            onPress={this.uploadPhoto.bind(this)}
          >
            Upload
      </Button>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A0A0A0',
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#330066',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 15

  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  image: {
    width: '80%',
    height: 200,
    marginTop: 30
  },
  home: {
    width: width,
  }
})

export default Cameras;