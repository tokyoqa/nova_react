import React from "react";
import './Voice.css'

function Voice(){
    return(
        <div className="container-fluid align-center">
        <h1>Speech to Text</h1>
        <div className="app">
            <div className="row">
                <div className="col-md-6 align-center">
                    <h3>Нажмите кнопку старт и начните говорить</h3>
                    <div className="input-single">
                        <textarea id="note-textarea" placeholder="Конвертированый текст!" rows="6"></textarea>
                    </div>
                    <button id="start-record-btn" className="btn-success" title="Start Recording">Start Recognition</button>
                    <button id="pause-record-btn" className="btn-warning" title="Pause Recording">Pause Recognition</button>
                    <button id="save-note-btn" className="btn-info" title="Save Note">Save Note</button>
                    <p id="recording-instructions">Press the
                        <strong>Start Recognition</strong> button and allow access.</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Voice;