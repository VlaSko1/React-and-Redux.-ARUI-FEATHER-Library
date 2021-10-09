import React from 'react';
import { useDispatch } from 'react-redux';
import Button from 'arui-feather/button';
import IconBuy from 'arui-feather/icon/ui/buy';
import IconSell from 'arui-feather/icon/ui/sell';

import { createSubstractDay, createAddDay } from '../../store/date';


function Buttons() {

  const dispatch = useDispatch();

  const handleSubstractDay = () => {
    dispatch(createSubstractDay());

  }

  const handleAddDay = () => {
    dispatch(createAddDay());
 
  }

  return (
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
  )
}

export default Buttons;