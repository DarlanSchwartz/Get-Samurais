import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Header from './Components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import UserContext from './Contexts/UserContext';
import Background from './Components/Background';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewService from './Components/ViewService';
import axios from 'axios';
import CreateService from './Pages/CreateService';
import EditService from './Pages/EditService';
import Footer from './Components/Footer';


export default function App() {
  const [user, setUser] = useState();
  const [searchText, setSearchText] = useState("");
  const [showAuthenticate, setShowAuthenticate] = useState(false);
  const [showService, setShowService] = useState(false);
  const [currentFilter,setCurrentFilter] =useState("All");
  const [services, setServices] = useState();

  const categories = [
    "All",
    "TI",
    "Lessons",
    "Autos",
    "Consultancies",
    "Tech",
    "Events",
    "Fashion",
    "Repairs",
    "Health",
    "Home"
];

  useEffect(()=>{
    getUserInfo();
    getServices();
  },[])

  function getUserInfo(token)
  {
    const tokenValue = token ? token : localStorage.getItem("token");
      axios.get(`${import.meta.env.VITE_API_URL}/users/me`,{headers:{Authorization:tokenValue}})
      .then(res =>{
        //console.log(res.data);
        setUser(res.data)
      })
      .catch(error =>{
        console.log(error.response.data);
      });
    
  }

  function getServices()
  {
    axios.get(`${import.meta.env.VITE_API_URL}/services`)
    .then(res => {
        setServices(res.data);
        console.log(res.data);
    }).catch(error => {

    });
  }

  return (
    <UserContext.Provider value={{getServices,services, setServices,categories, user, setUser, searchText, setSearchText, showAuthenticate, setShowAuthenticate, currentFilter,setCurrentFilter,showService, setShowService,getUserInfo }}>
      <BrowserRouter>
        <Header />
        <Background />
        <ToastContainer/>
        {showService &&  <ViewService/>}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-service' element={<CreateService />} />
          <Route path='/edit-service/:id' element={<EditService />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
