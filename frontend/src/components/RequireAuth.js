import React from 'react';

import { Navigate } from 'react-router-dom';

export default function RequireAuth({loggedIn, children}) {
  return loggedIn ? children : <Navigate to="/signin"/>
}
