import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({email, loggedIn, exit}) {

  const { pathname } = useLocation();
    
  const path = `${pathname === "/signin" ? "/signup" : "/signin"}`;
  const textPath = `${pathname === "/signin" ? "Регистрация" : "Войти"}`;
  
  return(
      <header className="header page__header">
        <a href="#0" className="logo header__logo" alt='Логотип проекта'> </a>
        {loggedIn ? (
          <div className="header__navigation">
            <p className="header__navigation_type_email">{email}</p>
            <Link className="header__navigation_type_link" to="/signin" onClick={exit}>Выйти</Link>
          </div>
        ) : (
          <Link to={path} className="header__navigation_type_link">{textPath}</Link>
        )}
        </header>
    )
}

export default Header;