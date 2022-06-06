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
import React, { useState } from "react";
function App(){

  //Variables
  const [id, setId] = useState(null);
  const [secretWord, setSecretWord] = useState(null)
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
          setSecretWord={setSecretWord}
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
          secretWord={secretWord}
          />}
          />

        <Route 
          path="*" 
          element={<NotFound/>}
        />
        <Route 
          path='finish'
          id={id}
          element={<Finish
        />}
        />   


      </Route>
    </Routes>
  </div>
)
}

export default App;