import { Dimensions } from "react-native";

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;


export const FONT_SIZE = {
    space_5: 5,
    space_7: 7,
    space_8: 8,
    space_10: 10,
    space_12: 12,
    space_14: 14,
    space_16: 16,
    space_18: 18,
    space_20: 20,
    space_22: 22,
    space_24: 24,
    xxsmall: 8,
    xsmall: 10,
    small: 12,
    medium: 14,
    large: 16,
    xlarge: 18,
    xxlarge: 20,
    xxxlarge: 22,
    xxxxlarge: 24,
};
//#63c7e6

export const COLORS = {
    black: '#222222',
    // btnColor:'#39B3F0',
    btnColor:'#1F427F',
    // lightGreen:'#78f0d0',
    // lightPink: '#fae5e3',
    lightGreen:'#a6f6f7',
    lightBlue: '#dceef7',
    lightPink: '#FFFFFF',
    // lightPink: '#c89866',
    subtitle: '#B5B8BC',
    screen_bg: '#f3f3f8',
    white: '#FFFFFF',
    header_bg: '#002292',
    selected_tab_bg: '#2d49a1',
    status_red: '#FF3B3B',
    status_green: '#2EBF4B',
    status_inp: '#FFA200',
    cancel: '#002292',
    gray_circle: '#e1eef5',
    orange_circle: '#ff3b3b',
    yellow_circle: '#ffa200',
    green_circle: '#2cb94e',

};

export const phoneNumberOptions = [
    {label: '+91', value: '+91'},
    {label: '+1', value: '+1'},
    {label: '+44', value: '+44'},
  ];


  export const pickerFilter = [
    {label: 'Select Property Type', value: ''},
    {label: 'House', value: 'house'},
    {label: 'Apartment', value: 'apartment'},
  ];


  export const PropertyData = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      img :require('../assets/villa1.jpg'),
      title: 'Villa',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      img :require('../assets/apartment.jpg'),
      title: 'Apartment',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      img :require('../assets/apartmentWithBalcony.jpg'),
      title: 'Apartment with balcony',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
      img :require('../assets/individualHouse.jpg'),
      title: 'Individual House',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6b',
      img :require('../assets/pg.jpg'),
      title: 'PG',
    },
    // {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d7e',
    //   img :require('../assets/villa1.jpg'),
    //   title: 'Third Item',
    // },
  ];

