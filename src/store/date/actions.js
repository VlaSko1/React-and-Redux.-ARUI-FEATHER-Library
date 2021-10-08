export const CHANGE_DATE = "DATE::CHANGE_DATE";
export const SUBSTRACT_DAY = "DATE::SUBSTRACT_DAY";
export const ADD_DAY = "DATE::ADD_DAY";

export const createChangeDate = (date) => ({
  type: CHANGE_DATE,
  payload: date,
});

export const createSubstractDay = () => ({

  type: SUBSTRACT_DAY,

});

export const createAddDay = () => ({
  
  type: ADD_DAY,

});