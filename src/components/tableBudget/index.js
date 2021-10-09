import React, {useCallback} from 'react';
import { useSelector } from 'react-redux';
import Amount from 'arui-feather/amount';
import moment from 'moment';

import { getDate } from '../../store/date';
import { getTransactions } from '../../store/transactions';
import { transactionsApi } from '../../api/firebase/request';

function TableBudget() {
  let date = useSelector(getDate);
  const transactions = useSelector(getTransactions);

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
  };

  const onToday = useCallback (() => {
    
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
        
    let remainsDayMoney = (moment(date).daysInMonth() - moment(date).date() !== 0) ? (moment(date).daysInMonth() - moment(date).date()) : 1;
    return newDailyMoney / remainsDayMoney;  //return newDailyMoney / moment(date).daysInMonth();
  }, [date, transactions]);

  const deleteTransaction = (e) => {
    let idToDelete = e.target.getAttribute('id');
    
    transactionsApi.deleteTransactions(idToDelete);
  }


  return (
    <>
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
              <th>
                Удалить
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
                      <td className='delete'>
                        <div className='close' id={item.id} onClick={deleteTransaction}></div>
                      </td>
                    </tr>
                  )
                )
            }
          </tbody>
        </table>

      </div>
    </>
  )
}

export default TableBudget;