import { useState } from 'react';
import { styled } from 'styled-components';
import Header from './Components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import UserContext from './Contexts/UserContext';
import Background from './Components/Background';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewService from './Components/ViewService';


export default function App() {
  const [user, setUser] = useState({name:"Darlan", city_name:"Novo Hamburgo"});
  const [searchText, setSearchText] = useState("");
  const [showAuthenticate, setShowAuthenticate] = useState(false);
  const [showService, setShowService] = useState(false);
  const [currentFilter,setCurrentFilter] =useState("All");

  return (
    <UserContext.Provider value={{ user, setUser, searchText, setSearchText, showAuthenticate, setShowAuthenticate, currentFilter,setCurrentFilter,showService, setShowService }}>
      <BrowserRouter>
        <Header />
        <Background />
        <ToastContainer/>
       {showService &&  <ViewService/>}
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
