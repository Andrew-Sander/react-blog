import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Profile from './Profile';
import Navbar from './Navbar';
import Home from './Home';
import { RequireAuth } from './RequireAuth';
import React, { useState, useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Login } from './Login';
Amplify.configure(awsExports)

function App() {

  return (
    <Authenticator.Provider>
      <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={
              <RequireAuth>
                <Create />
              </RequireAuth>
              } 
            />
            <Route path='/blogs/:id' element={<BlogDetails />} />
            <Route path='/profile' element={<RequireAuth>
                <Profile />
              </RequireAuth>} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </Authenticator.Provider>
    
  );
}

export default App;
