// userSaga.js
import {takeLatest, put, call} from 'redux-saga/effects';

import {
  emailSuccess,
  logoutSuccess,
  passwordSuccess,
  signUpSuccess,
  phoneSuccess,
  otpSuccess,
  locationSuccess,
  homeDataSuccess,
  searchResultsDataSuccess,
  filterSuccess,
  getWishListDataSuccess,
  goolgeLoginSuccess,
  getDashboardSuccess,
  homeFilterSuccess,
} from './userActions';

import {
  emailCheck,
  passwordCheck,
  phoneCheck,
  otpCheck,
  updateName,
  signUp,
  homeData,
  searchResultsData,
  wishList,
  postProperty,
  getWishList,
  dashboard,
  homeFilter,
  editSaleProperty,
  logout,
} from './asyncFunctions';

//Saga-function to check existance of mailId
function* emailCheckSaga(action) {
  try {
    const data = yield call(emailCheck, action.payload);

    yield put(emailSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

//Authentication
function* login(action) {
  try {
    const data = yield call(passwordCheck, action.payload);

    if (
      data.res == 'auth/wrong-password' ||
      data.res == 'auth/too-many-requests'
    ) {
      const data1 = {data: data, isloggedIn: false, error: 'Wrong Password'};
      yield put(passwordSuccess(data1));
    } else {
      const data1 = {data: data, isloggedIn: true};
      yield put(passwordSuccess(data1));
    }
  } catch (error) {
    console.log(error.message);
  }
}

//Saga-function to check existance of Phone number
function* phoneCheckSaga(action) {
  try {
    const data = yield call(phoneCheck, action.payload);

    if (
      data?.res === 'auth/missing-client-identifier' ||
      data?.res == 'auth/invalid-phone-number'
    ) {
      const data1 = {res: data, flag: false};

      yield put(phoneSuccess(data1));
    } else {
      const data1 = {res: data, flag: true};
      yield put(phoneSuccess(data1));
    }
  } catch (error) {
    console.log(error.message);
  }
}

//Validating using OTP
function* otpSaga(action) {
  try {
    const data = yield call(otpCheck, action.payload);
    if (data == 'auth/invalid-verification-code' || data == undefined) {
      yield put(otpSuccess(false));
    } else {
      yield put(otpSuccess(true));
    }
  } catch (error) {
    console.log(error);
  }
}

//Creating user account
function* signUpSaga(action) {
  try {
    const data = yield call(signUp, action.payload);
    const data2 = yield call(updateName, action.payload);
    const data1 = {data: data, isloggedIn: true};
    yield put(signUpSuccess(data1));
  } catch (error) {
    console.log(error.message);
  }
}

//SignUp using google
function* goolgeLoginSaga() {
  try {
    yield put(goolgeLoginSuccess(true));
  } catch (error) {
    console.log(error.message);
  }
}

//Updating location
function* locationSaga(action) {
  try {
    yield put(locationSuccess(action.payload.location));
  } catch (error) {
    console.log(error.message);
  }
}

//Retreiving home data
function* homeDataSaga(action) {
  try {
    const homeData1 = yield call(homeData, action.payload);
    yield put(homeDataSuccess(homeData1));
  } catch (error) {
    console.log(error.message);
  }
}

//Applying filters
function* filterSaga(action) {
  try {
    yield put(filterSuccess(action.payload.data));
  } catch (error) {
    console.log(error.message);
  }
}

//retreiving filtered data
function* searchResultsDataSaga(action) {
  try {
    const filterData = yield call(searchResultsData, action.payload);

    yield put(searchResultsDataSuccess(filterData));
  } catch (error) {
    console.log(error.message);
  }
}

//Saga-function to push data into cloud
function* wishListSaga(action) {
  try {
    const filterData = yield call(wishList, action.payload);
    yield put(searchResultsDataSuccess(filterData));
  } catch (error) {
    console.log(error.message);
  }
}

//Saga-function to push data into cloud
function* postPropertySaga(action) {
  try {
    const filterData = yield call(postProperty, action.payload);
    yield put(searchResultsDataSuccess(filterData));
  } catch (error) {
    console.log(error.message);
  }
}

function* editSaleSaga(action) {
  
  try {
    const filterData = yield call(editSaleProperty, action.payload);
    // yield put(searchResultsDataSuccess(filterData));

  } catch (error) {
    console.log(error.message);
  }
}

//Retreiving wishlist data
function* getWishListSaga(action) {
  try {
    const Data = yield call(getWishList, action.payload);
    yield put(getWishListDataSuccess(Data));
  } catch (error) {
    console.log(error.message);
  }
}

//Saga-function for dashboard
function* dashboardSaga(action) {
  try {
    const Data = yield call(dashboard, action.payload);
    yield put(getDashboardSuccess(Data));
  } catch (error) {
    console.log(error.message);
  }
}

//Saga-function for dashboard
function* homeFilterSaga(action) {
  try {
    const Data = yield call(homeFilter, action.payload);
    yield put(homeFilterSuccess(Data));
  } catch (error) {
    console.log(error.message);
  }
}

//Redux function to logout application
function* logoutSaga() {
  try {
    yield call(logout);
    yield put(logoutSuccess(true));
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export function* watchUserAuthentication() {
  yield takeLatest('EMAIL_REQUEST', emailCheckSaga);
  yield takeLatest('PASSWORD_REQUEST', login);
  yield takeLatest('LOGOUT_REQUEST', logoutSaga);
  yield takeLatest('SIGNUP_REQUEST', signUpSaga);
  yield takeLatest('GOOGLELOGIN_REQUEST', goolgeLoginSaga);
  yield takeLatest('PHONE_REQUEST', phoneCheckSaga);
  yield takeLatest('OTP_REQUEST', otpSaga);
  yield takeLatest('LOCATION_REQUEST', locationSaga);
  yield takeLatest('HOMEDATA_REQUEST', homeDataSaga);
  yield takeLatest('SEARCHRESULTS_REQUEST', searchResultsDataSaga);
  yield takeLatest('WISHLIST_REQUEST', wishListSaga);
  yield takeLatest('POSTPROPERTY_REQUEST', postPropertySaga);
  yield takeLatest('GETWISHLIST_REQUEST', getWishListSaga);
  yield takeLatest('DASHBOARD_REQUEST', dashboardSaga);
  yield takeLatest('HOMEFILTER_REQUEST', homeFilterSaga);
  yield takeLatest('FILTER_REQUEST', filterSaga);
  yield takeLatest('EDITSALES_REQUEST', editSaleSaga);
}
