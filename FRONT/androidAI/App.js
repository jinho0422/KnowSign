import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import GoogleSignins from './src/component/GoolgleSignin';
import Cameras from './src/component/Cameras';
import Details from './src/component/Details';
import MenutoDetails from './src/component/MenutoDetails';
import EngMenutoDetails from './src/component/MenutoDetails_eng';
import Menus from './src/component/Menus';
import Wish from './src/component/Wish';
import Profiles from './src/screens/Profile';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();

export default class App extends Component {

  render() {
    createHomeStack = () => 
    <Stack.Navigator>
      <Stack.Screen name="Login" component = {GoogleSignins} />
      <Stack.Screen name="My Information" component = {Profiles} />
      <Stack.Screen name="Camera" component = {Cameras}/>
      <Stack.Screen name="Search List" component = {Menus} />  
      <Stack.Screen name="Restaurant" component = {Details} /> 
      <Stack.Screen name="Restaurant Imformation" component = {MenutoDetails} /> 
      <Stack.Screen name="Restaurant Imformation-English" component = {EngMenutoDetails} /> 
      <Stack.Screen name="Favorite List" component = {Wish} /> 
    </Stack.Navigator>

    return(
      <NavigationContainer >
          <Drawer.Navigator>
            <Drawer.Screen name="Home" children={createHomeStack} />
          </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
