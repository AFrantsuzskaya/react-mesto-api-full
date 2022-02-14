import React from 'react';
function PopupWithForm({name, onPopupClick, isOpen, onClick, title, onSubmit, children, buttonTitle}) {
  const popupOpenClassName = (`popup popup_${name} page__popup ${isOpen ? 'popup_open' : ''}`);
  return(
  <section className={popupOpenClassName} 
  onClick={onPopupClick}>
    <button type="button" className="popup__close-button" onClick={onClick}></button>
    <div className="popup__container">
      <h2 className="popup__title">{title}</h2>
      <form 
        name={name} 
        className="popup__form page__popup" 
        onSubmit={onSubmit}>
          {children}
        <button type="submit" name="button" className="popup__submit-button">{buttonTitle}</button>
      </form>
    </div>
  </section>
  )
}

export default PopupWithForm;