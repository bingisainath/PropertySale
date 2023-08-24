import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import {WIDTH, HEIGHT, COLORS} from '../../constants/constants';
import CustomButton from '../../components/customButton/customButton';

const IntroSlider2 = (props: any) => {
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
        Start your property search now and find your perfect home!
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/welcome.jpg')}
          style={styles.image}
        />
        <View style={styles.dotContainer}>
          <View
            style={[styles.circle, {borderColor: 'black', borderWidth: 1}]}
          />
          <View
            style={[styles.circle, {borderColor: 'black', borderWidth: 1}]}
          />
          <View
            style={[
              styles.circle,
              {backgroundColor: 'white', borderColor: 'black', borderWidth: 1},
            ]}
          />
        </View>
        <TouchableOpacity>
          <Text
            onPress={() => navigation.navigate('EnablePermission')}
            style={{
              textDecorationLine: 'underline',
              marginTop: 6,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{marginRight: 20}}>
          <CustomButton
            title="Previous"
            onPress={() => navigation.navigate('IntroSlider1')}
            backgroundColor={COLORS.lightPink}
            textColor={COLORS.black}
            paddingVertical={36}
            paddingHorizontal={10}
            marginVertical={55}
            marginHorizontal={30}
            fontsize={16}
            fontWeight={600}
            borderColor={COLORS.black}
          />
        </View>
        <View>
          <CustomButton
            title="Next"
            onPress={() => navigation.navigate('EnablePermission')}
            backgroundColor={COLORS.btnColor}
            textColor={COLORS.white}
            paddingVertical={36}
            paddingHorizontal={7}
            marginVertical={53}
            marginHorizontal={44}
            fontsize={16}
            fontWeight={600}
            borderColor={'#000000'}
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
    bottom: 0,
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
    width: 292,
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
    left: WIDTH / 15,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
});

export default IntroSlider2;
