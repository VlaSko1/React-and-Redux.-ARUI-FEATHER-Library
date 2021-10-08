import { transactionsRef } from '../../api/firebase/request';
import { onValue, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";

export const ADD_TRANSACTION = "TRANSACTIONS::ADD_TRANSACTION";
export const DELETE_TRANSACTION = "TRANSACTIONS::DELETE_TRANSACTION";
export const ADD_TRANSACTIONS = "TRANSACTIONS::ADD_TRANSACTIONS";



export const createAddTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  payload: transaction
});


export const createAddTransactionsActions = (transactions) => ({
  type: ADD_TRANSACTIONS,
  payload: transactions,
});

export const createDelTransactionsActions = (transactions) => ({
  type: DELETE_TRANSACTION,
  payload: transactions,
});


export const getPayload = (snapshot) => {
  const transactions = [];

  snapshot.forEach((value) => {
    
    transactions.push({...value.val(), id: value.key});
  })
  
  return transactions;
}

/*export const initTransactions = () => (dispatch) => {
  transactionsRef.on('value', (snapshot) => {
    dispatch(createAddTransactionsActions(getPayload(snapshot)));
  });
  transactionsRef.on("child_changed", (snapshot) => {
    dispatch(createAddTransactionsActions(getPayload(snapshot)));
  })
  transactionsRef.on('child_added', (snapshot) => {
    dispatch(createAddTransactionsActions(getPayload(snapshot)));
  });

  transactionsRef.on('child_removed', (snapshot) => {
    dispatch(createDelTransactionsActions(getPayload(snapshot)));
  });

}*/

export const initTransactions = () => (dispatch) => {
  onValue(transactionsRef, (snapshot) => {
    dispatch(createAddTransactionsActions(getPayload(snapshot)));

  });
  onChildAdded(transactionsRef, (snapshot) => {
    dispatch(createAddTransactionsActions(getPayload(snapshot)))
  });
  onChildChanged(transactionsRef, (snapshot) => {
    dispatch(createAddTransactionsActions(getPayload(snapshot)))
  });
  onChildRemoved(transactionsRef, (snapshot) => {
    dispatch(createDelTransactionsActions(getPayload(snapshot)));
  });

};