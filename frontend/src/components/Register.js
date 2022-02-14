import React from 'react';
import { Link } from 'react-router-dom';


function Register({onRegister}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
  }

  return (
    <div className="login">
      <h2 className='login__title'>Регистрация</h2>
      <form className='login__form' onSubmit={handleSubmit}>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="email@mail.com" 
          className="login__input login__field_type_email" 
          autoComplete="off" 
          required 
          minLength="3" 
          maxLength="40"
          value={email || ''}
          onChange={handleChangeEmail}
        />
        <span id="email-error" className="popup__field-error"></span>
        <input 
          type="text" 
          id="password" 
          name="password" 
          placeholder=".........." 
          className="login__input login__field_type_password" 
          autoComplete="off" 
          required 
          minLength="8" 
          maxLength="40"
          value={password || ''}
          onChange={handleChangePassword}
        />
        <span id="password-error" className="popup__field-error"></span>
        <button type="submit" className="button login__button">Зарегистрироваться</button> 
      </form>
      <p>Уже зарегистрированы? <Link className="login__navigation" to="/signin">Войти</Link></p>
    </div>
  )
}

export default Register;