import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SideBarToggleProvider } from './context/sideBarToggle'
import { AuthContextProvider } from './context/authContext';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SideBarToggleProvider>
      <AuthContextProvider>
        <Navbar />
        <App />
        <SideBar />
        <Footer />
      </AuthContextProvider>
    </SideBarToggleProvider>
  </BrowserRouter>
);


