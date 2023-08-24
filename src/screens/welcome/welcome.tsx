import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import {WIDTH, HEIGHT, COLORS} from '../../constants/constants';
import CustomButton from '../../components/customButton/customButton';

const Welcome = (props:any) => {

  const {navigation} = props

  return (
    <View style={[styles.container]}>
      <View style={{flex: 1, backgroundColor: COLORS.lightBlue}} />
      <View style={{flex: 1, backgroundColor: COLORS.lightPink}} />
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Hello!</Text>
      </View>
      <View style={styles.WelcomeContainer}>
        <Text style={styles.WelcomeText}>Welcome to "sqFEET"</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Register or Sign in to get more personalise experience, easy access to
          near by deals
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/welcome.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={{marginRight:20}}>
          <CustomButton
            title="Sign In"
            onPress={() => navigation.navigate('SignIn')}
            backgroundColor={COLORS.btnColor}
            textColor={COLORS.white}
            paddingVertical = {36}
            paddingHorizontal = {8}
            marginVertical = {55}
            marginHorizontal = {65}
            fontsize = {16}
            fontWeight = {600}
            borderColor = {COLORS.btnColor}
          />
        </View>
        <View>
        <CustomButton
            title="Register"
            onPress={() => navigation.navigate('SignIn')}
            backgroundColor={COLORS.lightPink}
            textColor={COLORS.black}
            paddingVertical = {36}
            paddingHorizontal = {8}
            marginVertical = {53}
            marginHorizontal = {54}
            fontsize = {16}
            fontWeight = {600}
            borderColor = {'#000000'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.lightBlue
  },
  helloContainer: {
    position: 'absolute',
    top: HEIGHT / 25,
    left: WIDTH / 15,
    right: 0,
    bottom: 0,
    width: 55,
    height: 23,
  },
  helloText: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.black,
    fontFamily: 'Helvetica',
  },
  WelcomeContainer: {
    position: 'absolute',
    top: HEIGHT / 12,
    left: WIDTH / 15,
    right: 0,
    bottom: 0,
    width: 330,
    height: 42,
  },
  WelcomeText: {
    fontSize: 34,
    fontWeight: '600',
    fontFamily: 'Source Sans Pro',
    color: COLORS.black,
  },
  infoContainer: {
    position: 'absolute',
    top: HEIGHT / 6,
    left: WIDTH / 15,
    right: 0,
    bottom: 0,
    width: 312,
    height: 32,
  },
  infoText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    color: COLORS.black,
  },
  imageContainer: {
    position: 'absolute',
    top: HEIGHT / 5,
    left: 20,
    right: 20,
    bottom: 150,
    justifyContent:'center',
    alignItems:'center',
  },
  image: {
    height: 294,
    width: 220,
  },
  buttonContainer:{
    position:'absolute',
    top: HEIGHT / 1.3,
    left: WIDTH / 15,
    right: 0,
    bottom: 0,
    flexDirection:'row',
  }
});

export default Welcome;
