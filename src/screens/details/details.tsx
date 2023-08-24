import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  Button,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

import {wishListDataRequest} from '../../redux/userActions';
import {useDispatch, useSelector} from 'react-redux';

import storage from '@react-native-firebase/storage';

const Details = (props: any) => {
  const user = auth().currentUser;

  const dispatch = useDispatch();

  const ack = useSelector((state: any) => state.ack);

  const handleSharePress = () => {
    console.log('Share pressed');
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoritePress = () => {
    console.log('wishlist presses');
    setIsFavorite(!isFavorite);
    dispatch(wishListDataRequest(props.route.params.data, user?.uid));
    Alert.alert('Added to WishList');
  };

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
            inactiveDotScale={0.6}
            inactiveDotStyle={styles.inactiveDot}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{backgroundColor: COLORS.lightBlue}}>
      <View style={{backgroundColor: COLORS.lightBlue, margin: 12}}>
        <ScrollView nestedScrollEnabled={true} style={{height: '87%'}}>
          <View style={styles.container}>
            <Carousel
              data={props.route.params.data.imageData}
              renderItem={renderItem}
              sliderWidth={500}
              itemWidth={400}
              onSnapToItem={(index: any) => setActiveSlideIndex(index)}
            />
          </View>
          <ScrollView nestedScrollEnabled={true}>
            <View>
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      width: '100%',
                      // paddingLeft: 12,
                    }}>
                    <View style={{width: '78%'}}>
                      <Text style={[styles.textHeader, {margin: 10}]}>
                        {props.route.params.data.propertyName}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{marginTop: 15, marginBottom: 15}}
                      onPress={handleSharePress}>
                      <IonIcon name="share-outline" size={25} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        marginLeft: 10,
                        marginTop: 15,
                        marginBottom: 10,
                      }}
                      onPress={handleFavoritePress}>
                      <IonIcon
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={25}
                        color={isFavorite ? 'red' : 'black'}
                      />
                    </TouchableOpacity>
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
                <View>
                  {props.route.params.data.rent == 'rent' ? (
                    <Text style={[styles.textHeader]}>
                      {' '}
                      {props.route.params.data.price} / Month
                    </Text>
                  ) : (
                    <Text style={[styles.textHeader]}>
                      {' '}
                      {props.route.params.data.price} / -
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    paddingBottom: 8,
                    marginBottom: 10,
                    paddingLeft: 5,
                  }}>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={22}
                    color="black"
                  />
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
              <View style={{backgroundColor: 'white'}}>
                <Text style={[styles.detailsHeader]}>
                  {' '}
                  Interested in property?
                </Text>
                <Text style={[styles.description]}>
                  {'   '}Submit your quotation
                </Text>
                <View style={styles.textInput}>
                  <CustomTextInput
                    placeholder="Enter your asking value"
                    viewHeight={undefined}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title="Submit"
                    backgroundColor="#E8ECF1"
                    textColor={COLORS.black}
                    paddingVertical={45}
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
            </View>
          </ScrollView>
        </ScrollView>
      </View>
      <View style={styles.stickyBottom}>
        <View style={{marginTop: 5, marginLeft: 25}}>
          <Text style={styles.stickyText}> Contact Owner </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            // marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.lightPink,
          }}>
          <View>
            <CustomButton
              title="Call"
              onPress={() =>
                Linking.openURL(`tel:+91${props.route.params.data.phoneNumber}`)
              }
              backgroundColor={COLORS.white}
              textColor={COLORS.black}
              paddingVertical={HEIGHT / 3}
              paddingHorizontal={10}
              marginVertical={HEIGHT / 5}
              marginHorizontal={WIDTH / 15}
              fontsize={16}
              fontWeight={900}
              borderColor={COLORS.black}
              icon={require('../../assets/phone-call.png')}
            />
          </View>
          <View>
            <CustomButton
              title="Whatsapp"
              onPress={() =>
                Linking.openURL(
                  `https://wa.me/91${props.route.params.data.phoneNumber}`,
                )
              }
              backgroundColor={COLORS.white}
              textColor={COLORS.black}
              paddingVertical={HEIGHT / 3}
              paddingHorizontal={25}
              marginVertical={HEIGHT / 5}
              marginHorizontal={WIDTH / 18}
              fontsize={16}
              fontWeight={900}
              borderColor={COLORS.black}
              icon={require('../../assets/whatsapp.png')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
    backgroundColor: COLORS.white,
  },
  stickyBottom: {
    backgroundColor: COLORS.lightPink,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // borderWidth: 2,
    padding: 5,
    paddingBottom: 3,
    borderTopColor: 'black',
    borderTopWidth: 2,
    borderBottomWidth: 0,
  },
  stickyText: {
    color: 'black',
    fontSize: 16,
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
    fontFamily: 'Source Sans Pro',
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textDecorationStyle: 'solid',
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
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    height: '100%',
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
  },
  symbolContainer: {
    padding: 5,
    backgroundColor: 'black',
    borderRadius: 500,
    marginRight: 5,
    marginLeft: 30,
  },
});

export default Details;
