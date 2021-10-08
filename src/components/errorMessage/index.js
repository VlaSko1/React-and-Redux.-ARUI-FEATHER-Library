import React from "react";

export default function ErrorMessage(props) {

  return (
    <>
      {(props.error) ? (
        <div className='message__error'>
          <div className='message__error_container'>
            <p>Необходимо заполнить все поля ввода</p>
          </div>
          <div className='closeMini' onClick={props.closeErrorMessage}></div>
        </div>) : (null)
      }
    </>
  )

}