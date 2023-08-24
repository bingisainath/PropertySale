import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';

import {WIDTH, COLORS, HEIGHT} from '../../constants/constants';
import CustomTextInput from '../../components/customTextInput/customTextInput';
import CustomButton from '../../components/customButton/customButton';
import {useForm, Controller} from 'react-hook-form';
import TextInput from '../../components/customTextInputWithReackHook/TextInput';

const SaleProperty1 = (props: any) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value: any) => {
    setSliderValue(value);
  };
  //@ts-ignore
  const {control, handleSubmit, getValues, setValue} = useForm<FormFieldsInp>({
    defaultValues: {},
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onPublish = async () => {
    console.log('clicked!!');
    const formValues = getValues();
    console.log('formValues', formValues);
    // setTimeout(() => {
    navigation.navigate('SaleProperty2', {
      formValue1: props.route.params.formValue1,
      formValue2: formValues,
    });
    // }, 5000);
  };
  const onErrors = async (data: any) => {
    console.log('Error in validation : ', data);
  };

  const {navigation} = props;
  const [salesType, setSalesType] = useState(null);
  //@ts-ignore
  const handleTypeSelection = (type, onChange) => {
    setSalesType(type);
    onChange(type);
  };
  console.log('sleected tuwoiksdnc', salesType);

  const SalesTypeButton = (
    //@ts-ignore
    {title, selected, onPress},
  ) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={[selected ? styles.selectedOption : styles.text]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const [propertyType, setPropertyType] = useState(null);

  //@ts-ignore
  const handlePropertySelection = (type, onChange) => {
    onChange(type);
    setPropertyType(type);
  };

  //@ts-ignore
  const PropertyTypeButton = ({title, selected, onPress}) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={[selected ? styles.selectedOption : styles.text]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const [bhkType, setBhkType] = useState(null);

  //@ts-ignore
  const handleBHKSelection = (type, onChange) => {
    onChange(type);
    setBhkType(type);
  };

  //@ts-ignore
  const BHKTypeButton = ({title, selected, onPress}) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={[selected ? styles.selectedOption : styles.text]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
  const [propertyConditionType, setPropertyConditionType] = useState(null);

  //@ts-ignore
  const handlePropertyConditionSelection = (type, onChange) => {
    onChange(type);
    setPropertyConditionType(type);
  };

  //@ts-ignore
  const PropertyConditionButton = ({title, selected, onPress}) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={[selected ? styles.selectedOption : styles.text]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
  const [availabilityType, setAvailabilityType] = useState(null);

  //@ts-ignore
  const handleAvailabilitySelection = (type, onChange) => {
    onChange(type);
    setAvailabilityType(type);
  };

  //@ts-ignore
  const AvailabilityButton = ({title, selected, onPress}) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={[selected ? styles.selectedOption : styles.text]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const [additionalConditionsType, setAdditionalConditionsType] =
    useState(null);

  //@ts-ignore
  const handleAdditionalConditionsSelection = (type, onChange) => {
    onChange(type);
    setAdditionalConditionsType(type);
  };

  //@ts-ignore
  const AdditionalConditionsButton = ({title, selected, onPress}) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={[selected ? styles.selectedOption : styles.text]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: COLORS.lightPink}}>
      <View style={styles.lineContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SaleProperty0')}>
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

      <View style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
        <Controller
          name="rent"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Select the Sales Type',
            },
          }}
          render={({
            field: {onChange, value},
            formState: {isSubmitted, errors},
            fieldState: {error},
          }) => {
            return (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.header]}>Sales Types</Text>
                  <Text style={[styles.star]}>*</Text>
                </View>
                <View style={[styles.wrap]}>
                  <SalesTypeButton
                    title="For Rent"
                    selected={salesType == 'rent'}
                    onPress={() => handleTypeSelection('rent', onChange)}
                  />
                  <SalesTypeButton
                    title="For Sale"
                    selected={salesType == 'sale'}
                    onPress={() => handleTypeSelection('sale', onChange)}
                  />
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
              </View>
            );
          }}
        />
        <Controller
          name="propertyType"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Select the Area',
            },
          }}
          render={({
            field: {onChange, value},
            formState: {isSubmitted, errors},
            fieldState: {error},
          }) => {
            return (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.header]}>Property Types</Text>
                  <Text style={[styles.star]}>*</Text>
                </View>
                <View style={[styles.wrap]}>
                  <PropertyTypeButton
                    title="Individual House"
                    selected={propertyType === 'Individual House'}
                    onPress={() =>
                      handlePropertySelection('Individual House', onChange)
                    }
                  />
                  <PropertyTypeButton
                    title="Apartment with balcony"
                    selected={propertyType === 'Apartment with balcony'}
                    onPress={() =>
                      handlePropertySelection(
                        'Apartment with balcony',
                        onChange,
                      )
                    }
                  />
                  <PropertyTypeButton
                    title="PG"
                    selected={propertyType === 'PG'}
                    onPress={() => handlePropertySelection('PG', onChange)}
                  />
                  <PropertyTypeButton
                    title="Villa"
                    selected={propertyType === 'Villa'}
                    onPress={() => handlePropertySelection('Villa', onChange)}
                  />
                  <PropertyTypeButton
                    title="Apartment"
                    selected={propertyType === 'Apartment'}
                    onPress={() =>
                      handlePropertySelection('Apartment', onChange)
                    }
                  />
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
              </View>
            );
          }}
        />
        <Controller
          name="numberOfRooms"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Select the BHK',
            },
          }}
          render={({
            field: {onChange, value},
            formState: {isSubmitted, errors},
            fieldState: {error},
          }) => {
            return (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.header]}>BHK Types</Text>
                  <Text style={[styles.star]}>*</Text>
                </View>
                <View style={[styles.wrap]}>
                  <BHKTypeButton
                    title="1RK"
                    selected={bhkType === '1RK'}
                    onPress={() => handleBHKSelection('1RK', onChange)}
                  />
                  <BHKTypeButton
                    title="1BHK"
                    selected={bhkType === '1BHK'}
                    onPress={() => handleBHKSelection('1BHK', onChange)}
                  />
                  <BHKTypeButton
                    title="2BHK"
                    selected={bhkType === '2BHK'}
                    onPress={() => handleBHKSelection('2BHK', onChange)}
                  />
                  <BHKTypeButton
                    title="3BHK"
                    selected={bhkType === '3BHK'}
                    onPress={() => handleBHKSelection('3BHK', onChange)}
                  />

                  <BHKTypeButton
                    title="4BHK+"
                    selected={bhkType === '4BHK+'}
                    onPress={() => handleBHKSelection('4BHK+', onChange)}
                  />
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
              </View>
            );
          }}
        />
        <Controller
          name="propertyCondition"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Select the Property Condition type',
            },
          }}
          render={({
            field: {onChange, value},
            formState: {isSubmitted, errors},
            fieldState: {error},
          }) => {
            return (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.header]}>Property Condition</Text>
                  <Text style={[styles.star]}>*</Text>
                </View>
                <View style={[styles.wrap]}>
                  <PropertyConditionButton
                    title="Fully Furnished"
                    selected={propertyConditionType === 'Fully Furnished'}
                    onPress={() =>
                      handlePropertyConditionSelection(
                        'Fully Furnished',
                        onChange,
                      )
                    }
                  />
                  <PropertyConditionButton
                    title="Semi Furnished"
                    selected={propertyConditionType === 'Semi Furnished'}
                    onPress={() =>
                      handlePropertyConditionSelection(
                        'Semi Furnished',
                        onChange,
                      )
                    }
                  />
                  <PropertyConditionButton
                    title="Unfurnished"
                    selected={propertyConditionType === 'Unfurnished'}
                    onPress={() =>
                      handlePropertyConditionSelection('Unfurnished', onChange)
                    }
                  />
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
              </View>
            );
          }}
        />
        <Controller
          name="Availability"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Select the Availability',
            },
          }}
          render={({
            field: {onChange, value},
            formState: {isSubmitted, errors},
            fieldState: {error},
          }) => {
            return (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.header]}>Availability</Text>
                  <Text style={[styles.star]}>*</Text>
                </View>
                <View style={[styles.wrap]}>
                  <AvailabilityButton
                    title="Immediate"
                    selected={availabilityType === 'Immediate'}
                    onPress={() =>
                      handleAvailabilitySelection('Immediate', onChange)
                    }
                  />
                  <AvailabilityButton
                    title="With in 15 Days"
                    selected={availabilityType === 'With in 15 Days'}
                    onPress={() =>
                      handleAvailabilitySelection('With in 15 Days', onChange)
                    }
                  />
                  <AvailabilityButton
                    title="With in 30 days"
                    selected={availabilityType === 'With in 30 days'}
                    onPress={() =>
                      handleAvailabilitySelection('With in 30 days', onChange)
                    }
                  />
                  <AvailabilityButton
                    title="After 30 days"
                    selected={availabilityType === 'After 30 days'}
                    onPress={() =>
                      handleAvailabilitySelection('After 30 days', onChange)
                    }
                  />
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
              </View>
            );
          }}
        />
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.header]}>Square Feet</Text>
            <Text style={[styles.star]}>*</Text>
          </View>
          <View style={styles.textInput}>
            <TextInput
              name="sqFeet"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Enter the Sq feets',
                },
                validate: (value: string | any[]) =>
                  value.length > 60 ? 'Length should be less than 60' : null,
              }}
              placeHolder="Enter you Area in Sq feets"
            />
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.header]}>Expected Price</Text>
            <Text style={[styles.star]}>*</Text>
          </View>
          <View style={styles.textInput}>
            <TextInput
              name="price"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Enter the expected Price',
                },
                validate: (value: string | any[]) =>
                  value.length > 60 ? 'Length should be less than 60' : null,
              }}
              placeHolder="Enter the expected Price "
            />
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.header]}>Property Age</Text>
            <Text style={[styles.star]}>*</Text>
          </View>
          <Controller
            name="slider"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Select the Slider',
              },
            }}
            render={({
              field: {onChange, value},
              formState: {isSubmitted, errors},
              fieldState: {error},
            }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Slider Value: {sliderValue}</Text>
                  <Slider
                    style={{width: '80%', marginTop: 20}}
                    minimumValue={0}
                    maximumValue={50}
                    minimumTrackTintColor="#1F427F"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#1F427F"
                    value={sliderValue}
                    step={1}
                    onValueChange={value => {
                      handleSliderChange(value), onChange(value);
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
                </View>
              );
            }}
          />
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.header]}>Property Description</Text>
            <Text style={[styles.star]}>*</Text>
          </View>
          <View style={styles.textInput}>
            <TextInput
              name="description"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Enter the Property Description',
                },
                validate: (value: string | any[]) =>
                  value.length > 60 ? 'Length should be less than 60' : null,
              }}
              placeHolder="Enter the Property Description"
            />
          </View>
        </View>
        <Controller
          name="additionalConditions"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Select the Additional Conditions',
            },
          }}
          render={({
            field: {onChange},
            formState: {isSubmitted},
            fieldState: {error},
          }) => {
            return (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.header]}>Additional Conditions</Text>
                  <Text style={[styles.star]}>*</Text>
                </View>
                <View style={[styles.wrap]}>
                  <AdditionalConditionsButton
                    title="Bachelor Allowed"
                    selected={additionalConditionsType === 'Bachelor Allowed'}
                    onPress={() =>
                      handleAdditionalConditionsSelection(
                        'Bachelor Allowed',
                        onChange,
                      )
                    }
                  />
                  <AdditionalConditionsButton
                    title="Family Only"
                    selected={additionalConditionsType === 'Family Only'}
                    onPress={() =>
                      handleAdditionalConditionsSelection(
                        'Family Only',
                        onChange,
                      )
                    }
                  />
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
              </View>
            );
          }}
        />
        <View>
          <View style={{flexDirection: 'row'}}>
            <CustomButton
              title="Previous"
              backgroundColor={COLORS.lightPink}
              textColor={COLORS.black}
              paddingVertical={50}
              paddingHorizontal={9}
              marginVertical={HEIGHT / 25}
              marginHorizontal={WIDTH / 15}
              fontsize={16}
              fontWeight={900}
              borderColor={COLORS.black}
              // icon='../../assets/call-end.jpg'
              onPress={() => navigation.navigate('SaleProperty0')}
            />
            <CustomButton
              title="Next"
              backgroundColor={COLORS.lightPink}
              textColor={COLORS.black}
              paddingVertical={53}
              paddingHorizontal={7}
              marginVertical={HEIGHT / 25}
              marginHorizontal={WIDTH / 20}
              fontsize={16}
              fontWeight={900}
              borderColor={COLORS.black}
              // icon='../../assets/call-end.jpg'
              onPress={handleSubmit(onPublish, onErrors)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SaleProperty1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#BECDE2',
    fontFamily: 'Helvetica',
    color: 'black',
    backgroundColor: 'white',
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  stickyBottom: {
    backgroundColor: COLORS.white,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#BECDE2',
    padding: 2,
    paddingBottom: 3,
  },
  stickyText: {
    color: '#BECDE2',
    padding: 2,
    fontSize: 16,
    margin: 1,
  },
  selectedOption: {
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#BECDE2',
    fontFamily: 'Helvetica',
    color: 'black',
    // backgroundColor: '#EBF4E8',
    backgroundColor: '#DEEDFF',
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    padding: 10,
  },
  star: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'red',
    paddingTop: 10,
  },
  selectedText: {
    color: 'black',
    backgroundColor: '#EBF4E8',
  },
  textInput: {
    backgroundColor: COLORS.lightPink,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft:5
  },
  track: {
    backgroundColor: '#BECDE2',
    height: 3,
    borderRadius: 1.5,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#EBF4E8',
    // backgroundColor: '#EBF4E8',
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
    backgroundColor: 'black',
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
