// ACTION-TYPES
const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
const SET_MAXS = 'SET_MAXS'
const SET_MAX_BENCH = 'SET_MAX_BENCH';
const SET_MAX_DEADLIFT = 'SET_MAX_DEADLIFT';
const SET_MAX_SQUAT = 'SET_MAX_SQUAT';
const SET_XRM_BENCH = 'SET_XRM_BENCH';
const SET_XRM_DEADLIFT = 'SET_XRM_DEADLIFT';
const SET_XRM_SQUAT = 'SET_XRM_SQUAT';
const SET_EMAIL = 'SET_EMAIL';
const SET_AUTH = 'SET_AUTH';
const SET_USER_NAME = 'SET_USER_NAME';
const TOGGLE_LOADING = 'TOGGLE_LOADING';
const SET_ERROR = 'SET_ERROR';
const SET_PURCHASE = 'SET_PURCHASE';
const SET_FREQUENCY = 'SET_FREQUENCY';
const SET_DIFFICULTY = 'SET_DIFFICULTY';
const SET_BIRTHDAY = 'SET_BIRTHDAY';
const SET_BODYWEIGHT = 'SET_BODYWEIGHT';
const SET_HEIGHT = 'SET_HEIGHT';
const SET_MALE = 'SET_MALE';
const SET_ONHOLD = 'SET_ONHOLD';
const SET_HOLDSTARTDATE = 'SET_HOLDSTARTDATE';
const SET_HOLDENDDATE = 'SET_HOLDENDDATE';
const SET_LANG_CODE = 'SET_LANG_CODE';
const SET_METRIC = 'SET_METRIC';
const SET_COMPSTYLES = 'SET_COMPSTYLES';

// ACTIONS
const setInitialState = initialState => dispatch => {
  dispatch({ type: SET_INITIAL_STATE, initialState });
};

const setEmail = email => dispatch => {
  dispatch({ type: SET_EMAIL, email });
};

const setUserName = userName => dispatch => {
  dispatch({ type: SET_USER_NAME, userName });
};

const setMaxs = maxs => dispatch => {
  dispatch({ type: SET_MAXS, maxs })
};

const setMaxBench = max_bench => dispatch => {
  dispatch({ type: SET_MAX_BENCH, max_bench });
};

const setMaxDeadlift = maxDeadLift => dispatch => {
  dispatch({ type: SET_MAX_DEADLIFT, maxDeadLift });
};

const setMaxSquat = maxSquat => dispatch => {
  dispatch({ type: SET_MAX_SQUAT, maxSquat });
};

const setXRMBench = xrm_bench => dispatch => {
  dispatch({ type: SET_XRM_BENCH, xrm_bench });
};

const setXRMDeadlift = xrm_deadLift => dispatch => {
  dispatch({ type: SET_XRM_DEADLIFT, xrm_deadLift });
};

const setXRMSquat = xrm_squat => dispatch => {
  dispatch({ type: SET_XRM_SQUAT, xrm_squat });
};

const setAuth = auth => dispatch => {
  dispatch({ type: SET_AUTH, auth });
};

const toggleLoading = () => dispatch => {
  dispatch({ type: TOGGLE_LOADING });
};

const setError = error => dispatch => {
  dispatch({ type: SET_ERROR, error });
};

const setPurchased = purchase => dispatch => {
  dispatch({ type: SET_PURCHASE, purchase });
};

const setFrequency = frequency => dispatch => {
  dispatch({ type: SET_FREQUENCY, frequency });
};

const setDifficulty = difficulty => dispatch => {
  dispatch({ type: SET_DIFFICULTY, difficulty });
};

const setBirthday = birthday => dispatch => {
  dispatch({ type: SET_BIRTHDAY, birthday });
};

const setBodyweight = bodyweight => dispatch => {
  dispatch({ type: SET_BODYWEIGHT, bodyweight });
};

const setHeight = height => dispatch => {
  dispatch({ type: SET_HEIGHT, height });
};

const setMale = male => dispatch => {
  dispatch({ type: SET_MALE, male });
};

const onHold = onHold => dispatch => {
  dispatch({ type: SET_ONHOLD, onHold });
}

const holdStartDate = holdStartDate => dispatch => {
  dispatch({ type: SET_HOLDSTARTDATE, holdStartDate });
}

const holdEndDate = holdEndDate => dispatch => {
  dispatch({ type: SET_HOLDENDDATE, holdEndDate });
}

const setLangCode = (lang_code) => (dispatch) => {
  dispatch({ type: SET_LANG_CODE, lang_code });
};

const setMetric = (metric) => (dispatch) => {
  dispatch({ type: SET_METRIC, metric });
};

const setCompStyles = (comp_styles) => (dispatch) => {
  dispatch({ type: SET_COMPSTYLES, comp_styles });
};

export {
  setInitialState,
  setEmail,
  setFrequency,
  setError,
  toggleLoading,
  setAuth,
  setLangCode,
  setMaxs,
  setXRMSquat,
  setXRMDeadlift,
  setXRMBench,
  setMaxBench,
  setMaxDeadlift,
  setMaxSquat,
  setPurchased,
  setUserName,
  setDifficulty,
  setBirthday,
  setBodyweight,
  setHeight,
  setMale,
  onHold,
  holdStartDate,
  holdEndDate,
  setMetric,
  setCompStyles
};
