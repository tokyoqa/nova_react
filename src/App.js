import { Route, Routes } from 'react-router-dom';
import Identification from './Components/Identification/Identification';
import Main from './Components/Main/Main'
import Finish from './Components/Finish/Finish'
import Idcard from './Components/IdCard/Idcard';
import Terms from './Components/Terms/Terms'
import Video from './Components/Video/Video'
import Camera from './Components/Camera/Camera'
import Layout from './Layout/Layout';
import NotFound from './Components/NotFound/NotFound';
import VideoAgreement from './Components/VideoAgreement/Agreement'
import SelfiePassport from './Components/SelfiePassport/SelfiePassport';
import React, { useState } from "react";
function App(){ 
 
return(
  <div>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route 
          index element={<Main
          />}
        />
        <Route 
          path='identification' 
          element={<Identification 
          />}
        />
        <Route 
          path='idcard' 
          element={<Idcard 
          />}
        />
        <Route 
          path='camera' 
          element={<Camera 
          />}
        />
        <Route 
          path='selfie-passport' 
          element={<SelfiePassport 
          />}
        />
        <Route
          path='terms' 
          element={<Terms 
          />}
        />
        <Route 
          path='video' 
          element={<Video 
          />}
        />
        <Route 
          path='video-agreement' 
          element={<VideoAgreement
          />}
        />
        <Route 
          path="*" 
          element={<NotFound/>}
        />
        <Route 
          path='finish'
          element={<Finish
        />}
        />   
      </Route>
    </Routes>
  </div>
)
}

export default App;