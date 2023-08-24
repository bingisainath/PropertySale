import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CustomTextInput from '../../components/customTextInput/customTextInput';
import CustomButton from '../../components/customButton/customButton';
import {HEIGHT, WIDTH, COLORS} from '../../constants/constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

import {wishListDataRequest} from '../../redux/userActions';
import {useDispatch, useSelector} from 'react-redux';

const ViewScreen = (props: any) => {
  const user = auth().currentUser;

  const {navigation} = props;

  const dispatch = useDispatch();

  const ack = useSelector((state: any) => state.ack);

  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);

  //@ts-ignore
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{uri: item}} style={styles.image} />
        {activeSlideIndex === index && (
          <Pagination
            dotsLength={props.route.params.data.imageData.length}
            activeDotIndex={activeSlideIndex}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            inactiveDotOpacity={1}
            inactiveDotScale={0.4}
            inactiveDotStyle={styles.inactiveDot}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{flex:1,backgroundColor: COLORS.lightBlue}}>
      <View style={{flex:1,marginLeft:20,marginRight:20}}>
        {/* <ScrollView  style={{backgroundColor: 'blue',flex:1}}> */}
          <View style={styles.container}>
            <Carousel
              data={props.route.params.data.imageData}
              renderItem={renderItem}
              sliderWidth={500}
              itemWidth={400}
              onSnapToItem={(index: any) => setActiveSlideIndex(index)}
            />
          </View>
          <ScrollView nestedScrollEnabled={true} style={{flex:1}}>
            <View >
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      width: '100%',
                      // paddingLeft: 12,
                    }}>
                    <View style={{}}>
                      <Text style={[styles.textHeader, {margin: 10}]}>
                        {props.route.params.data.propertyName}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.wrap]}>
                  <TouchableOpacity>
                    <Text style={[styles.text]}>
                      {props.route.params.data.propertyType}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={[styles.text]}>
                      {props.route.params.data.numberOfRooms}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={[styles.text]}>
                      {props.route.params.data.sqFeet} sqft
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.textHeader]}>
                  {' '}
                  {props.route.params.data.price} / Month
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    paddingBottom: 8,
                    marginBottom: 10,
                    paddingLeft: 5,
                  }}>
                  <Text style={[styles.smallTitle]}>
                    {props.route.params.data.city}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{paddingBottom: 15}}>
                <Text style={[styles.detailsHeader]}> Property Details</Text>
                <Text style={[styles.detailsText]}>
                  {' '}
                  Floor {'                               '}
                  {props.route.params.data.floorName}
                </Text>
                <Text style={[styles.detailsText]}>
                  {' '}
                  Furnished {'                      '}
                  {props.route.params.data.propertyCondition}
                </Text>
                <Text style={[styles.detailsText]}>
                  {' '}
                  Availability {'                    '}{' '}
                  {props.route.params.data.Availability}
                </Text>
                <Text style={[styles.detailsText]}>
                  {' '}
                  Bachelors Allowed {'       '}
                  {props.route.params.data.additionalConditions ===
                  'Bachelor Allowed'
                    ? 'Yes'
                    : 'No'}
                </Text>
                <Text style={[styles.detailsText]}>
                  {' '}
                  Property Age {'                 '}
                  {props.route.params.data.slider}
                </Text>
              </View>
              <View style={{paddingBottom: 15}}>
                <View style={[styles.detailsContainer]}>
                  <Text style={[styles.detailsHeader]}>
                    Property Description
                  </Text>
                  <Text style={[styles.description]}>
                    {props.route.params.data.description}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '35%',
    backgroundColor: COLORS.white,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  text: {
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#E8ECF1',
    fontFamily: 'Helvetica',
    color: 'black',
    backgroundColor: '#E8ECF1',
    padding: 4,
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
  buttonContainer: {
    marginHorizontal: wp('5%'),
  },
  textInput: {
    marginHorizontal: WIDTH / 40,
  },
  description: {
    fontFamily: 'Helvetica',
    color: '#646E7C',
    fontSize: 14,
    backgroundColor: COLORS.white,
    paddingLeft: 5,
  },
  smallTitle: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    lineHeight: 16,
    fontWeight: '400',
    paddingTop: 10,
    backgroundColor: COLORS.white,
    paddingLeft: 5,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLORS.white,
  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 1,
    padding: 10,
    paddingBottom: 15,
    backgroundColor: COLORS.white,
  },
  detailsHeader: {
    fontFamily: 'Source Sans Pro',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: COLORS.white,
    padding: 10,
  },
  detailsText: {
    fontFamily: 'Source Sans Pro',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 1,
    padding: 10,
    color: '#646E7C',
    backgroundColor: COLORS.white,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // borderRadius: 5,
    padding: 10,
    marginHorizontal: 30,
    height: '100%',
    marginTop:20
  },
  image: {
    width: '110%',
    height: '110%',
    borderRadius: 5,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  inactiveDot: {
    backgroundColor: 'white',
  },
  activeDot: {
    backgroundColor: '#29ABE2',
  },
  textHeader: {
    fontFamily: 'Source Sans Pro',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textDecorationStyle: 'solid',
    backgroundColor: COLORS.white,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  symbolContainer: {
    padding: 5,
    backgroundColor: 'black',
    borderRadius: 500,
    marginRight: 5,
    marginLeft: 30,
  },
});

export default ViewScreen;
