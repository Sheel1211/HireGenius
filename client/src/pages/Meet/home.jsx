import React from 'react'
import '../Meet/CSS/home.css'
import '../Meet/JS/home.js'

const home = () => {
  return (
    <>
      <navbar>
        <div class="logo">QuickMeet</div>
    </navbar>
    
    <div class="main">
    <div class="create-join">
    <div class="text"><div class="head">Create Video Meetings in one-click.</div>
                <div class="subtext">No sign ups required. Open Source platform.</div>
                </div>
                <button id="createroom" class="createroom-butt unselectable">Create Room</button><br/>
                <input type="text" name="room" spellcheck="false" placeholder="Enter Room Code" id="roomcode" class="roomcode"/><br/>
                <div class="joinroom unselectable" id="joinroom">Join Room</div>
    </div>
        <div class="video-cont">
                <video class="video-self" autoplay muted playsinline></video>
                <div class="settings">
                    <div class="device" id="mic"><i class="fas fa-microphone"></i></div>
                    <div class="device" id="webcam"><i class="fas fa-video"></i></div>
                </div>
            </div>
    </div>
    </>
  )
}

export default home
