import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {HEIGHT, WIDTH, COLORS} from '../../../constants/constants';
import {Dropdown} from 'react-native-element-dropdown';
import CustomTextInput from '../../../components/customTextInput/customTextInput';
import CustomButton from '../../../components/customButton/customButton';
import {useForm, Controller} from 'react-hook-form';
import TextInput from '../../../components/customTextInputWithReackHook/TextInput';

import takeFromGallery from '../../../components/Gallery/galley';
import openCamera from '../../../components/Camera/camera';
import {upload} from '../../../components/uploadMedia/upload';
import {useDispatch} from 'react-redux';

const dataState = [
  {
    label: 'Karnataka',
    value: 'Karnataka',
    city: [
      {label: 'Bangalore', value: 'Bangalore'},
      {label: 'Mysore', value: 'Mysore'},
    ],
  },
  {
    label: 'Kerala',
    value: 'Kerala',
    city: [
      {label: 'Kochi', value: 'Kochi'},
      {label: 'Allapuzha', value: 'Allapuzha'},
    ],
  },
  {
    label: 'Madhya Pradesh',
    value: 'Madhya Pradesh',
    city: [
      {label: 'Indore', value: 'Indore'},
      {label: 'Bhopal', value: 'Bhopal'},
    ],
  },
  {
    label: 'Maharashtra',
    value: 'Maharashtra',
    city: [
      {label: 'Mumbai', value: 'Mumbai'},
      {label: 'Pune', value: 'Pune'},
    ],
  },
  {
    label: 'Tamil Nadu',
    value: 'Tamil Nadu',
    city: [
      {label: 'Chennai', value: 'Chennai'},
      {label: 'Coimbatore', value: 'Coimbatore'},
    ],
  },
  {
    label: 'Telangana',
    value: 'Telangana',
    city: [
      {label: 'Hyderabad', value: 'Hyderabad'},
      {label: 'Nalgonda', value: 'Nalgonda'},
    ],
  },
];

const EditSaleProperty0 = (props: any) => {
  const {navigation} = props;
  const propertyData = props?.route?.params?.data;
  console.log(propertyData.image);
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [state, setState] = useState(
    dataState.find(item => item.value === propertyData.state),
  );
  const [city, setCity] = useState(null);
  const [area, setArea] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  console.log(propertyData.imageData);

  //@ts-ignore
  const {control, handleSubmit, getValues, setValue} = useForm<FormFieldsInp>({
    defaultValues: {},
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const onPublish = async () => {
    console.log('clicked!!');
    const formValues = getValues();
      navigation.navigate('EditSaleProperty1', {
        formValue1: {formValue1: formValues, imgData: selectedImages},
        propertyData: props.route.params.data,
        data: propertyData,
      });
  };

  const onErrors = async (data: any) => {
    console.log('Error in validation : ', data);
  };

  return (
    <ScrollView>
      <View style={styles.lineContainer}>
        <TouchableOpacity>
          <View style={styles.dot1} />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity>
          <View style={styles.dot2} />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity>
          <View style={styles.dot3} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '35%', marginLeft: 10}}>
          <Text style={{color: 'black', marginLeft: 10}}>Address</Text>
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
      <View
        style={{
          backgroundColor: COLORS.lightPink,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
        }}>
        {/* <View>
          <Text style={styles.header}>Upload Photos / Video</Text>
        </View> */}
        <View>
          <Text style={styles.header}>Address Details</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginLeft: 20}}>State </Text>
            <Text style={{color: COLORS.status_red}}>*</Text>
          </View>
          <View>
            <Controller
              name="state"
              control={control}
              defaultValue={propertyData?.state}
              rules={{
                required: {
                  value: true,
                  message: 'Select the state',
                },
              }}
              render={({
                field: {onChange, value},
                formState: {isSubmitted, errors},
                fieldState: {error},
              }) => {
                const handleStateSelection = item => {
                  console.log(item.label);
                  onChange(item?.label);
                  setState(item?.label); // Update the state here
                };

                return (
                  <>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        {
                          borderBottomColor:
                            isSubmitted && error ? 'red' : 'grey',
                        },
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={dataState}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select State"
                      searchPlaceholder="Search..."
                      value={value}
                      onChange={handleStateSelection}
                    />
                    {isSubmitted && error && (
                      <Text
                        style={{
                          color: 'red',
                          alignSelf: 'stretch',
                          marginLeft: 14,
                        }}>
                        {error?.message}
                      </Text>
                    )}
                  </>
                );
              }}
            />
          </View>

          {state ? (
            <>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginLeft: 20}}>City </Text>
                <Text style={{color: COLORS.status_red}}>*</Text>
              </View>
              <View>
                <Controller
                  name="city"
                  defaultValue={propertyData.city}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Select the city',
                    },
                  }}
                  render={({
                    field: {onChange, value},
                    formState: {isSubmitted, errors},
                    fieldState: {error},
                  }) => {
                    return (
                      <>
                        <Dropdown
                          style={[
                            styles.dropdown,
                            {
                              borderBottomColor:
                                isSubmitted && error ? 'red' : 'grey',
                            },
                          ]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          //@ts-ignore
                          data={state?.city}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select City"
                          searchPlaceholder="Search..."
                          // value={city}
                          value={value}
                          onChange={item => {
                            //@ts-ignore
                            onChange(item.label);
                            setCity(item);
                          }}
                        />
                        {isSubmitted && error && (
                          <Text
                            style={{
                              color: 'red',
                              alignSelf: 'stretch',
                              marginLeft: 14,
                            }}>
                            {error?.message}
                          </Text>
                        )}
                      </>
                    );
                  }}
                />
              </View>
            </>
          ) : null}

          <View style={{flexDirection: 'row'}}>
            <Text style={{marginLeft: 20}}>Street name / Number </Text>
            <Text style={{color: COLORS.status_red}}>*</Text>
          </View>

          <View style={styles.textInput}>
            <TextInput
              name="streetName"
              defaultValue={propertyData.streetName}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Street Name is required!',
                },
                validate: (value: string | any[]) =>
                  value.length > 60 ? 'Length should be less than 60' : null,
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginLeft: 20}}>
              Building name / House name / Number
            </Text>
            <Text style={{color: COLORS.status_red}}> *</Text>
          </View>
          <TextInput
            name="propertyName"
            defaultValue={propertyData.propertyName}
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Building Name is required!',
              },
              validate: (value: string | any[]) =>
                value.length > 60 ? 'Length should be less than 60' : null,
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 20}}>Floor Number </Text>
          <Text style={{color: COLORS.status_red}}>*</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            // defaultValue={}
            name="floorName"
            defaultValue={propertyData.floorName}
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Floor Name is required!',
              },
              validate: (value: string | any[]) =>
                value.length > 60 ? 'Length should be less than 60' : null,
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 20}}>PIN Code </Text>
          <Text style={{color: COLORS.status_red}}>*</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            name="pinCode"
            defaultValue={propertyData.pinCode}
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Pin Code is required!',
              },
              validate: (value: string | any[]) =>
                value.length > 60 ? 'Length should be less than 60' : null,
            }}
          />
        </View>
        <View>
          <CustomButton
            title="Save & Continue"
            backgroundColor={COLORS.btnColor}
            textColor={COLORS.white}
            paddingVertical={45}
            paddingHorizontal={9}
            marginVertical={HEIGHT / 25}
            marginHorizontal={WIDTH / 40}
            fontsize={16}
            fontWeight={900}
            borderColor={COLORS.black}
            // icon='../../assets/call-end.jpg'
            onPress={handleSubmit(onPublish, onErrors)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#BECDE2',
    marginBottom: 15,
    marginRight: 20,
    borderColor: 'black',
    marginTop: 20,
  },
  dot2: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#BECDE2',
    marginBottom: 15,
    borderColor: 'black',
    marginTop: 20,
  },
  dot1: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'black',
    marginLeft: 20,
    marginBottom: 15,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
  },
  dottedContainer: {
    borderWidth: 3,
    borderStyle: 'dotted',
    borderRadius: 5,
    borderColor: 'gray',
    margin: 10,
  },
  text1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'grey',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  header: {
    fontSize: 20,
    color: 'black',
    padding: 10,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textInput: {
    marginHorizontal: WIDTH / 600,
    backgroundColor: COLORS.lightPink,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  separator: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: 'red',
  },
});

export default EditSaleProperty0;
