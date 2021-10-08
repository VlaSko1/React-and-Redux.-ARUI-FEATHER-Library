import React from 'react';
import Tabs from 'arui-feather/tabs';
import TabItem from 'arui-feather/tab-item';
import { useSelector, useDispatch } from 'react-redux';
import { getTabSelected, createChangeTabSelected } from '../../store/tabSelected';



function Tabses() {

  const dispatch = useDispatch();

  
  let tabSelected = useSelector(getTabSelected);

  const handleTabSelectedClick = (event) => {
    dispatch(createChangeTabSelected(event.target.getAttribute('id')));
    
  }


  return (
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
  )
}

export default Tabses;