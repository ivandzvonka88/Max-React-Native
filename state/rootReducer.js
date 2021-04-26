export const initialState = {
  isAuth: false,
  maxs: null,
  max_bench: null,
  max_squat: null,
  max_deadlift: null,
  xrm_bench: null,
  xrm_squat: null,
  xrm_deadlift: null,
  email: '',
  email_verified: false,
  id: '',
  userName: '',
  lang_code: '',
  loading: false,
  error: '',
  sub: '',
  purchase: false,
  frequency: null,
  questions: [],
  difficulty: 'hard',
  birthday: null,
  bodyweight: null,
  height: null,
  male: null,
  metric: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH': {
      return { ...state, isAuth: action.auth };
    }
    case 'SET_EMAIL':
      return { ...state, email: action.email };
    case 'SET_USER_NAME':
      return { ...state, userName: action.userName };
    case 'SET_BODYWEIGHT':
      return { ...state, bodyweight: action.bodyweight };
    case 'SET_BIRTHDAY':
      return { ...state, birthday: action.birthday };
    case 'SET_HEIGHT':
      return { ...state, height: action.height };
    case 'SET_LANG_CODE':
      return { ...state, lang_code: action.lang_code };
    case 'SET_MALE':
      return { ...state, male: action.male };
    case 'SET_MAXS':
      return { ...state, maxs: action.maxs };
    case 'SET_MAX_BENCH':
      return { ...state, max_bench: action.max_bench };
    case 'SET_XRM_BENCH':
      return { ...state, xrm_bench: action.xrm_bench };
    case 'SET_MAX_DEADLIFT':
      return { ...state, max_deadlift: action.maxDeadLift };
    case 'SET_XRM_DEADLIFT':
      return { ...state, xrm_deadlift: action.xrm_deadLift };
    case 'SET_MAX_SQUAT':
      return { ...state, max_squat: action.maxSquat };
    case 'SET_XRM_SQUAT':
      return { ...state, xrm_squat: action.xrm_squat };
    case 'TOGGLE_LOADING':
      return { ...state, loading: !state.loading };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    case 'SET_FREQUENCY':
      return { ...state, frequency: action.frequency };
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.difficulty };
    case 'SET_METRIC':
      return { ...state, metric: action.metric };
    case 'SET_PURCHASE':
      return { ...state, purchase: action.purchase };
    case 'SET_INITIAL_STATE':
      return {
        ...state,
        ...action.initialState,
        userName: action.initialState.cognito_id
      };
    default:
      return state;
  }
};
