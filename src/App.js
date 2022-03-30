import { Route, Routes } from 'react-router-dom';
import Identification from './Components/Identification/Identification';
import Main from './Components/Main/Main'
import Idcard from './Components/IdCard/Idcard';
import Terms from './Components/Terms/Terms'
import Video from './Components/Video/Video'
import Camera from './Components/Camera/Camera'
import Layout from './Layout/Layout';
import NotFound from './Components/NotFound/NotFound.jsx';
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { Alert } from '@mui/material';

function App(){
    const [id, setId] = useState(null);

  return(
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route 
              index element={<Main
              setId={setId}
              />}
              />

            <Route 
              path='identification' 
              element={<Identification 
              id={id}
              />}
              />

            <Route 
              path='idcard' 
              element={<Idcard 
              id={id}
              />}
              />

            <Route 
              path='camera' 
              element={<Camera 
              id={id}
              />}
              />

            <Route
              path='terms' 
              element={<Terms 
              id={id}
              // openError={openError}
              // openInfo={openInfo}
              // openSuccess={openSuccess}
              // openWarning={openWarning}
              />}
              />

            <Route 
              path='video' 
              element={<Video 
              id={id}
              // openError={openError}
              // openInfo={openInfo}
              // openSuccess={openSuccess}
              // openWarning={openWarning}
              />}
              />

            <Route 
              path="*" 
              element={<NotFound/>}
            />

            <Route
              path='alert'
              element={<Alert
              // setError={openError}
              // setSuccess={setSuccess}
              // setInfo={setInfo}
              // setWarning={setWarning}
              />}
              />


        </Route>
      </Routes>
    </div>
  )
}

export default App;