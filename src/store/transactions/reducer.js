import { ADD_TRANSACTION, DELETE_TRANSACTION, ADD_TRANSACTIONS } from './actions';
import orderBy from 'lodash/orderBy';

export const transactionsInitialState = {
  transactions: [],
}

export const transactionsReducer = ( state = transactionsInitialState, action ) => {
  switch (action.type) {
    case ADD_TRANSACTION : {
      return {
        transactions: orderBy([...state.transactions, action.payload, ], ['date'], ['desc'])
      }
    }
    case DELETE_TRANSACTION : {
      return {
        transactions: orderBy([...action.payload], ['date'], ['desc'])
      }
    }
    case ADD_TRANSACTIONS : {
      return {
        transactions: orderBy([...action.payload], ['date'], ['desc'])
      }
    }
    default : {
      return state;
    }
  }
}

