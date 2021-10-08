import { db } from '../';
import { ref, push, set, remove } from 'firebase/database';

export const transactionsRef = ref(db, 'transactions');


export const transactionsApi = {
  createTransactions: ({date, category, sum}) => {
    const newTransaction = push(transactionsRef);
    return set(newTransaction, { date, category, sum }); // Запомни!!!
  },
  deleteTransactions: (id) => {
    const deleteVal = ref(db, `transactions/${id}` ); // Запомни!!!
    
    return remove(deleteVal);
  }
}

