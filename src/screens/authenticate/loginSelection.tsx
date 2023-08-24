import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';


import CustomButton from '../../components/customButton/customButton';
import {HEIGHT, WIDTH, COLORS} from '../../constants/constants';
import {goolgeLoginRequest} from '../../redux/userActions'

const SignInScreen = (props: any) => {
  const {colors} = useTheme();

  const {navigation} = props;

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/welcome.jpg')}
          style={{height: 200, width: 200}}
        />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <View style={{marginRight: WIDTH / 20}}>
          <CustomButton
            title="Continue with e-mail"
            onPress={() => navigation.navigate('EmailCheck')}
            backgroundColor={COLORS.white}
            textColor={COLORS.black}
            paddingVertical={46}
            paddingHorizontal={9}
            marginVertical={HEIGHT / 10}
            marginHorizontal={WIDTH / 15}
            fontsize={16}
            fontWeight={900}
            borderColor={COLORS.black}
            icon={require('../../assets/email.png')}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              marginVertical: 10,
              width: '40%',
              marginLeft: 10,
            }}
          />
          <View>
            <Text>
              {'     '}or{'     '}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              marginVertical: 10,
              width: '40%',
            }}
          />
        </View>

        <View style={{marginRight: WIDTH / 20}}>
          <CustomButton
            title="Continue with mobile number"
            onPress={() => navigation.navigate('PhoneSignIn')}
            backgroundColor={COLORS.white}
            textColor={COLORS.black}
            paddingVertical={46}
            paddingHorizontal={9}
            marginVertical={HEIGHT / 10}
            marginHorizontal={WIDTH / 15}
            fontsize={16}
            fontWeight={900}
            borderColor={COLORS.black}
            icon={require('../../assets/call-end.jpg')}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              marginVertical: 10,
              width: '40%',
              marginLeft: 10,
            }}
          />
          <View>
            <Text>
              {'     '}or{'     '}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              marginVertical: 10,
              width: '40%',
            }}
          />
        </View>
        <View style={{marginRight: WIDTH / 20}}>
          <CustomButton
            title="Continue with Google"
            onPress={async () => {
              GoogleSignin.configure({
                webClientId:
                  '728038974058-4q7fe1hghtvgokh0q1dtaqsb6df70sto.apps.googleusercontent.com',
              });

              try {
                // Check if your device supports Google Play
                await GoogleSignin.hasPlayServices({
                  showPlayServicesUpdateDialog: true,
                });

                // Get the users ID token
                const {idToken} = await GoogleSignin.signIn();

                // Create a Google credential with the token
                const googleCredential =
                  auth.GoogleAuthProvider.credential(idToken);

                return auth()
                  .signInWithCredential(googleCredential)
                  .then((res) => {
                    dispatch(goolgeLoginRequest())
                  });
              } catch (error) {
                console.log('Google Sign-in error:', error);
              }
            }}
            backgroundColor={COLORS.white}
            textColor={COLORS.black}
            paddingVertical={46}
            paddingHorizontal={9}
            marginVertical={HEIGHT / 10}
            marginHorizontal={WIDTH / 15}
            fontsize={16}
            fontWeight={900}
            borderColor={COLORS.black}
            icon={require('../../assets/google.png')}
          />
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBlue,
  },
  header: {
    flex: HEIGHT / 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
