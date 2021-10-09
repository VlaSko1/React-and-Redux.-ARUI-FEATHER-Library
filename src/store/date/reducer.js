import { CHANGE_DATE, SUBSTRACT_DAY, ADD_DAY } from './actions';
import moment from 'moment';



export const dateInitialState = {
  date: moment(),
}

export const dateReducer = ( state = dateInitialState, action ) => {
  switch (action.type) {
    case CHANGE_DATE : {
      return {
        date: moment(action.payload),
      }
    }
    case SUBSTRACT_DAY : {
      return {
        date: moment(state.date).subtract(1, 'day')
      }
    }
    case ADD_DAY : {
      return {
        date: moment(state.date).add(1, 'day')
      }
    }
    default : {
      return state;
    }
  }
}





