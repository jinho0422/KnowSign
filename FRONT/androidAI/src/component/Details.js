import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { CommonActions } from '@react-navigation/native';
const { width } = Dimensions.get('screen');


class Details extends Component {
  constructor(props) {
    super(props)
    console.log('detail')
    console.log(this.props.route.params.data)
    this.state = {
      info: this.props.route.params.data.info,
      id: this.props.route.params.data.info.id,
      imageSource: null,
      data: null,
      menu: [],
      Name: null,
      favorite: false,
      sId: null,
      kor: true,
    }
    console.log(this.state);
  }



  renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', marginLeft: '5%', marginTop: '3%', marginBottom: '3%' }}>
          <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginBottom: '3%' }}>
              {item.menuNameKor}
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
    console.log(this.props.route.params.data)
    this.setState({
      menu: this.props.route.params.data.menu,
      imageSource: this.props.route.params.data.imageSource,
      Name: this.props.route.params.data.sName,
      sId: this.props.route.params.data.sId,
      favorite: this.props.route.params.data.favorite,
      id: this.props.route.params.data.id,
    })
    fetch('http://52.78.224.30/setMenu/uri/' + this.state.id, {
      method: 'POST',
      body: JSON.stringify({
        'sId': this.props.route.params.data.sId,
        'uri': this.props.route.params.data.imageSource
      }),
      headers: {
        Accept: "application/json",
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
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
        routes: [{ name: 'Search List', params: { data: this.state.info } }]
      });
      this.props.navigation.dispatch(resetActions);

    })
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
    width: 35,
    height: 35,
    marginRight: 10
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
    width: '90%',
    height: 200,
    flex: 1,
    // marginTop: 30,
    alignSelf: 'center'
  }
})

export default Details;