import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { dateReducer } from './date';
import { tabSelectedReducer } from './tabSelected';
import { transactionsReducer } from './transactions';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root1',
  storage,
}


const rootReducer = combineReducers({
  date: dateReducer,
  tabSelected: tabSelectedReducer,
  transactions: transactionsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(
  persistedReducer,
  composeEnchancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);