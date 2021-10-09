import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import moment from 'moment';
import CalendarInput from 'arui-feather/calendar-input';


import Expanse from './components/expanse/expanse';
import Incomes from './components/incomes/incomes';
import Buttons from './components/buttons';
import Tabses from './components/tabses';
import TableBudget from './components/tableBudget';

import { getDate, createChangeDate } from './store/date';
import { getTabSelected } from './store/tabSelected';
import { initTransactions } from './store/transactions';
import { transactionsApi } from './api/firebase/request';



function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initTransactions());
  }, [dispatch])
  let date = useSelector(getDate);
  let tabSelected = useSelector(getTabSelected);

  const handleCalendarChange = (date) => {
    const newDate = date.split('.');
    const newDateString = `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
    
    dispatch(createChangeDate(newDateString));
  }

  const handleSubmitTransaction = (sum, category) => {
    const newTransaction = {
      date: moment(date).format('DD.MM.YYYY'),
      category,
      sum,
      
    }
    //dispatch(createAddTransaction(newTransaction));
    transactionsApi.createTransactions({...newTransaction});
  }
  
  return (
    <div className="App">
      <h1>
        Reactивный бюджет
      </h1>
      <div className="row">
        <CalendarInput
          value={moment(date).format('DD.MM.YYYY')}
          onChange={ handleCalendarChange }
        />
      </div>
      <Buttons/>
      <Tabses/>
      <div className="row">
        {
          tabSelected === 'expanse' ? (
            <Expanse onSubmit={handleSubmitTransaction} />
          ) : (
            <Incomes onSubmit={handleSubmitTransaction} />
          )
        }
      </div>
      <TableBudget/>
    </div>
  );
}

export default App;
