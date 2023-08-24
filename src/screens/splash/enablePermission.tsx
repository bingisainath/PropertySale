import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import {WIDTH, HEIGHT, COLORS} from '../../constants/constants';
import CustomButton from '../../components/customButton/customButton';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'SqFeet App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
      Alert.alert('Media permission was approved');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'requesting for location',
        message:
          'SqFeet App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      Alert.alert('Location permission was approved');
    } else {
      console.log('location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestCallPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: 'SqFeet App Camera Permission',
        message:
          'SqFeet App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the call');
      Alert.alert('SMS permission was approved');
    } else {
      console.log('call permission denied');
      Alert.alert('SMS permission was Not approved');
    }
  } catch (err) {
    console.warn(err);
  }
};

const EnablePermission = (props: any) => {
  const {navigation} = props;

  return (
    <View style={[styles.container]}>
      <View style={{flex: 1, backgroundColor: COLORS.lightBlue}} />
      <View style={{flex: 1, backgroundColor: COLORS.lightPink}} />
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Enable Permission</Text>
      </View>
      <View style={styles.WelcomeContainer}>
        <Text style={styles.WelcomeText}>
          Choose “Allow” on the next section for a better personalise experience
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.permissionContainer}>
          <TouchableOpacity style={styles.permissionSpacing}>
            <Text
              style={styles.permissionText}
              onPress={requestLocationPermission}>
              {' '}
              - Location
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.permissionSpacing}>
            <Text style={styles.permissionText} onPress={requestCallPermission}>
              {' '}
              - Call/SMS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.permissionSpacing}>
            <Text
              style={styles.permissionText}
              onPress={requestCameraPermission}>
              {' '}
              - Media
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text
            style={{
              textDecorationLine: 'underline',
              marginTop: 25,
              color: 'black',
            }}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <CustomButton
            title="Continue"
            onPress={() => navigation.navigate('Welcome')}
            backgroundColor={COLORS.lightPink}
            textColor={COLORS.black}
            paddingVertical={36}
            paddingHorizontal={3}
            marginVertical={38}
            marginHorizontal={35}
            fontsize={16}
            fontWeight="bold"
            borderColor={COLORS.black}
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
    width: 292,
    height: 210,
  },
  WelcomeText: {
    fontSize: 32,
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
  permissionContainer: {
    paddingHorizontal: WIDTH / 10,
    paddingVertical: HEIGHT / 18,
    backgroundColor: '#a4d7eb',
  },
  permissionText: {
    fontSize: 25,
    color: 'black',
  },
  permissionSpacing: {
    margin: 10,
  },
  imageContainer: {
    position: 'absolute',
    top: HEIGHT / 3.5,
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

export default EnablePermission;
