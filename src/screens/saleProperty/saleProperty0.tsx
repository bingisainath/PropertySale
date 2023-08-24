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
import {HEIGHT, WIDTH, COLORS} from '../../constants/constants';
import {Dropdown} from 'react-native-element-dropdown';
import CustomTextInput from '../../components/customTextInput/customTextInput';
import CustomButton from '../../components/customButton/customButton';
import {useForm, Controller} from 'react-hook-form';
import TextInput from '../../components/customTextInputWithReackHook/TextInput';

import takeFromGallery from '../../components/Gallery/galley';
import openCamera from '../../components/Camera/camera';
import {upload} from '../../components/uploadMedia/upload';
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

const dataArea = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const SaleProperty = (props: any) => {
  const {navigation} = props;

  const dispatch = useDispatch();

  const [selectedImages, setSelectedImages] = useState([]);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [area, setArea] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  //@ts-ignore
  const {control, handleSubmit, getValues, setValue} = useForm<FormFieldsInp>({
    defaultValues: {},
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const openCamera1 = async (mediaType: any, onChange: any) => {
    const imgData = await openCamera(mediaType);
    //@ts-ignore
    setSelectedImages([...selectedImages, ...imgData]);
    onChange([...selectedImages, ...imgData]);
  };

  const openGallery = async (mediaType: any, onChange: any) => {
    const imgData = await takeFromGallery(mediaType);
    //@ts-ignore
    [...selectedImages, ...imgData];
    //@ts-ignore
    setSelectedImages([...selectedImages, ...imgData]);
  };

  const onPublish = async () => {
    console.log('clicked!!');
    // setLoading(true);
    const formValues = getValues();
    console.log('formValues', formValues);

    // await delay();
    // setTimeout(() => {
    // setLoading(false);
    navigation.navigate('SaleProperty1', {
      formValue1: {formValue1: formValues, imgData: selectedImages},
    });
    // }, 2000);
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
      <View
        style={{
          backgroundColor: COLORS.lightPink,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
        }}>
        <View>
          <Text style={styles.header}>Upload Photos / Video</Text>
        </View>
        <Controller
          name="image"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Select the Image/Video',
            },
          }}
          render={({
            field: {onChange},
            formState: {isSubmitted},
            fieldState: {error},
          }) => {
            return (
              <>
                <View style={styles.dottedContainer}>
                  <ScrollView contentContainerStyle={styles.scrollView}>
                    {selectedImages.map((image, index) => (
                      <Image
                        key={index}
                        //@ts-ignore
                        source={{uri: image.path}}
                        style={styles.image}
                      />
                    ))}
                  </ScrollView>
                  <View>
                    {selectedImages.length === 0 ? (
                      <View
                        style={{
                          paddingTop: 80,
                          paddingBottom: 80,
                          paddingLeft: 20,
                        }}>
                        <View style={{flexDirection: 'row',width:'100%'}}>
                          <View
                            style={{
                              borderWidth: 1,
                              padding: 7,
                              borderRadius: 10,
                              width:'45%'
                            }}>
                            <Text style={styles.text1}>Photo</Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <TouchableOpacity
                                onPress={() => openCamera1('photo', onChange)}
                                style={{padding: 2}}>
                                <Text style={styles.text}>Camera</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => openGallery('photo', onChange)}
                                style={{padding: 2, marginLeft: 20}}>
                                <Text style={styles.text}>Gallery</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View
                            style={{
                              marginLeft: 10,
                              borderWidth: 1,
                              padding: 7,
                              borderRadius: 10,
                              width:'45%'
                            }}>
                            <Text style={styles.text1}>Video</Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <TouchableOpacity
                                onPress={() => openCamera1('vedio', onChange)}
                                style={{padding: 2}}>
                                <Text style={styles.text}>Camera</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => openGallery('vedio', onChange)}
                                style={{padding: 2, marginLeft: 20}}>
                                <Text style={styles.text}>Gallery</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          paddingTop: 20,
                          paddingBottom: 20,
                          paddingLeft: 20,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              borderWidth: 1,
                              padding: 7,
                              borderRadius: 10,
                            }}>
                            <Text style={styles.text1}>Photo</Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <TouchableOpacity
                                onPress={() =>
                                  //@ts-ignore
                                  openCamera1('photo')
                                }
                                style={{padding: 2}}>
                                <Text style={styles.text}>Camera</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() =>
                                  //@ts-ignore
                                  openGallery('photo')
                                }
                                style={{padding: 2, marginLeft: 20}}>
                                <Text style={styles.text}>Gallery</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View
                            style={{
                              marginLeft: 10,
                              borderWidth: 1,
                              padding: 7,
                              borderRadius: 10,
                            }}>
                            <Text style={styles.text1}>Video</Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <TouchableOpacity
                                onPress={() =>
                                  //@ts-ignore
                                  openCamera1('video')
                                }
                                style={{padding: 2}}>
                                <Text style={styles.text}>Camera</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() =>
                                  //@ts-ignore
                                  openGallery('video')
                                }
                                style={{padding: 2, marginLeft: 20}}>
                                <Text style={styles.text}>Gallery</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
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
                      value={state}
                      onChange={item => {
                        //@ts-ignore
                        console.log(item.label);
                        onChange(item?.label);
                        //@ts-ignore
                        setState(item);
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

          {state ? (
            <>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginLeft: 20}}>City </Text>
                <Text style={{color: COLORS.status_red}}>*</Text>
              </View>
              <View>
                <Controller
                  name="city"
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
                          //@ts-ignore
                          value={state?.city}
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
            name="floorName"
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
    fontSize: 14,
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

export default SaleProperty;
