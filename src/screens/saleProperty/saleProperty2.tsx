import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/customButton/customButton';
import {
  HEIGHT,
  WIDTH,
  COLORS,
  phoneNumberOptions,
} from '../../constants/constants';
import RNPickerSelect from 'react-native-picker-select';
import TextInput from '../../components/customTextInputWithReackHook/TextInput';
import {useForm} from 'react-hook-form';
import {postPropertyRequest} from '../../redux/userActions';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';

const SaleProperty2 = (props: any) => {
  const {navigation} = props;
  const user = auth().currentUser;

  const dispatch = useDispatch();

  const saleData = props.route.params.formData;

  const [switchValue1, setSwitchValue1] = useState(false);
  const [switchValue2, setSwitchValue2] = useState(false);

  //@ts-ignore
  const {control, handleSubmit, getValues, setValue} = useForm<FormFieldsInp>({
    defaultValues: {},
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const toggleSwitch1 = (value: any) => {
    setSwitchValue1(value);
  };

  const toggleSwitch2 = (value: any) => {
    setSwitchValue2(value);
  };

  const [selectedCountryCode, setSelectedCountryCode] = useState(
    phoneNumberOptions[0].value,
  );

  const handleCountryCodeChange = (value: any) => {
    setSelectedCountryCode(value);
  };

  const onPublish = async () => {
    console.log('clicked!!');
    const formValues3 = getValues();
    console.log('formValues', formValues3);
    setTimeout(() => {
      const completeData = {
        ...props.route.params.formValue1.formValue1,
        ...props.route.params.formValue2,
        ...formValues3,
      };

      const Data = {
        Data: completeData,
        user: user,
        imgData: props.route.params.formValue1.imgData,
      };

      dispatch(postPropertyRequest(Data));
    }, 2000);

    Alert.alert('You property has uploaded');
    navigation.navigate('ProfileScreen');
  };
  const onErrors = async (data: any) => {
    console.log('Error in validation : ', data);
  };

  return (
    <View style={styles.main}>
      <View style={styles.lineContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SaleProperty0')}>
          <View style={styles.dot1} />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={() => navigation.navigate('SaleProperty1')}>
          <View style={styles.dot2} />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity>
          <View style={styles.dot3} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '35%', marginLeft: 10}}>
          <Text style={{color: 'black', marginLeft: 10}}>Photo/Address</Text>
        </View>
        <View style={{width: '30%'}}>
          <Text style={{color: '#BECDE2'}}>Property Details</Text>
        </View>
        <View>
          <Text style={{color: '#BECDE2', marginRight: 10}}>
            Contact Information
          </Text>
        </View>
      </View>

      <View>
        <Text style={styles.helloText}>
          Hello{' '}
          {user?.displayName
            ? user?.displayName
            : user?.email
            ? user?.email
            : user?.phoneNumber
            ? user.phoneNumber
            : 'info Not avaliable'}
          ! you are just one step away !
        </Text>
      </View>
      <View style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 20}}>Your name Preview </Text>
          <Text style={{color: COLORS.status_red}}>*</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Name is required!',
              },
              validate: (value: string | any[]) =>
                value.length > 60 ? 'Length should be less than 60' : null,
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 20}}>Your registered mail </Text>
          <Text style={{color: COLORS.status_red}}>*</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Email is required!',
              },
              validate: (value: string | any[]) =>
                value.length > 60 ? 'Length should be less than 60' : null,
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 20}}>Mobile </Text>
          <Text style={{color: COLORS.status_red}}>*</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 120}}>
            <RNPickerSelect
              onValueChange={handleCountryCodeChange}
              items={phoneNumberOptions}
              value={selectedCountryCode}
              style={{
                inputAndroid: {
                  fontSize: 16,
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
            <TextInput
              name="phoneNumber"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Invalid Number. Enter Valid Number.',
                },
                validate: (value: string | any[]) =>
                  value.length !== 10
                    ? 'Phone number should be 10 digits'
                    : null,
              }}
              placeHolder="Number"
            />
          </View>
        </View>
        <View>
          <CustomButton
            title="Submit"
            backgroundColor={COLORS.btnColor}
            textColor={COLORS.white}
            paddingVertical={40}
            paddingHorizontal={9}
            marginVertical={HEIGHT / 25}
            marginHorizontal={WIDTH / 20}
            fontsize={16}
            fontWeight={900}
            borderColor={COLORS.black}
            onPress={handleSubmit(onPublish, onErrors)}
            // icon='../../assets/call-end.jpg'
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.lightPink,
    textAlign: 'center',
  },
  helloText: {
    fontSize: 20,
    color: '#000',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  textInput: {
    marginHorizontal: WIDTH / 600,
    backgroundColor: COLORS.lightPink,
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
    width: '66%',
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotText: {
    marginTop: 10,
    fontSize: 12,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    width: 5,
    backgroundColor: '#C2CBD6',
    marginTop: 20,
    marginBottom: 15,
  },
  dot3: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'black',
    marginBottom: 15,
    marginRight: 20,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
  },
  dot2: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#29ABE2',
    marginBottom: 15,
    borderColor: 'black',
    marginTop: 20,
  },
  dot1: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#29ABE2',
    marginLeft: 20,
    marginBottom: 15,
    borderColor: 'black',
    marginTop: 20,
  },
});

export default SaleProperty2;
