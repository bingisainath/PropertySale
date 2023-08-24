import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomTextInput from '../../components/customTextInput/customTextInput';
import CustomButton from '../../components/customButton/customButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HEIGHT, WIDTH, COLORS} from '../../constants/constants';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchResultsDataRequest, filterRequest} from '../../redux/userActions';

const Tab = createMaterialTopTabNavigator();

const Residency = () => {
  const location = useSelector((state: any) => state.location);

  const dispatch = useDispatch();

  const handleSlider1ValuesChange = (values: any) => {
    setSlider1Value(values);
    setPriceRangeFilter(values);
  };

  const handleSlider2ValuesChange = (values: any) => {
    setSlider2Value(values);
    setSqFeetFilter(values);
  };

  const allPropertyTypes = [
    'PG',
    'Individual House',
    'Apartment',
    'Villa',
    'Apartment with balcony',
  ];
  const allBhkTypes = ['1RK', '1BHK', '2BHK', '3BHK', '4BHK+'];
  const allPropertyCondition = [
    'Fully Furnished',
    'Semi furnished',
    'Unfurnished',
  ];
  const defaultPriceRange = [5000, 10000000];
  const defaultSqFeet = [500, 2000];

  const cityFilter = [location];

  const [propertyTypesFilter, setPropertyTypesFilter] = useState([]);
  const [bhkFilter, setBhkFilter] = useState([]);
  const [propertyConditionFilter, setPropertyConditionFilter] = useState([]);
  const [PriceRangeFilter, setPriceRangeFilter] = useState([5000, 10000000]);
  const [SqFeetFilter, setSqFeetFilter] = useState([500, 2000]);
  const [slider1Value, setSlider1Value] = useState([5000, 10000000]);
  const [slider2Value, setSlider2Value] = useState([500, 2000]);

  useEffect(() => {
    const city = [
      'Mumbai',
      'Pune',
      'Chennai',
      'Delhi',
      'Bangalore',
      'Kolkata',
      'Jaipur',
      'Lucknow',
      'Ahmedabad',
      'Goa',
      'Hyderabad',
    ];

    const locationFilter = [location];

    const filters = [
      locationFilter,
      propertyConditionFilter,
      bhkFilter,
      PriceRangeFilter,
      SqFeetFilter,
      propertyTypesFilter,
    ];
    dispatch(filterRequest(filters));
  }, [
    propertyTypesFilter,
    bhkFilter,
    propertyConditionFilter,
    PriceRangeFilter,
    SqFeetFilter,
  ]);

  const handlePropertyType = (item: any) => {
    //@ts-ignore
    const isSelected = propertyTypesFilter.includes(item);
    if (isSelected) {
      setPropertyTypesFilter(
        propertyTypesFilter.filter(selectedItem => selectedItem !== item),
      );
    } else {
      //@ts-ignore
      setPropertyTypesFilter([...propertyTypesFilter, item]);
    }
  };
  const handleBhkTypes = (item: any) => {
    //@ts-ignore
    const isSelected = bhkFilter.includes(item);

    if (isSelected) {
      setBhkFilter(bhkFilter.filter(selectedItem => selectedItem !== item));
    } else {
      //@ts-ignore
      setBhkFilter([...bhkFilter, item]);
    }
  };

  const handlePropertyCondition = (item: any) => {
    //@ts-ignore
    const isSelected = propertyConditionFilter.includes(item);

    if (isSelected) {
      setPropertyConditionFilter(
        propertyConditionFilter.filter(selectedItem => selectedItem !== item),
      );
    } else {
      //@ts-ignore
      setPropertyConditionFilter([...propertyConditionFilter, item]);
    }
  };

  return (
    <View>
      <View>
        <Text style={[styles.header]}> Property Types</Text>
        <View style={[styles.wrap]}>
          <TouchableOpacity
            onPress={() => handlePropertyType('Individual House')}>
            {
              //@ts-ignore
              propertyTypesFilter.includes('Individual House') ? (
                <View style={styles.selectedOptionContainer}>
                  <Text style={styles.selectedOption}>Individual House</Text>
                  <View style={styles.iconStyle}>
                    <Icon name="close" size={20} color="gray" />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>Individual House</Text>
              )
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePropertyType('Apartment')}>
            {
              //@ts-ignore
              propertyTypesFilter.includes('Apartment') ? (
                <View style={styles.selectedOptionContainer}>
                  <Text style={styles.selectedOption}>Apartment</Text>
                  <View style={styles.iconStyle}>
                    <Icon name="close" size={20} color="gray" />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>Apartment</Text>
              )
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePropertyType('Villa')}>
            {
              //@ts-ignore
              propertyTypesFilter.includes('Villa') ? (
                <View style={styles.selectedOptionContainer}>
                  <Text style={styles.selectedOption}>Villa</Text>
                  <View style={styles.iconStyle}>
                    <Icon name="close" size={20} color="gray" />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>Villa</Text>
              )
            }
            {/* <Text
              style={
                //@ts-ignore
                propertyTypesFilter.includes('Villa')
                  ? styles.selectedOption
                  : styles.text
              }>
              Villa
            </Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePropertyType('PG')}>
            {
              //@ts-ignore
              propertyTypesFilter.includes('PG') ? (
                <View style={styles.selectedOptionContainer}>
                  <Text style={styles.selectedOption}>PG</Text>
                  <View style={styles.iconStyle}>
                    <Icon name="close" size={20} color="gray" />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>PG</Text>
              )
            }
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePropertyType('Apartment with balcony')}>
            {
              //@ts-ignore
              propertyTypesFilter.includes('Apartment with balcony') ? (
                <View style={styles.selectedOptionContainer}>
                  <Text style={styles.selectedOption}>
                    Apartment with balcony
                  </Text>
                  <View style={styles.iconStyle}>
                    <Icon name="close" size={20} color="gray" />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>Apartment with balcony</Text>
              )
            }
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={[styles.header]}> BHK Types</Text>
        <View style={[styles.wrap]}>
          <TouchableOpacity onPress={() => handleBhkTypes('1RK')}>
            {
              //@ts-ignore
              bhkFilter.includes('1RK') ? (
                <View style={styles.selectedOptionContainer}>
                  <Text style={styles.selectedOption}>1RK</Text>
                  <View style={styles.iconStyle}>
                    <Icon name="close" size={20} color="gray" />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>1RK</Text>
              )
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBhkTypes('1BHK')}>
            {
              //@ts-ignore
              bhkFilter.includes('1BHK') ? (
                <View style={styles.selectedOptionContainer}>
                  <Text style={styles.selectedOption}>1BHK</Text>
                  <View style={styles.iconStyle}>
                    <Icon name="close" size={20} color="gray" />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>1BHK</Text>
              )
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBhkTypes('2BHK')}>
            {
              //@ts-ignore
              bhkFilter.includes('2BHK') ? (
                <View style={styles.selectedOptionContainer}>
                  <Text style={styles.selectedOption}>2BHK</Text>
                  <View style={styles.iconStyle}>
                    <Icon name="close" size={20} color="gray" />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>2BHK</Text>
              )
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBhkTypes('3BHK')}>
            {
              //@ts-ignore
              bhkFilter.includes('3BHK') ? (
                <View style={styles.selectedOptionContainer}>
                  <Text style={styles.selectedOption}>3BHK</Text>
                  <View style={styles.iconStyle}>
                    <Icon name="close" size={20} color="gray" />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>3BHK</Text>
              )
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBhkTypes('4BHK+')}>
            {
              //@ts-ignore
              bhkFilter.includes('4BHK+') ? (
                <View style={styles.selectedOptionContainer}>
                  <Text style={styles.selectedOption}>4BHK+</Text>
                  <View style={styles.iconStyle}>
                    <Icon name="close" size={20} color="gray" />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>4BHK+</Text>
              )
            }
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={[styles.header]}> Property Condition</Text>
        <View style={[styles.wrap]}>
          <TouchableOpacity
            onPress={() => handlePropertyCondition('Fully Furnished')}>
            {
              //@ts-ignore
              propertyConditionFilter.includes('Fully Furnished') ? (
                <View style={styles.selectedOptionContainer}>
                  <Text style={styles.selectedOption}>Fully Furnished</Text>
                  <View style={styles.iconStyle}>
                    <Icon name="close" size={20} color="gray" />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>Fully Furnished</Text>
              )
            }
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePropertyCondition('Semi Furnished')}>
            {
              //@ts-ignore
              propertyConditionFilter.includes('Semi Furnished') ? (
                <View style={styles.selectedOptionContainer}>
                  <Text style={styles.selectedOption}>Semi Furnished</Text>
                  <View style={styles.iconStyle}>
                    <Icon name="close" size={20} color="gray" />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>Semi Furnished</Text>
              )
            }
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePropertyCondition('Unfurnished')}>
            {
              //@ts-ignore
              propertyConditionFilter.includes('Unfurnished') ? (
                <View style={styles.selectedOptionContainer}>
                  <Text style={styles.selectedOption}>Unfurnished</Text>
                  <View style={styles.iconStyle}>
                    <Icon name="close" size={20} color="gray" />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>Unfurnished</Text>
              )
            }
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.header]}> Price Range</Text>
          <View>
            <View style={{padding: 2, marginLeft: 15}}>
              <Text>
                Selected Range: {slider1Value[0]} - {slider1Value[1]}
              </Text>
              <MultiSlider
                values={slider1Value}
                sliderLength={350}
                onValuesChange={handleSlider1ValuesChange}
                min={5000}
                max={10000000}
                step={1}
                allowOverlap={false}
                snapped
                trackStyle={styles.track}
                selectedStyle={{backgroundColor: '#BECDE2'}}
                unselectedStyle={{backgroundColor: '#BECDE2'}}
                markerStyle={styles.thumb}
              />
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.header]}> Sq Feets</Text>
        <View>
          <View style={{padding: 2, marginLeft: 15}}>
            <Text>
              Selected Range: {slider2Value[0]} sq.ft - {slider2Value[1]} sq.ft
            </Text>
            <MultiSlider
              values={slider2Value}
              sliderLength={350}
              onValuesChange={handleSlider2ValuesChange}
              min={500}
              max={2000}
              step={10}
              allowOverlap={false}
              snapped
              trackStyle={styles.track}
              selectedStyle={{backgroundColor: '#BECDE2'}}
              unselectedStyle={{backgroundColor: '#BECDE2'}}
              markerStyle={styles.thumb}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const Search = (props: any) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const location = useSelector((state: any) => state.location);

  const filterParameters = useSelector((state: any) => state.filterParameters);

  const {navigation} = props;

  const [propertyType, setPropertyType] = useState(true);

  const handleResults = async (bool: boolean) => {
    dispatch(searchResultsDataRequest(filterParameters));

    navigation.navigate('SearchResults');
  };

  return (
    <View>
      <ScrollView style={{height: '85%', backgroundColor: COLORS.lightPink}}>
        <Residency />
      </ScrollView>

      <View style={styles.stickyBottom}>
        <View>
          <CustomButton
            title="View Results"
            backgroundColor={COLORS.btnColor}
            textColor={COLORS.white}
            paddingVertical={56}
            paddingHorizontal={9}
            marginVertical={HEIGHT / 25}
            marginHorizontal={WIDTH / 35}
            fontsize={16}
            fontWeight={900}
            borderColor={COLORS.black}
            // icon='../../assets/call-end.jpg'
            onPress={handleResults}
          />
        </View>
      </View>
    </View>
  );
};

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
    backgroundColor: COLORS.lightPink,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#BECDE2',
    padding: 2,
  },
  stickyText: {
    color: '#BECDE2',
    padding: 2,
    fontSize: 16,
    margin: 1,
  },
  selectedOptionContainer: {
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#BECDE2',
    fontFamily: 'Helvetica',
    color: 'black',
    // backgroundColor: '#EBF4E8',
    backgroundColor: '#DEEDFF',
    textAlign: 'center',
    margin: 10,
    flexDirection: 'row',
  },
  selectedOption: {
    padding: 10,
    fontSize: 16,
    paddingRight:5
  },
  iconStyle: {
    marginTop: 9,
    marginRight:5
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    padding: 10,
  },
  selectedText: {
    color: 'black',
    backgroundColor: '#EBF4E8',
  },
  textInput: {
    marginHorizontal: WIDTH / 600,
    backgroundColor: '#FAF9F8',
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    // backgroundColor: '#EBF4E8',
    backgroundColor: '#DEEDFF',
  },
});

export default Search;
