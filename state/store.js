import { localizeReducer } from 'react-localize-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import userReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
  localize: localizeReducer,
  userReducer,
});

const persistingReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  let store = createStore(persistingReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
