import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { Card } from '../component';
import { Block, theme } from 'galio-framework';
import { ScrollView } from 'react-native-gesture-handler';


const { width } = Dimensions.get('screen');

class Wish extends Component {
  constructor(props) {
    super(props)
    console.log('wish')
    console.log(this.props.route.params.data)
    this.state = {
      // id:props.id,
      store: [],
      favorite: null,
      info: this.props.route.params.data,
      id: this.props.route.params.data.id,
    }
    console.log(this.state)
  }

  getDetail = (sId) => {
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
        'sId': item.storeId,
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
    if (!item.favorite)
      return;
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
    return fetch('http://52.78.224.30/getMenu/wishlist/' + this.state.id, {
      method: 'POST',
      headers: {
        Accept: "application/json",
      }
    }).then((res) => res.json())
      .then((resJson) => {
        console.log('res')
        this.setState({
          store: resJson
        })

      })

  }

  render() {
    return (
      <Block flex center style={styles.home}>
        <FlatList
          data={this.state.store}
          renderItem={this.renderItem}
          KeyExtractor={(item, index) => index}
          ItemSeparatorComponent={this.renderSeparator} />
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
    // alignItems:'flex-start'
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

export default Wish;