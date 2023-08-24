import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import {WIDTH, HEIGHT, COLORS} from '../../constants/constants';
import CustomButton from '../../components/customButton/customButton';

const IntroSlider0 = (props: any) => {
  const {navigation} = props;

  return (
    <View style={[styles.container]}>
      <View style={{flex: 1, backgroundColor: COLORS.lightBlue}} />
      <View style={{flex: 1, backgroundColor: COLORS.lightPink}} />
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Sq Feet</Text>
      </View>
      <View style={styles.WelcomeContainer}>
        <Text style={styles.WelcomeText}>
        Welcome to Property Sales App!
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/welcome.jpg')}
          style={styles.image}
        />
        <View style={styles.dotContainer}>
          <View style={[styles.circle, {backgroundColor: 'white', borderColor:'black',borderWidth:1}]} />
          <View style={[styles.circle, {borderColor:'black',borderWidth:1}]} />
          <View style={[styles.circle, {borderColor:'black',borderWidth:1}]} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View>
          <CustomButton
            title="Next"
            onPress={() => navigation.navigate('IntroSlider1')}
            backgroundColor={COLORS.lightPink}
            textColor={COLORS.black}
            paddingVertical = {36}
            paddingHorizontal = {3}
            marginVertical = {55}
            marginHorizontal = {25}
            fontsize = {16}
            fontWeight = {600}
            borderColor = {COLORS.black}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  helloContainer: {
    position: 'absolute',
    top: HEIGHT / 25,
    left: WIDTH / 15,
    right: 0,
    marginBottom: 10,
    width: 200,
    height: 40,
  },
  helloText: {
    fontSize: 30,
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
    width: 400,
    height: 166,
  },
  WelcomeText: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Source Sans Pro',
    color: COLORS.black,
    marginTop:20
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
    top: HEIGHT / 5.5,
    left: 20,
    right: 20,
    bottom: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 284,
    width: 220,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonContainer: {
    position: 'absolute',
    top: HEIGHT / 1.2,
    left: WIDTH / 13,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
});

export default IntroSlider0;

