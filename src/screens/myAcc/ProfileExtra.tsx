import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../../constants/constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar,Title,Caption,TouchableRipple} from "react-native-paper";
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const ProfileExtra = (props:any) => {

    const location = useSelector((state: any) => state.location);

    const user = auth().currentUser;

    return(
        <SafeAreaView style={{backgroundColor: COLORS.lightBlue, flex: 1}}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection:"row", marginTop:10}}>
                <Avatar.Image
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU.png',
                  }}
                  size={80}
                />
                <View style={{marginLeft: 20}}>
                    <Title style={[styles.title, {marginTop: 15, marginBottom: 5}]}>{user?.displayName
                  ? user?.displayName
                  : 'User Name'}</Title>
                </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
                <Icon name="map-marker-radius" color="#777777"size={20}></Icon>
                <Text style={{color:"#777777", marginLeft: 20}}>{location ? location : 'Location Not selected'}</Text>
            </View>
            <View style={styles.row}>
                <Icon name="phone" color="#777777"size={20}></Icon>
                <Text style={{color:"#777777", marginLeft: 20}}>{user?.phoneNumber ? user.phoneNumber : 'Phone Number Not Avaliable'}</Text>
            </View>
            <View style={styles.row}>
                <Icon name="email" color="#777777"size={20}></Icon>
                <Text style={{color:"#777777", marginLeft: 20}}>{user?.email ? user.email : 'email'}</Text>
            </View>
          </View>
        </SafeAreaView>
    );
};

export default ProfileExtra;

const styles = StyleSheet.create({
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25
    },
    menuItem:{
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 15
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10
    },
    menuWrapper: {
        marginTop: 50
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})