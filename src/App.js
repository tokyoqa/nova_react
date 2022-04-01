import { Route, Routes } from 'react-router-dom';
import Identification from './Components/Identification/Identification';
import Main from './Components/Main/Main'
import Idcard from './Components/IdCard/Idcard';
import Terms from './Components/Terms/Terms'
import Data from './Components/Data/Data'
import Video from './Components/Video/Video'
import Camera from './Components/Camera/Camera'
import Layout from './Layout/Layout';
import NotFound from './Components/NotFound/NotFound.jsx';
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
              />}
              />

            <Route 
              path='video' 
              element={<Video 
              id={id}
              />}
              />

            <Route 
              path="*" 
              element={<NotFound/>}
            />
            <Route
              path='data'
              element={<Data 
              id={id}/>}
            />
            </Route>
      </Routes>
    </div>
  )
}

export default App;