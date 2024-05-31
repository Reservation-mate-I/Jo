import React from 'react';
import { UserProvider } from './UserContext';
import Navigation from './Navigation';

const App = () => {
  return (
    <UserProvider>
      <Navigation/>
    </UserProvider>
  );
};

export default App;