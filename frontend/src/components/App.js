import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoToolTips from './InfoToolTips';
import api from '../utils/Api';
import RequireAuth from './RequireAuth';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [infoToolTips, setInfoToolTips] = React.useState(null);
  const [isInfoToolTipsOpened, setIsInfoToolTipsOpened] = React.useState(false);
 
  const navigate = useNavigate();

  React.useEffect(() => {
    setEmail(localStorage.getItem('email'))
    api
      .getAppInfo()
      .then(([user, cards]) => {
        navigate('/')        
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        if(err === 'Ошибка: 401') {
          setLoggedIn(false)
          navigate('/signin')
        } else {
          console.log(`Ошибка загрузки данных: ${err}`)
          navigate('/signin')
        }      
      })
  }, [loggedIn])
   
  React.useEffect(() => {
    if (isProfilePopupOpen || isAddPlacePopupOpen || isAvatarPopupOpen || selectedCard) {
      function handleEsc(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }
      document.addEventListener("keydown", handleEsc)
      return () => {
        document.removeEventListener("keydown", handleEsc)
      }
    }
  }, [isProfilePopupOpen, isAddPlacePopupOpen, isAvatarPopupOpen, selectedCard])

  function checkToken() {
    console.log(document.cookie)
    if (localStorage.getItem('jwt')) {
      auth 
        .checkToken(localStorage.getItem('jwt'))
        .then((res) => {
          if (res.data) {
            setEmail(localStorage.getItem('email'))
            setLoggedIn(true)
            navigate('/')
          } else {
            setLoggedIn(false)
            setEmail('')
          }
        })
      .catch((err) => console.log(`Ошибка проверки токена: ${err}`))
    } 
  }

  function handleLogin (password, email) {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.message = 'успешная авторизация') {
          setLoggedIn(true)
          setEmail(localStorage.getItem('email'))
          navigate('/')
        } else {
          setIsInfoToolTipsOpened(true);
          setInfoToolTips(false)
        }
      })
      .catch(() => {
        setIsInfoToolTipsOpened(true)
        setInfoToolTips(false)
      })
  }

  function handleLogout (event) {
    event.preventDefault()
    setLoggedIn(false)
    localStorage.removeItem('email')
    setEmail('')
    navigate('/signin')
  }

  function handleRegister (password, email) {
    auth
      .register(password, email)
      .then(res => {
        if (res.email) {
          setInfoToolTips(true);
          navigate('/signin')
        } else {
          setInfoToolTips(false);
        }
    })
    .catch(() => {
      setInfoToolTips(false);
    })
    .finally(() => {
      setIsInfoToolTipsOpened(true);
    })
  }
  
  function openAddPlacePopup() {
    setIsAddPlacePopupOpen(true);
  }
  
  function openProfilePopup() {
    setIsProfilePopupOpen(true);
  }
  
  function openAvatarPopup() {
    setIsAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsInfoToolTipsOpened(false);
    setSelectedCard(null);
  }

  function handlePopupClickClose(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  
  function handleUpdateUser(data) {
    api
      .setUserInfo(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups(res);

      })
      .catch((err) => console.log(`Ошибка загрузки данных профиля: ${err}`))
  }
  
  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка загрузки аватара: ${err}`))
  }
  
  function handleAddPlaceSubmit(data) {
    api
     .setCard(data.name, data.link)
     .then(newCard => {
       setCards([newCard, ...cards]);
       closeAllPopups();
     })
     .catch((err) => console.log(`Ошибка загрузки карточки: ${err}`))
  }
  
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => { 
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
   })
      .catch((err) => console.log(`Ошибка постановки/снятия лайка: ${err}`))
  }
  
  function handleCardDelete(card) {
    api
    .removeCard(card._id)
    .then(() => {
      const newCardsList = cards.filter((c) => c._id !== card._id)
      setCards(newCardsList);
    })
    .catch((err) => console.log(`Ошибка удаления карточки: ${err}`))
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header 
        loggedIn={loggedIn}
        exit={handleLogout}
        email={email}/>
      <Routes>
        <Route exact path="/" element={<RequireAuth
          loggedIn={loggedIn}
          ><Main 
          onEditProfile={openProfilePopup} 
          onAddPlace={openAddPlacePopup} 
          onEditAvatar={openAvatarPopup}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}/></RequireAuth>}/>
        <Route path="/signup" element={<Register 
          onRegister={handleRegister}
          />}/>
        <Route path="/signin" element={<Login onLogin={handleLogin}/>}/>
      </Routes>
    <Footer />
    <InfoToolTips 
      isOpen={isInfoToolTipsOpened} 
      onClose={closeAllPopups} 
      onPopupClick={handlePopupClickClose}
      InfoToolTips={infoToolTips}
      />
    <EditProfilePopup 
      isOpen={isProfilePopupOpen} 
      onClose={closeAllPopups}
      onPopupClick={handlePopupClickClose} 
      onUpdateUser={handleUpdateUser}
    />
    <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onPopupClick={handlePopupClickClose}
      onAddPlace={handleAddPlaceSubmit}
    ></AddPlacePopup>
    <EditAvatarPopup
      isOpen={isAvatarPopupOpen}
      onClose={closeAllPopups}
      onPopupClick={handlePopupClickClose} 
      onUpdateAvatar={handleUpdateAvatar}
    ></EditAvatarPopup>
    <ImagePopup 
      card={selectedCard} 
      onClose={closeAllPopups} 
      onPopupClick={handlePopupClickClose}/>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
