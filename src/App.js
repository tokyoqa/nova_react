import { Route, Routes } from 'react-router-dom';
import Identification from './Components/Identification/Identification';
import Main from './Components/Main/Main'
import Idcard from './Components/IdCard/Idcard';
import Terms from './Components/Terms/Terms'
import Video from './Components/Video/Video'
import Camera from './Components/Camera/Camera'
import Layout from './Layout/Layout';
import NotFound from './Components/NotFound/NotFound.jsx';
import axios from "axios";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { Update } from '@mui/icons-material';



function App(){

  return(
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<Main/>}/>
            <Route path='identification' element={<Identification/>}/>
            <Route path='idcard' element={<Idcard/>}/>
            <Route path='camera' comment={<Camera/>}/>
            <Route path='terms' element={<Terms/>}/>
            <Route path='video' element={<Video/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;