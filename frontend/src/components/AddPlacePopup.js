import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onAddPlace, onClose, onPopupClick}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen])

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name,
      link
    });
  }  

  return(
    <PopupWithForm 
        name="add" 
        title="Новое место" 
        buttonTitle="Создать"
        isOpen={isOpen}
        onClick={onClose} 
        onPopupClick={onPopupClick} 
        onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="place-name" 
          name="name" 
          placeholder="Название" 
          className="popup__field popup__field_type_placename" 
          autoComplete="off" 
          required 
          minLength="2" 
          maxLength="30"
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className="popup__field-error" id="place-name-error"></span>
        <input 
          type="url" 
          id="link" 
          name="link" 
          placeholder="Ссылка на картинку" 
          className="popup__field popup__field_type_link" 
          autoComplete="off" 
          required
          value={link || ''}
          onChange={handleChangeLink}
        />
        <span className="popup__field-error" id="link-error"></span>
      </PopupWithForm>
  )
}

export default AddPlacePopup;