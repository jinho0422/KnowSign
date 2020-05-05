import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, Dimensions } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { Button, Icon } from 'galio-framework';
import { Block, theme } from 'galio-framework';
import { Card } from './';


const { width } = Dimensions.get('screen');



class Menus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      store: [],
      favorite: false,
      info: this.props.route.params.data,
      id: this.props.route.params.data.id,
    }
    console.log('menu')
  }

  getDetail = (sId) => {
    console.log('sid')
    //  console.log(this.state.sId)
    console.log(sId);
    return fetch('http://52.78.224.30/getMenu/menu/' + this.state.id, {
      method: 'POST',
      body: JSON.stringify({ 'sId': sId }),
      headers: {
        Accept: "application/json",
      }
    }).then((res) => res.json())
      .then((resJson) => {
        console.log('detail')
        console.log(resJson);
        { this.props.navigation.navigate('Restaurant Imformation', { menu: resJson, data: this.state.info }) }
      }).catch((err) => {
        console.log(err);
      })
  }


  UpdateWishList = ({ item }) => {
    console.log(this.state)
    // db연동
    // store Name, id
    return fetch('http://52.78.224.30/getMenu/addwish/' + this.state.id, {
      method: 'POST',
      body: JSON.stringify({
        'sId': this.state.sId,
        'favorite': !item.favorite
      }),
      headers: {
        Accept: "application/json",
      }
    }).then((res) => {
      //console.log(item.storeId)
    })
  }


  renderItem = ({ item }) => {
    console.log(item);
    const imageurl = JSON.parse(item.uri);
    return (
      <ScrollView
        showVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <Card
            item={
              {
                image: JSON.parse(item.uri),
                title: item.sName,
                favorite: item.favorite,
                sId: item.sId,
                state: this.state,
              }
            }
            horizontal />
        </Block>
      </ScrollView>
    )
  }

  renderSeparator = () => {
    return (
      <Block
        style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
      </Block>
    )
  }

  componentDidMount() {
    return fetch('http://52.78.224.30/getMenu/all/' + this.state.id, {
      method: 'GET',
      headers: {
        Accept: "application/json",
      }
    }).then((res) => res.json())
      .then((resJson) => {
        console.log('res')
        this.setState({
          store: resJson,

        })

      })

  }

  goHome() {
    console.log('home')
    console.log(this.state.info.info)
    this.props.navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: 'My Information', params: { data: this.state.info.info } }]
    }))
  }

  goWish() {
    console.log('home')
    console.log(this.state.info.info)
    this.props.navigation.dispatch(CommonActions.reset({
      index: 1,
      routes: [{ name: 'My Information', params: { data: this.state.info.info } }, { name: 'Favorite List', params: { data: this.state.info } }]
    }))
  }

  render() {
    return (
      <Block flex style={styles.home}>
        <Block row>
          <Button style={{ marginTop: 10, backgroundColor: '#5E72E4', marginLeft: '3%', width: 50, height: 30 }} onPress={this.goHome.bind(this)}>
            <Text style={{ color: 'white' }}>Home</Text>
          </Button>

          <Button style={{ marginTop: 10, backgroundColor: '#FE2472', marginLeft: '70%', width: 50, height: 30 }} onPress={this.goWish.bind(this)}>
            <Text style={{ color: 'white' }}>Wish</Text>
          </Button>

        </Block>

        <Block flex center style={{ marginLeft: 8 }}>
          <FlatList
            data={this.state.store}
            renderItem={this.renderItem}
            KeyExtractor={(item, index) => index}
            ItemSeparatorComponent={this.renderSeparator} />
        </Block>
      </Block>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    //  alignItems: 'center',
    backgroundColor: 'gray',
  },
  title: {
    marginLeft: '5%',
    marginTop: '7%',
    flexDirection: 'row',
    backgroundColor: 'blue'
  },
  logo: {
    width: 30,
    height: 30,
    marginTop: '7%',
    marginRight: 10
  },
  name_container: {
    // alignItems:'flex-start',
    //  alignSelf:'stretch',
    fontSize: 28,
    color: 'white',
    //backgroundColor:'white',
    width: '87%',
    height: 70,
    marginLeft: '5%',
    marginTop: '5%',
    justifyContent: 'center'
    //left:'5%'
  },
  button_container: {
    flex: 1,
    backgroundColor: '#A0A0A0',
    flexDirection: 'row',
    position: "absolute",
    alignSelf: 'center',
    bottom: 0,
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#330066',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: '7%',
    marginRight: "8%"

  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  image: {
    width: '90%',
    height: 50,
    flex: 1,
    // marginTop: 30,
    alignSelf: 'center'
  },
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,

  },
})

export default Menus;
