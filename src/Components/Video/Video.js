import React, { useRef, useState, useCallback } from "react";
import "./Video.css";
import Webcam from "react-webcam";
import axios from "axios";
import '../../Config';

export default function Video({id}) {

    const [file, setFile] = useState()


	const uploadVideo = (event) => {
        file(event.target.files[0])
        file (event.target.files[0])
    };

      const sendVideo = () => {
      const formData = new FormData();

      formData.append(
        "video",
        file,
        file.name
      );
      formData.append(
          'id',
          id
      )
	  
	  axios
	  (
		  {
			url: global.config.REST_API + 'api/video',
			method: 'POST',
			formData,
			headers: {
			  'Content-Type': 'application/json',
			  'Accept': 'application/json',
			  'Access-Control-Allow-Origin': '*',
			  'Access-Control-Allow-nHeaders': '*',
			  'Access-Control-Allow-Methods': '*',
			  "Access-Control-Allow-Origin": "https://ident.ab.kg:9443/",
			  "Access-Control-Allow-Credentials": "true",
			  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
			   mode: 'no-cors'
			  }

		   }
	  )
			.then(res=>console.log(res))
			.catch(error =>{
				if (error.responce){
					console.log(error.response.status);
				}
				else if(error.request){
					console.log(error.request);
				}
				else {
					console.log(error.message);
				}
			})
		




}
 return(
    <>
   		  <input type="file"  onChange={uploadVideo}/>
		  <button onClick={sendVideo}>Send Video</button>

    </>
  		);
}