// userReducer.js
const initialState = {
  user: '',
  loading: false,
  error: null,
  isLoggedIn: '',
  newLogin: false,
  phoneNumber: '',
  otpSuccess: '',
  location: '',
  homeRentData: [],
  homeBuyData: [],
  homeTemp: [],
  searchResults: '',
  filterParameters: [],
  ack: '',
  wishlistData: '',
  postPropertyAck: '',
  dashboardData: '',
  homeFilterData:[],

};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EMAIL_REQUEST':
      console.log(action);
      return {
        // ...state,
        loading: true,
        error: null,
      };
    case 'EMAIL_SUCCESS':
      console.log(action);
      return {
        // ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'PASSWORD_REQUEST':
      console.log(action);
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'PASSWORD_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: action.payload.data,
        newLogin: true,
        loading: false,
        error: null,
      };

    case 'PHONE_REQUEST':
      console.log(action);
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'PHONE_SUCCESS':
      return {
        ...state,
        phoneNumber: action.payload,
        loading: false,
        error: null,
      };

    case 'OTP_REQUEST':
      console.log(action);
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'OTP_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: action.payload.isloggedIn,
        otpSuccess: action.payload.isloggedIn,
        newLogin: true,
        loading: false,
        error: null,
      };

    case 'SIGNUP_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: action.payload.data,
        newLogin: true,
        loading: false,
        error: null,
      };

    case 'GOOGLELOGIN_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GOOGLELOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: action.payload,
        newLogin: true,
        loading: false,
        error: null,
      };

    case 'LOCATION_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOCATION_SUCCESS':
      return {
        ...state,
        location: action.payload,
        loading: false,
        error: null,
      };

    case 'HOMEDATA_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'HOMEDATA_SUCCESS':
      return {
        ...state,
        homeRentData: action.payload[0],
        homeBuyData: action.payload[1],
        homeTemp: action.payload[2],
        loading: false,
        error: null,
      };

    case 'FILTER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FILTER_SUCCESS':
      return {
        ...state,
        filterParameters: action.payload.data,
        loading: false,
        error: null,
      };

    case 'SEARCHRESULTS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'SEARCHRESULTS_SUCCESS':
      return {
        ...state,
        searchResults: action.payload,
        loading: false,
        error: null,
      };

    case 'WISHLIST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'WISHLIST_SUCCESS':
      return {
        ...state,
        ack: true,
        loading: false,
        error: null,
      };

    case 'GETWISHLIST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GETWISHLIST_SUCCESS':
      return {
        ...state,
        wishlistData: action.payload,
        ack: true,
        loading: false,
        error: null,
      };

    case 'POSTPROPERTY_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'POSTPROPERTY_SUCCESS':
      return {
        ...state,
        postPropertyAck: action.payload,
        ack: true,
        loading: false,
        error: null,
      };

    case 'DASHBOARD_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'DASHBOARD_SUCCESS':
      return {
        ...state,
        dashboardData: action.payload,
        ack: true,
        loading: false,
        error: null,
      };

    case 'HOMEFILTER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'HOMEFILTER_SUCCESS':
      return {
        ...state,
        homeFilterData: action.payload,
        loading: false,
        error: null,
      };
    case 'EDITSALES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'EDITSALES_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'LOGOUT_REQUEST':
      console.log(action);
      return {
        ...state,
        loading: true,
      };
    case 'LOGOUT_SUCCESS':
      console.log(action);
      return {
        ...state,
        newLogin: true,
        loading: false,
        isLoggedIn: action.payload,
        phoneNumber: '',
        user: '',
        otp: '',
        location: '',
        homeRentData: '',
        homeBuyData: '',
        otpSuccess: '',
        phoneNumber: '',
        error: null,
        ack: '',
        wishlistData: '',
        searchResults: '',
        filterParameters: '',
        dashboardData: '',
        homeFilterData: '',
      };
    default:
      return state;
  }
};

export default userReducer;
