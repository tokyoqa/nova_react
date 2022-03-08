import {Route} from 'react-router-dom'
import Identification from './Components/Identification/Identification';
import Main from './Components/Main/Main'
import Idcard from './Components/IdCard/Idcard';
import Terms from './Components/Terms/Terms'
import Video from './Components/Video/Video'
import Camera from './Components/Camera/Camera'
import { Component } from 'react';
import {AppBar, Container, Toolbar, Typography} from '@mui/material';
 


function App(){
  

  return(
    <div>
      <AppBar position='fixed' style={{background: '#0d844e'}}>
        <Container>
          <Toolbar>
            <Typography>Айыл Банк</Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Main/>
    </div>
  )
}

export default App;