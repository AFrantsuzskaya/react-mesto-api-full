import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onUpdateAvatar, onClose, onPopupClick}) {
  const avatarRef = React.useRef();
  
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }
  
  return (
    <PopupWithForm 
        name="avatar" 
        title="Обновить аватар" 
        buttonTitle="Сохранить"
        isOpen={isOpen} 
        onClick={onClose} 
        onPopupClick={onPopupClick}
        onSubmit={handleSubmit}>
        <input 
          type="url" 
          id="avatar" 
          name="avatar" 
          placeholder="Ссылка" 
          className="popup__field popup__field_type_avatar" 
          autoComplete="off" 
          required
          ref={avatarRef} />
        <span id="avatar-error" className="popup__field-error"></span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;