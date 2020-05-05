import { StyleSheet, Platform } from 'react-native';
import { HeaderHeight } from '../constants/utils';


export const styles = StyleSheet.create({

  bg: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
      },
      header: {
        width:'100%',
        height:'20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff9a9a',
      },
      title: {
        width:'100%',
        height:'20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9aa9ff',
      },
      content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d6ca1a',
      },
      footer: {
        width:'100%',
        height:'20%',
        backgroundColor: '#1ad657',
      },
      backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
   
      },
      logo: {
        width: 120,
        height: 120,
      },
      logoContainer: {
        alignItems: 'center',
      },
      logoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        margin: 10,
        opacity: 0.5,

      }



});



