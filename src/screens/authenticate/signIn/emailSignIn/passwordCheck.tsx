import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

import {WIDTH, HEIGHT, COLORS} from '../../../../constants/constants';
import CustomTextInput from '../../../../components/customTextInput/customTextInput';
import CustomButton from '../../../../components/customButton/customButton';
import {passwordRequest} from '../../../../redux/userActions';

const PasswordCheck = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handlePassword = (password: string) => {
    setPassword(password);
  };

  const result = useSelector((state: any) => state.user);
  const loading = useSelector((state: any) => state.loading);

  const handleButtonPress = async () => {
    if (password != '') {
      await dispatch(passwordRequest(props.route.params.email, password));
    } else {
      Alert.alert('Enter valid Password');
    }
  };

  const user = useSelector((state: any) => state.user);

  const handleForgetPass = () => {
    auth()
      .sendPasswordResetEmail(props.route.params.email)
      .then(function (user) {
        Alert.alert('We sent you an Email. Please check your email...');
        //@ts-expect-error
        navigation.navigate('EmailCheck', {
          email: props.route.params.email,
        });
      })
      .catch(function (e) {
        console.log(e);
        Alert.alert('Error Occured');
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightBlue}}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {`Looks like we already know ${props.route.params.email}. Enter your password`}
        </Text>
      </View>
      <View style={{marginVertical: WIDTH / 20}}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Password </Text>
          <Text style={{color: 'red'}}>*</Text>
        </View>
        {user?.error == 'Wrong Password'? (
          <View style={styles.textInput}>
            <CustomTextInput
              placeholder="Password"
              error={passwordError}
              errorText="Wrong password. Try again or click Forgot password to reset it."
              viewHeight={undefined}
              value={password}
              onChange={(text: string) => handlePassword(text)}
            />
             <View style={{marginLeft:20,marginTop:10}}>
              <Text style={{color:'red',fontWeight:'bold'}}>Entered Correct Password</Text>
            </View>
          </View>
        ) : (
          <View style={styles.textInput}>
            <CustomTextInput
              placeholder="Password"
              error={passwordError}
              errorText="Wrong password. Try again or click Forgot password to reset it."
              viewHeight={undefined}
              value={password}
              onChange={(text: string) => handlePassword(text)}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.forgetPassContainer}
          onPress={() => {
            handleForgetPass();
          }}>
          <Text style={styles.forgetPassText}>Forgot Password ?</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View>
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Submit"
            onPress={handleButtonPress}
            backgroundColor={COLORS.btnColor}
            textColor={COLORS.white}
            paddingVertical={36}
            paddingHorizontal={9}
            marginVertical={HEIGHT / 10}
            marginHorizontal={WIDTH / 15}
            fontsize={16}
            fontWeight={900}
            borderColor={COLORS.black}
          />
        </View>
      )}
    </View>
  );
};

export default PasswordCheck;

const styles = StyleSheet.create({
  textContainer: {
    top: HEIGHT / 20,
    marginHorizontal: WIDTH / 10,
  },
  text: {
    color: COLORS.black,
  },
  label: {
    marginLeft: WIDTH / 10,
    flexDirection: 'row',
    top: HEIGHT / 20,
    margin: 10,
  },
  labelText: {
    color: 'black',
  },
  textInput: {
    marginHorizontal: WIDTH / 20,
    marginTop: HEIGHT / 20,
  },
  forgetPassContainer: {
    marginHorizontal: WIDTH / 10,
    marginVertical: HEIGHT / 50,
  },
  forgetPassText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginHorizontal: wp('5%'),
    margin: HEIGHT <= 684 ? hp('25%') : hp('35%'),
  },
  activityIndicator: {
    padding: 20,
    backgroundColor: COLORS.lightBlue,
    marginHorizontal: WIDTH / 10,
    marginTop: HEIGHT <= 684 ? hp('45%') : hp('65%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
