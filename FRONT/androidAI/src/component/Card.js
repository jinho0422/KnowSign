import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../constants';


class Card extends React.Component {
  getDetail = (item) => {
    console.log(item.sId);
    return fetch('http://52.78.224.30/getMenu/menu/' + item.state.id, {
      method: 'POST',
      body: JSON.stringify({ 'sId': item.sId }),
      headers: {
        Accept: "application/json",
      }
    }).then((res) => res.json())
      .then((resJson) => {
        console.log('detail')
        console.log(resJson);
        { this.props.navigation.navigate('Restaurant Imformation', { menu: resJson, data: item.state.info }) }
      }).catch((err) => {
        console.log(err);
      })
  }

  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;

    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow
    ];


    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={
          this.getDetail.bind(this, item)}>
          <Block flex style={imgContainer}>
           {item.image != '../../image/android_img.png' && <Image source={item.image} style={imageStyles} resizeMode='contain' />}
           {item.image == '../../image/android_img.png' && <Image  style={{width: '100%', height: '100%'}} resizeMode='contain' source={require('../../image/android_img.png')} />}
          </Block>
        </TouchableWithoutFeedback>
        {item.title != '' && <TouchableWithoutFeedback
        >
          <Block flex space="between" style={styles.cardDescription}>
            {item.favorite && !item.horizotal &&
              <Image style={styles.logo} source={require('../../image/full_heart.png')}></Image>}
            {!item.favorite && !item.horizontal &&
              <Image style={styles.logo} source={require('../../image/empty_heart.png')}></Image>}
            <Text size={25} style={styles.cardTitle}>{item.title}</Text>
            <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{item.cta}</Text>
          </Block>
        </TouchableWithoutFeedback>}
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 1,
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  cardDescription: {
    padding: theme.SIZES.BASE
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 500,
    resizeMode: 'contain'
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  logo: {
    width: 30,
    height: 30,
    marginLeft: 150

  },
});

export default withNavigation(Card);