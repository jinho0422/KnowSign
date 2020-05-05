import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { CommonActions } from '@react-navigation/native';
const { width, height } = Dimensions.get("screen");




class MenutoDetails extends Component {
  constructor(props) {
    super(props)
    console.log('menu detail')
    this.state = {
      info: this.props.route.params.data.info,
      id: this.props.route.params.data.info.id,
      imageSource: null,
      data: null,
      menu: [],
      sName: null,
      favorite: false,
      sId: null,
      kor: true//this.props.route.params.data.kor, //true :kor
    }
    console.log(this.state)
  }



  renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', marginLeft: '5%', marginTop: '3%', marginBottom: '3%' }}>
          <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginBottom: '3%' }}>
              {this.state.kor && item.menuNameKor}
              {!this.state.kor && item.menuNameEng}
            </Text>
            <Text style={{ fontSize: 16, color: 'black' }}>
              ☞ {item.price}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  renderSeparator = () => {
    return (
      <View
        style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
      </View>
    )
  }

  componentDidMount() {
    console.log('datail component')
    console.log(this.props.route.params.menu)
    this.setState({
      menu: this.props.route.params.menu.menu,
      imageSource: JSON.parse(this.props.route.params.menu.imageSource),
      sName: this.props.route.params.menu.sName,
      sId: this.props.route.params.menu.sId,
      favorite: this.props.route.params.menu.favorite,
      //id: this.props.route.params.data.id,
    })
  }



  UpdateWishList() {
    this.setState({
      favorite: !(this.state.favorite),
    })
    // db연동
    // store Name, id
    return fetch('http://52.78.224.30/getMenu/addwish/' + this.state.id, {
      method: 'POST',
      body: JSON.stringify({
        'sId': this.state.sId,
        'favorite': !this.state.favorite
      }),
      headers: {
        Accept: "application/json",
      }
    }).then((res) => {
      console.log(this.state)
    }).then(() => {
      const resetActions = CommonActions.reset({
        index: 0,
        routes: [{ name: 'Search List', params: { data: this.state } }]
      });
      this.props.navigation.dispatch(resetActions);

    })

  }


  UpdateLang() {
    this.props.navigation.pop();
    this.props.navigation.navigate('EngMRestaurant Imformation-English', { menu: this.props.route.params.menu, data: this.state })
  }

  render() {
    console.log(this.state)



    return (

      <View style={styles.container}>

        <View style={{ backgroundColor: 'white' }}>

          <View style={{ marginBottom: 10, marginTop: 30, width: width, height: 120, backgroundColor: 'black' }}>

            <Image style={styles.image}
              source={this.state.imageSource}
            >
            </Image>
          </View>
          <View style={styles.title}>
            <TouchableOpacity style={styles.logo} onPress={this.UpdateWishList.bind(this)}>
              {this.state.favorite &&
                <Image style={styles.logo} source={require('../../image/full_heart.png')}></Image>}
              {!this.state.favorite &&
                <Image style={styles.logo} source={require('../../image/empty_heart.png')}></Image>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.logo} onPress={this.UpdateLang.bind(this)}>
              {!this.state.kor &&
                <Text>Kor</Text>}
              {this.state.kor &&
                <Text>Eng</Text>}
            </TouchableOpacity>

          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <View
            style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
          </View>
          <FlatList
            data={this.state.menu}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
        <View
          style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    marginLeft: '5%',
    flexDirection: 'row'
  },
  logo: {
    // flex:1,
    // alignSelf:'flex-end',
    width: 35,
    height: 35,
    marginRight: 20
  },
  name_container: {
    // alignItems:'flex-start'
    alignSelf: 'stretch',
    fontSize: 28,
    color: 'black',
    backgroundColor: 'white',
    width: '87%',
    //left:'5%'
  },
  button_container: {
    flex: 1,
    backgroundColor: '#A0A0A0',
    flexDirection: 'row',
    position: "absolute",
    alignSelf: 'center',
    bottom: 0
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
    width: '100%',
    height: 100,
    alignItems: 'center',
    resizeMode: 'contain',
    flex: 1,
    // marginTop: 30,
    alignSelf: 'flex-start'
  }
})

export default MenutoDetails;
