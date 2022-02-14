import React from 'react';

function InfoToolTips({isOpen, onClose, onPopupClick, InfoToolTips}) {
  const textInfo = `${InfoToolTips ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`
  const imageInfo = `${InfoToolTips ? 'popup__image_type_success' : 'popup__image_type_fail'}`
  
  return (
    <div className={`popup ${isOpen ? 'popup_open' : ''}`} onClick={onPopupClick}>
      <button type="button" className="popup__close-button" onClick={onClose}></button>
      <div className="popup__container">
        <div className={imageInfo}/> 
        <p className="popup__info">{textInfo}</p>
      </div>
    </div>
  )
}

export default InfoToolTips;