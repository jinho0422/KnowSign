import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, Alert } from "react-native";
import { Block, Text, theme } from "galio-framework";
import bgImage from '../../image/background.png';
import { HeaderHeight } from '../constants/utils';
import { argonTheme } from "../constants";
import { Button } from "../component";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import {GoogleSignins} from '../component/GoolgleSignin';
import {NavigationEvents} from 'react-navigation';
import { StackActions,CommonActions  } from '@react-navigation/native';

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;


class Screen1 extends Component {
    constructor(props) {
        super(props);
        console.log("info")
        console.log(this.props.route.params.data)
        this.state={
            like: 0,
            info:this.props.route.params.data,
            id:this.props.route.params.data.id,
            kor:true
        }
        this.getLike()
    }


    getLike(){
        console.log(this.state)
        return fetch('http://52.78.224.30/getMenu/wishlist/num/'+this.state.id,{
            method: 'POST',
            body : JSON.stringify({'sId':this.state.sId}),
            headers:{
              Accept:"application/json",
            }
          }).then((res)=>res.json())
          .then((resJson)=>{
            console.log('num')
            console.log(resJson);
            this.setState({
                like:resJson.like,
            })
          }).catch((err)=>{
            console.log(err);
          })
    }
    
    signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
      };   
    render(){
        console.log('profile')
        const info = this.state.info
        console.log(info)
 
        const { data } = this.props.route.params
        return (

            <Block flex style={styles.profile}>

           
                <Block flex>
                
                    <ImageBackground
                        source={bgImage}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ width, marginTop: '25%'}}>
                            <Block flex style={styles.profileCard}>
                                <Block middle style={styles.avatarContainer}>
                                    <Image
                                        source={{ uri: info.photo }}
                                        style={styles.avatar} />
                                </Block>
                                <Block style={styles.info}>
 
                                    <Block
                                        middle
                                        row
                                        space="evenly"
                                        style={{ marginTop: 20, paddingBottom: 24 }}>
                                        <Button
                                            small
                                            style={{ backgroundColor: argonTheme.COLORS.INFO }}
                                            onPress={() => {this.props.navigation.navigate('Camera',{data:this.state})}}
                                        >
                                            Picture
                                         </Button>
                                        <Button
                                            small
                                            style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                                            onPress={() => {this.props.navigation.navigate('Favorite List',{data:this.state})}}
                                        >
                                            Favorite
                                     </Button>
                                     <Button
                                        small
                                        style={{backgrounColor: argonTheme.COLORS.LABEL}}
                                        onPress={() => this.signOut().then( this.props.navigation.dispatch(CommonActions.reset({
                                            index:0,
                                            routes:[{name:'Login'}]
                                        })))
                                       }>                   
                                            LogOut
                                        </Button>
                                    </Block>
                                    <Block row space="between">
                                        <Block middle>
                                            <Text
                                                bold
                                                size={20}
                                                color="#525F7F"
                                                style={{ marginBottom: 4 }}>
                                                {this.state.like}
                                            </Text>
                                            <Text size={20} color={argonTheme.COLORS.TEXT}>Like</Text>
                                        </Block>
                                        <Block middle>
                                            <Text
                                                bold
                                                size={20}
                                                color="#525F7F"
                                                style={{ marginBottom: 4 }}>
                                                0
                                            </Text>
                                            <Text size={20} color={argonTheme.COLORS.TEXT}>Follow</Text>
                                        </Block>
                                    </Block>
                                </Block>
                                <Block flex>
                                    <Block middle style={styles.nameInfo}>
                                        <Text bold size={28} color="#32325D">
                                            {info.name}
                                        </Text>
                                        <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                                            {info.email}
                                        </Text>
                                    </Block>
                                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                                        <Block style={styles.divider} />
                                    </Block>
                                    <Block
                                        low
                                        style={{ paddingVertical: 14, alignItems: "baseline" }}>
                                        <Text bold size={16} color="#525F7F">
                                            최근검색
                                        </Text>
                                    </Block>
                                    <Block
                                        row
                                        style={{ paddingBottom: 20, justifyContent: "flex-end" }}>
                                        <Button
                                            small
                                            color="transparent"
                                            textStyle={{ color: "#5E72E4", fontSize: 12 }}
                                            onPress={() => this.props.navigation.navigate('Search List',{data:this.state})}
                                        >
                                            View all
                                        </Button>
                                    </Block>

                                </Block>
                            </Block>
                        </ScrollView>
                    </ImageBackground>
                </Block>
            </Block>
        )
    }
}



const styles = StyleSheet.create({
    profile: {
        marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
        //marginBottom: -HeaderHeight * 2,
        flex: 1
    },
    profileContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1
    },
    profileBackground: {
        width: width,
        height: height / 2
    },
    profileCard: {
        //position: "relative",
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: 65,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
    },
    info: {
        paddingHorizontal: 40
    },
    avatarContainer: {
        position: "relative",
        marginTop: -80
    },
    avatar: {
        width: 124,
        height: 124,
        borderRadius: 62,
        borderWidth: 0
    },
    nameInfo: {
        marginTop: 35
    },
    divider: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#E9ECEF"
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: "center",
        width: thumbMeasure,
        height: thumbMeasure
    }
});

export default Screen1;