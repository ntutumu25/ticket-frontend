import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParam } from 'react-router-dom'
import './App.css';
import { useAppContext } from './AppProvider';

//importacion de componente fueras del BrowserRouter
import Navbar from './component/navbar/navbar';
import Footer from './component/footer/footer';

//importacion de componentes de urls
import Dashboard from './component/dashboard/dashboard';
import Login from './component/login/login';
import TicketSpace from './component/ticket/ticket';
import WorkSpace from './component/userWorkSpace/workSpace';
import FirstLogin from './component/firstLogin/first-login';
//


function App() {
  const { sms } = useAppContext()
  


  return (
    <BrowserRouter>    
      <Navbar/>
        <Routes>
          <Route path='/' element={<WorkSpace />}/>
          <Route path='/auth/login' element={<Login/>}/> 
          <Route path='/first/login' element={<FirstLogin/>}/> 
        </Routes>
      {/* <Footer/> */}
    </BrowserRouter> 
  );
}

export default App;
