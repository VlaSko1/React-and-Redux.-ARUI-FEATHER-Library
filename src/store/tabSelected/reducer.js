import { CHANGE_TABSELECTED } from './actions';

export const tabSelectedInitialState = {
  tabSelected: 'expanse'
}

export const tabSelectedReducer = ( state = tabSelectedInitialState, action ) => {
  switch (action.type) {
    case CHANGE_TABSELECTED : {
      return {
        tabSelected: action.payload,
      }
    }
    default : {
      return state;
    }
  }
}

