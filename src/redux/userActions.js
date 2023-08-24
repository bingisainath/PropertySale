// userActions.js
export const emailRequest = (email, password) => ({
  type: 'EMAIL_REQUEST',
  payload: {email, password},
});

export const emailSuccess = user => ({
  type: 'EMAIL_SUCCESS',
  payload: user,
});

export const passwordRequest = (email, password) => ({
  type: 'PASSWORD_REQUEST',
  payload: {email, password},
});

export const passwordSuccess = user => ({
  type: 'PASSWORD_SUCCESS',
  payload: user,
});

export const phoneRequest = phoneNumber => ({
  type: 'PHONE_REQUEST',
  payload: phoneNumber,
});

export const phoneSuccess = phoneNumber => ({
  type: 'PHONE_SUCCESS',
  payload: phoneNumber,
});

export const otpRequest = (confirm, otp) => ({
  type: 'OTP_REQUEST',
  payload: {confirm, otp},
});

export const otpSuccess = isloggedIn => ({
  type: 'OTP_SUCCESS',
  payload: {isloggedIn},
});

export const signUpRequest = (email, password, name) => ({
  type: 'SIGNUP_REQUEST',
  payload: {email, password, name},
});

export const signUpSuccess = user => ({
  type: 'SIGNUP_SUCCESS',
  payload: user,
});

export const goolgeLoginRequest = () => ({
  type: 'GOOGLELOGIN_REQUEST',
});

export const goolgeLoginSuccess = isloggedIn => ({
  type: 'GOOGLELOGIN_SUCCESS',
  payload: {isloggedIn},
});

export const locationRequest = location => ({
  type: 'LOCATION_REQUEST',
  payload: {location},
});

export const locationSuccess = location => ({
  type: 'LOCATION_SUCCESS',
  payload: location,
});

export const homeDataRequest = (location,user) => ({
  type: 'HOMEDATA_REQUEST',
  payload: {location,user},
});

export const homeDataSuccess = data => ({
  type: 'HOMEDATA_SUCCESS',
  payload: data,
});

export const filterRequest = data => ({
  type: 'FILTER_REQUEST',
  payload: {data},
});

export const filterSuccess = data => ({
  type: 'FILTER_SUCCESS',
  payload: {data},
});

export const searchResultsDataRequest = data => ({
  type: 'SEARCHRESULTS_REQUEST',
  payload: {data},
});

export const searchResultsDataSuccess = searchResults => ({
  type: 'SEARCHRESULTS_SUCCESS',
  payload: searchResults,
});

export const wishListDataRequest = (data, id) => ({
  type: 'WISHLIST_REQUEST',
  payload: {data, id},
});

export const wishListDataSuccess = ack => ({
  type: 'WISHLIST_SUCCESS',
  payload: ack,
});

export const getWishListDataRequest = id => ({
  type: 'GETWISHLIST_REQUEST',
  payload: {id},
});

export const getWishListDataSuccess = wishListData => ({
  type: 'GETWISHLIST_SUCCESS',
  payload: wishListData,
});

export const postPropertyRequest = Data => ({
  type: 'POSTPROPERTY_REQUEST',
  payload: Data,
});

export const postPropertySuccess = ack => ({
  type: 'POSTPROPERTY_SUCCESS',
  payload: ack,
});

export const getDashboardRequest = (id) => ({
  type: 'DASHBOARD_REQUEST',
  payload: {id},
});

export const getDashboardSuccess = (Data) => ({
  type: 'DASHBOARD_SUCCESS',
  payload: Data,
});

export const homeFilterRequest = (datalist) => ({
  type: 'HOMEFILTER_REQUEST',
  payload: datalist,
});

export const homeFilterSuccess = (Data) => ({
  type: 'HOMEFILTER_SUCCESS',
  payload: Data,
});

export const logoutRequest = () => ({
  type: 'LOGOUT_REQUEST',
});

export const logoutSuccess = () => ({
  type: 'LOGOUT_SUCCESS',
});
export const EditSalesRequest = (Data) => ({
  type: 'EDITSALES_REQUEST',
  payload: Data,
});

export const EditSalesSuccess = (Ack) => ({
  type: 'EDITSALES_SUCCESS',
  payload: Ack,
});
