import { makeRequest, updateUser } from './api';
import {
  setInitialState,
  setError,
  setMaxs,
  setMaxBench,
  setMaxDeadlift,
  setMaxSquat,
  setFrequency,
  setXRMBench,
  setXRMDeadlift,
  setXRMSquat,
  setDifficulty,
  setBirthday,
  setBodyweight,
  setHeight,
  setMale,
  setLangCode,
  setMetric,
  onHold,
  setCompStyles
} from './actions';

export function fetchUserData(cognito_id, sudo = false) {
  console.log('fetchUserData for', cognito_id)
  return function (dispatch) {
    return makeRequest(cognito_id).then(
      (data) => {
        // console.log('fetchUserData raw:', data)

        if (!sudo) {
          dispatch(setInitialState(data));
        }

        return data;
      },
      (error) => dispatch(setError(error))
    );
  };
}

export function updateUserData(pl) {
  return function (dispatch) {
    return updateUser(pl).then(
      (data) => {
        dispatch(setMaxs(pl.maxs));
        dispatch(setFrequency(pl.frequency));
        dispatch(setDifficulty(pl.difficulty));
        dispatch(setBodyweight(pl.bodyweight));
        dispatch(setBirthday(pl.birthday));
        dispatch(setHeight(pl.height));
        dispatch(setMale(pl.male));
        dispatch(onHold(pl.on_hold));
        dispatch(setMetric(pl.metric));
        dispatch(setCompStyles(pl.comp_styles));
      },
      (error) => dispatch(setError(error))
    );
  };
}

export function setUserData(pl) {
  return function (dispatch) {
    return updateUser(pl).then(
      (data) => {
        dispatch(setMaxs(pl.maxs));
        dispatch(setMaxBench(pl.max_bench));
        dispatch(setMaxDeadlift(pl.max_deadlift));
        dispatch(setMaxSquat(pl.max_squat));
      },
      (error) => dispatch(setError(error))
    );
  };
}

export function updateLangCode(pl) {
  return function (dispatch) {
    return updateUser(pl).then(
      (data) => {
        dispatch(setLangCode(pl.lang_code));
      },
      (error) => dispatch(setError(error))
    )
  }
}
