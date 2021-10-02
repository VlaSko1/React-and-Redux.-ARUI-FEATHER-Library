import React, { useState, useEffect, } from 'react';
import './App.css';
import moment from 'moment';
import CalendarInput from 'arui-feather/calendar-input';
import Button from 'arui-feather/button';
import IconBuy from 'arui-feather/icon/ui/buy';
import IconSell from 'arui-feather/icon/ui/sell';
import Tabs from 'arui-feather/tabs';
import TabItem from 'arui-feather/tab-item';
import Amount from 'arui-feather/amount';

import Expanse from './components/expanse/expanse';
import Incomes from './components/incomes/incomes';

import sortBy from 'lodash/sortBy';


function App() {

  let storageState = localStorage.getItem('state');
 
  const [date, setDate] = useState( moment());
  const [tabSelected, setTabSelected] = useState('expanse');
  const [transactions, setTransactions] = useState([]);

  if (storageState !== null && storageState.transactions?.length !== 0 && transactions.length === 0) {
    storageState = JSON.parse(storageState);
    
    setTabSelected(storageState.tabSelected);
    setTransactions(storageState.transactions);
    setDate(moment(storageState.date));
  } 

  useEffect(() => {
    if (transactions.length !== 0) {
      localStorage.setItem('state', JSON.stringify({ tabSelected, transactions, date: date.format() }));
    }
    
  })

  const renderAmount = (sum) => {
    const AMOUNT = {
      value: sum,
      currency: {
        code: 'RUR',
        minority: 1,
      }
    };
    return (
      <Amount
        amount={AMOUNT}
      />
    )
  }

  const onToday = () => {
    
    const currentMonthTransaction = transactions.filter(
      ({ date: transactionDate }) => moment(transactionDate, 'DD.MM.YYYY').isSame(date, 'month')
    );

    const dailyMoney = currentMonthTransaction.reduce(
      (acc, transaction) => transaction.sum > 0 ? transaction.sum + acc : acc, 0
    );

    const dailyExpanse = currentMonthTransaction.reduce(
      (acc, transaction) => transaction.sum < 0 ? transaction.sum + acc : acc, 0
    );

    const newDailyMoney = dailyMoney - Math.abs(dailyExpanse);

    return newDailyMoney / moment(date).daysInMonth();
  }

  const handleCalendarChange = (date) => {
    const newDate = date.split('.');
    setDate(moment(`${newDate[2]}-${newDate[1]}-${newDate[0]}`));
    
  }

  const handleSubstractDay = () => {
    
    setDate(moment(date).subtract(1, 'day'));
    
  }

  const handleAddDay = () => {
    
    setDate(moment(date).add(1, 'day'));
    
  }

  const handleTabSelectedClick = (event) => {
    setTabSelected(event.target.getAttribute('id'));
  }

  const handleSubmitTransaction = (sum, category) => {

    const newTransaction = {
      date: date.format('DD.MM.YYYY'),
      category,
      sum
    }

    setTransactions(sortBy([...transactions, newTransaction], ['date']));
  }
  
  return (
    <div className="App">
      <h1>
        Reactивный бюджет
      </h1>
      <div className="row">
        <CalendarInput
          value={date.format('DD.MM.YYYY')}
          onChange={ handleCalendarChange }
        />
      </div>
      <div className="row">
        <Button
          size={'s'}
          view='action'
          onClick={handleSubstractDay}
        >
          <IconSell />
        </Button>
        <Button
          size={'s'}
          view='action'
          onClick={handleAddDay}
        >
          <IconBuy />
        </Button>
      </div>
      <div className="row">
        <Tabs>
          <TabItem
            onClick={handleTabSelectedClick}
            checked={tabSelected === 'expanse'}
            id='expanse'
          >
            Расходы
          </TabItem>
          <TabItem
            onClick={handleTabSelectedClick}
            checked={tabSelected === 'incomes'}
            id='incomes'
          >
            Доходы
          </TabItem>
        </Tabs>
      </div>
      <div className="row">
        {
          tabSelected === 'expanse' ? (
            <Expanse onSubmit={handleSubmitTransaction} />
          ) : (
            <Incomes onSubmit={handleSubmitTransaction} />
          )

        }
      </div>
      <div className="row">
        На сегодня: {renderAmount(onToday())}
      </div>
      <div className='row'>
        <table>
          <thead>
            <tr>
              <th>
                Дата:
              </th>
              <th>
                Сумма:
              </th>
              <th>
                Категория:
              </th>
            </tr>
          </thead>
          <tbody>
            {
              transactions
                .filter(
                  ({ date: transactionDate }) => moment(transactionDate, 'DD.MM.YYYY').isSame(date, 'month')
                )
                .map(
                  (item, index) => (
                    <tr key={index} >
                      <td>
                        {item.date}
                      </td>
                      <td>
                        {renderAmount(item.sum)}
                      </td>
                      <td>
                        {item.category}
                      </td>
                    </tr>
                  )
                )
            }
          </tbody>
        </table>

      </div>
    </div>
  );

}

export default App;
