import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';

import {WIDTH, COLORS, HEIGHT} from '../../../constants/constants';
import CustomTextInput from '../../../components/customTextInput/customTextInput';
import CustomButton from '../../../components/customButton/customButton';
import {useForm, Controller} from 'react-hook-form';
import TextInput from '../../../components/customTextInputWithReackHook/TextInput';

const EditSaleProperty1 = (props: any) => {
  console.log(
    '================ console.log(props.route.params.formValue1); ====================',
  );
  console.log(props.route.params.data);
  console.log('====================================');
  const propertyData = props?.route?.params?.data;
  const [sliderValue, setSliderValue] = useState(propertyData?.slider);

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
    console.log('allData', props.route.params.formValue1);
    // setTimeout(() => {
    navigation.navigate('EditSaleProperty2', {
      formValue1: props.route.params.formValue1,
      formValue2: formValues,
      data: propertyData,
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

  //@ts-ignore
  const SalesTypeButton = ({title, selected, onPress}) => (
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
  console.log('sleected tuwoiksdnc', propertyType);

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
          defaultValue={propertyData.rent}
          rules={{
            required: {
              value: true,
              message: 'Select the Sales Type',
            },
          }}
          render={({
            field: {onChange, value},
            formState: {isSubmitted},
            fieldState: {error},
          }) => {
            const handleTypeSelection = selectedValue => {
              onChange(selectedValue); // Update the selected value
            };

            return (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.header]}>Sales Types</Text>
                  <Text style={[styles.star]}>*</Text>
                </View>
                <View style={[styles.wrap]}>
                  <SalesTypeButton
                    title="For Rent"
                    selected={value === 'rent'} // Compare with the default value
                    onPress={() => handleTypeSelection('rent', onChange)}
                  />
                  <SalesTypeButton
                    title="For Sale"
                    selected={value === 'sale'} // Compare with the default value
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
          defaultValue={propertyData.propertyType}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Select the Area',
            },
          }}
          render={({
            field: {onChange, value},
            formState: {isSubmitted},
            fieldState: {error},
          }) => {
            const handlePropertySelection = selectedValue => {
              onChange(selectedValue); // Update the selected value
            };

            return (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.header]}>Property Types</Text>
                  <Text style={[styles.star]}>*</Text>
                </View>
                <View style={[styles.wrap]}>
                  <PropertyTypeButton
                    title="Individual House"
                    selected={value === 'Individual House'} // Compare with the default value
                    onPress={() =>
                      handlePropertySelection('Individual House', onChange)
                    }
                  />
                  <PropertyTypeButton
                    title="Apartment with balcony"
                    selected={value === 'Apartment with balcony'} // Compare with the default value
                    onPress={() =>
                      handlePropertySelection(
                        'Apartment with balcony',
                        onChange,
                      )
                    }
                  />
                  <PropertyTypeButton
                    title="PG"
                    selected={value === 'PG'} // Compare with the default value
                    onPress={() => handlePropertySelection('PG', onChange)}
                  />
                  <PropertyTypeButton
                    title="Villa"
                    selected={value === 'Villa'} // Compare with the default value
                    onPress={() => handlePropertySelection('Villa', onChange)}
                  />
                  <PropertyTypeButton
                    title="Apartment"
                    selected={value === 'Apartment'} // Compare with the default value
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
          defaultValue={propertyData.numberOfRooms}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Select the BHK',
            },
          }}
          render={({
            field: {onChange, value},
            formState: {isSubmitted},
            fieldState: {error},
          }) => {
            const handleBHKSelection = selectedValue => {
              onChange(selectedValue); // Update the selected value
            };

            return (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.header]}>BHK Types</Text>
                  <Text style={[styles.star]}>*</Text>
                </View>
                <View style={[styles.wrap]}>
                  <BHKTypeButton
                    title="1RK"
                    selected={value === '1RK'} // Compare with the default value
                    onPress={() => handleBHKSelection('1RK', onChange)}
                  />
                  <BHKTypeButton
                    title="1BHK"
                    selected={value === '1BHK'} // Compare with the default value
                    onPress={() => handleBHKSelection('1BHK', onChange)}
                  />
                  <BHKTypeButton
                    title="2BHK"
                    selected={value === '2BHK'} // Compare with the default value
                    onPress={() => handleBHKSelection('2BHK', onChange)}
                  />
                  <BHKTypeButton
                    title="3BHK"
                    selected={value === '3BHK'} // Compare with the default value
                    onPress={() => handleBHKSelection('3BHK', onChange)}
                  />
                  <BHKTypeButton
                    title="4BHK+"
                    selected={value === '4BHK+'} // Compare with the default value
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
          defaultValue={propertyData.propertyCondition}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Select the Property Condition type',
            },
          }}
          render={({
            field: {onChange, value},
            formState: {isSubmitted},
            fieldState: {error},
          }) => {
            const handlePropertyConditionSelection = selectedValue => {
              onChange(selectedValue); // Update the selected value
            };

            return (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.header]}>Property Condition</Text>
                  <Text style={[styles.star]}>*</Text>
                </View>
                <View style={[styles.wrap]}>
                  <PropertyConditionButton
                    title="Fully Furnished"
                    selected={value === 'Fully Furnished'} // Compare with the default value
                    onPress={() =>
                      handlePropertyConditionSelection('Fully Furnished')
                    }
                  />
                  <PropertyConditionButton
                    title="Semi Furnished"
                    selected={value === 'Semi Furnished'} // Compare with the default value
                    onPress={() =>
                      handlePropertyConditionSelection('Semi Furnished')
                    }
                  />
                  <PropertyConditionButton
                    title="Unfurnished"
                    selected={value === 'Unfurnished'} // Compare with the default value
                    onPress={() =>
                      handlePropertyConditionSelection('Unfurnished')
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
          defaultValue={propertyData?.Availability}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Select the Availability',
            },
          }}
          render={({
            field: {onChange, value},
            formState: {isSubmitted},
            fieldState: {error},
          }) => {
            const handleAvailabilitySelection = selectedValue => {
              onChange(selectedValue); // Update the selected value
            };

            return (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.header]}>Availability</Text>
                  <Text style={[styles.star]}>*</Text>
                </View>
                <View style={[styles.wrap]}>
                  <AvailabilityButton
                    title="Immediate"
                    selected={value === 'Immediate'} // Compare with the default value
                    onPress={() =>
                      handleAvailabilitySelection('Immediate', onChange)
                    }
                  />
                  <AvailabilityButton
                    title="Within 15 Days"
                    selected={value === 'Within 15 Days'} // Compare with the default value
                    onPress={() =>
                      handleAvailabilitySelection('Within 15 Days', onChange)
                    }
                  />
                  <AvailabilityButton
                    title="Within 30 Days"
                    selected={value === 'Within 30 Days'} // Compare with the default value
                    onPress={() =>
                      handleAvailabilitySelection('Within 30 Days', onChange)
                    }
                  />
                  <AvailabilityButton
                    title="After 30 Days"
                    selected={value === 'After 30 Days'} // Compare with the default value
                    onPress={() =>
                      handleAvailabilitySelection('After 30 Days', onChange)
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
              defaultValue={propertyData?.sqFeet}
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
              defaultValue={propertyData?.price}
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
          {/* <View style={{flexDirection: 'row'}} /> */}
          <Controller
            name="slider"
            control={control}
            defaultValue={propertyData.slider}
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
              defaultValue={propertyData.description}
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
          defaultValue={propertyData?.additionalConditions} // Set the default value here
          rules={{
            required: {
              value: true,
              message: 'Select the Additional Conditions',
            },
          }}
          render={({
            field: {onChange, value},
            formState: {isSubmitted},
            fieldState: {error},
          }) => {
            const handleAdditionalConditionsSelection = selectedValue => {
              onChange(selectedValue); // Update the selected value
            };

            return (
              <View style={{}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.header]}>Additional Conditions</Text>
                  <Text style={[styles.star]}>*</Text>
                </View>
                <View style={[styles.wrap]}>
                  <AdditionalConditionsButton
                    title="Bachelor Allowed"
                    selected={value === 'Bachelor Allowed'} // Compare with the default value
                    onPress={() =>
                      handleAdditionalConditionsSelection('Bachelor Allowed')
                    }
                  />
                  <AdditionalConditionsButton
                    title="Family Only"
                    selected={value === 'Family Only'} // Compare with the default value
                    onPress={() =>
                      handleAdditionalConditionsSelection('Family Only')
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
              marginHorizontal={WIDTH / 20}
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
              paddingHorizontal={6.5}
              marginVertical={HEIGHT / 25}
              marginHorizontal={WIDTH / 10}
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

export default EditSaleProperty1;

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
    backgroundColor: '#EBF4E8',
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
    marginLeft:8
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
