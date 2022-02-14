function ImagePopup({card, onPopupClick, onClose}) {
  const imagePopupOpenClassName =(`popup popup_type_image ${card ? 'popup_open' : ''}`)
   
  return card === null ? (
    <div style={{display: `none`}}> </div>
   ) : (
    <section 
      className={imagePopupOpenClassName} 
      onClick={onPopupClick}
    >
      <div className="popup__image-container">
        <button 
          type="button" 
          className="popup__close-button popup__close-button_block_image" 
          onClick={onClose}
        ></button>
        <img 
          className="popup__image" 
          src={card.link} 
          alt={card.name}
        />
        <h2 className="popup__name-title">{card.name}</h2>
      </div>
    </section>
    
   )  
}

export default ImagePopup;
