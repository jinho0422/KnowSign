import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { Block, Button, Text, theme } from "galio-framework";
import { HeaderHeight } from '../constants/utils';
import bgImage from '../../image/background.png';


const { height, width } = Dimensions.get("screen");

class GoogleSignins extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: null,
      id: '',
      name: ' ',
      photo: '',
      email: '',
      loggedIn: false,
    }
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '91718920414-pb26gbo6pljr040prdhgv78br8gd254t.apps.googleusercontent.com',
      offlineAccess: true,
      forceConsentPrompt: true,
      //iosClicetId: '<FROM DEVELOPER CONSOLE>',
    });
  }
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);

      this.setState({
        userIN: userInfo.user,
        id: userInfo.user.id,
        name: userInfo.user.name,
        email: userInfo.user.email,
        photo: userInfo.user.photo,
        loggedIn: true,
      });

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('cancle');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('not available');
      } else {

      }
      console.log(error);
    }
  };

  render() {
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
          <ImageBackground
            source={bgImage}
            style={{ height, width, zIndex: 1 }} />
        </Block>

        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block style={styles.title}>
              <Block>
                <Text color="white" size={60}>
                  간판을
                </Text>
              </Block>
              <Block>
                <Text color="white" size={60}>
                  읽어라!
                </Text>
              </Block>
              <Block style={styles.subTitle}>
                <Text color="white" size={16}>
                  Get information from a single Photo.
                </Text>
              </Block>
            </Block>
            <Block center>
              {!this.state.loggedIn && <GoogleSigninButton
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this._signIn}
              />}
              {this.state.loggedIn && <Button
                style={styles.buttonStyle5} textStyle={styles.textStyle}
                onPress={() => this.props.navigation.navigate('My Information', { data: this.state })}
              ><Text>{this.state.name} 님 입장하시겠습니까?</Text></Button>}
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === "android" ? - HeaderHeight : 0,
    flex: 1,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%',
  },
  title: {
    marginTop: '-5%',
  },
  subTitle: {
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  buttonStyle5: {
    borderColor: '#8e44ad',
    backgroundColor: '#9b59b6',
  },
});

export default GoogleSignins;