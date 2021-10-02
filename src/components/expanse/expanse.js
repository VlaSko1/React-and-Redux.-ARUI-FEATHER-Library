import React, { useState }from 'react';
import Input from 'arui-feather/input';
import IconCurrencyRub from 'arui-feather/icon/currency/currency-rub';
import Button from 'arui-feather/button';

function Expanse(props) {
    const { onSubmit } = props;
    const [transation, setTransation ] = useState('');
    const [ category, setCategory ] = useState('');

  
    const handleTransationChange = (number) => {
      setTransation(number);
    }
    const handleCategoryChange = (category) => {
      setCategory( category);
    }
  
    const handleClick = () => {
      
      onSubmit(-1 * Math.abs(parseFloat(transation)), category);
      setTransation('');
      setCategory('');
      
    }
  
  

  
    return (
      <div className='row-flex'>
        <div className='col'>
          <Input
            label='Расходы'
            placeholder="Внесите расходы"
            view='line'
            type='number'
            onChange={ handleTransationChange }
            value={transation}
            icon={
              <IconCurrencyRub size='s' />
            }
          />
        </div>
        <div className='col'>
          <Input
            label='Категория'
            placeholder="Внесите категорию"
            value={category}
            onChange={ handleCategoryChange }
            view='line'
          />
        </div>
        <div className='col'>
          <Button
            view='extra'
            onClick={ handleClick }
          >
            Внести
          </Button>
        </div>

      </div>
    )

}

export default Expanse;