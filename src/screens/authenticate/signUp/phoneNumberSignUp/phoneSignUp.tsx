import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNPickerSelect from 'react-native-picker-select';

import CustomTextInput from '../../../../components/customTextInput/customTextInput';
import CustomButton from '../../../../components/customButton/customButton';
import {
  HEIGHT,
  WIDTH,
  COLORS,
  phoneNumberOptions,
} from '../../../../constants/constants';

const PhoneSignUp = (props: any) => {

  //props.route.params.phoneNumber

  const {navigation} = props;

  const [number, setNumber] = useState('');
  const [emailNumber, setNumberError] = useState(true);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(
    phoneNumberOptions[0].value,
  );

  const handlePhoneNumberChange = (value: any) => {
    // console.log("value "+value);

    setSelectedPhoneNumber(value);
    
    // console.log(selectedPhoneNumber);

  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightPink}}>
      <View style={styles.textContainer}>
        <Text style={styles.textLabal}>
          {`Looks like you don’t have an account using +91 ${props?.route?.params?.phoneNumber}. Let’s create
          one!`}
        </Text>
      </View>
      <View style={styles.codeLabel}>
        <Text style={styles.codeLabelText}>Mobile </Text>
        <Text style={{color: COLORS.status_red}}>*</Text>
      </View>
      <View style={{marginTop: WIDTH / 20}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 120}}>
            <RNPickerSelect
              onValueChange={handlePhoneNumberChange}
              items={phoneNumberOptions}
              value={selectedPhoneNumber}
              style={{
                inputAndroid: {
                  fontSize: 16,
                  // borderRadius: 8,
                  // color: 'black',
                  width: '90%',
                  height: 32,
                  backgroundColor: 'lightgray',
                  marginTop: 10,
                  marginHorizontal: 20,
                },
              }}
            />
          </View>
          <View style={[styles.codeTextInput, {}]}>
            <CustomTextInput
              placeholder="Number"
              error={emailNumber}
              errorText="Invalid Number. Enter Valid Number."
              viewHeight={undefined}
              value={number}
              // onChange={text => handleUserName(text)}
            />
          </View>
        </View>
        <View style={{marginLeft: 40, marginTop: 10}}>
          <Text>We will send you a OTP for verification</Text>
        </View>
        <View style={{marginTop : HEIGHT / 30,marginHorizontal: WIDTH / 9, flexDirection:'row'}}>
          <Text style={styles.codeLabelText}>Name </Text>
          <Text style={{color: COLORS.status_red}}>*</Text>
        </View>
        <View style={[styles.NameInput, {}]}>
          <CustomTextInput
            placeholder="Your Name"
            error={emailNumber}
            errorText="Invalid Email. Enter Valid Email."
            viewHeight={undefined}
            value={number}
            // onChange={text => handleUserName(text)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Submit"
          // onPress={() => navigation.navigate('SignIn')}
          backgroundColor={COLORS.black}
          textColor={COLORS.white}
          paddingVertical={23}
          paddingHorizontal={9}
          marginVertical={HEIGHT / 20}
          marginHorizontal={WIDTH / 15}
          fontsize={16}
          fontWeight={900}
          borderColor={COLORS.black}
          // icon='../../assets/call-end.jpg'
        />
      </View>
    </View>
  );
};

export default PhoneSignUp;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: WIDTH / 10,
  },
  textLabal: {
    top: HEIGHT / 20,
    fontSize: 13,
    fontWeight: '400',
    color: '#222222',
  },
  codeLabel: {
    marginLeft: WIDTH / 9,
    flexDirection: 'row',
    top: HEIGHT / 20,
    marginTop: 30,
    marginBottom: 20,
  },
  codeLabelText: {
    color: 'black',
  },
  codeTextInput: {
    // marginHorizontal: WIDTH / 20,
    // marginTop: HEIGHT / 40,
    width: '65%',
  },
  NameInput: {
    margin:10,
  },
  newLabel: {
    marginLeft: WIDTH / 9,
    flexDirection: 'row',
    top: HEIGHT / 50,
    // margin: 10,
  },
  newLabelText: {
    color: 'black',
  },
  newTextInput: {
    marginHorizontal: WIDTH / 20,
    marginTop: HEIGHT / 50,
  },
  confirmLabel: {
    marginLeft: WIDTH / 9,
    flexDirection: 'row',
    top: HEIGHT / 50,
    // margin: 10,
  },
  confirmLabelText: {
    color: 'black',
  },
  confirmTextInput: {
    marginHorizontal: WIDTH / 20,
    marginTop: HEIGHT / 50,
  },
  buttonContainer: {
    marginHorizontal: WIDTH / 20,
    marginTop: HEIGHT <= 684 ? hp('25%') : hp('40%'),
    // backgroundColor:'blue'
  },
});
