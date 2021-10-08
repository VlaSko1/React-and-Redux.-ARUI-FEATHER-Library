export const CHANGE_TABSELECTED = "TABSELECTED::CHANGE_TABSELECTED";

export const createChangeTabSelected = (tab) => ({
  type: CHANGE_TABSELECTED,
  payload: tab
});