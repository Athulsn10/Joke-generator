import React, { useState } from 'react';
import ConfettiComponent from './Confetti';
import axios from 'axios';
import './App.css';


const App = () => {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [joke, setJoke] = useState('');
  const [count, setCount] = useState(0);
  const [wcount, setWCount] = useState(0);
  const [runConfetti, setRunConfetti] = useState(false);
  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
      setJoke(response.data.joke);
      setWCount(wcount + 1);
    } catch (error) {
      console.error('Error fetching joke:', error.message);
    }
    if (!audioPlayed) {
      const audio = document.getElementById('myAudio');
      if (audio) {
        audio.play();
        setAudioPlayed(true);
      }
    }
  };

  const handleClick = () => {
    setRunConfetti(true);
    //confetti delay
    setTimeout(() => {
      setRunConfetti(false);
    }, 2000);
    setCount(count + 1);
    const audio = document.getElementById('myAudio');
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudioPlayed(false);
    }
  };

  return (
    <>
      <div className="app container-fluid mt-5">
      <audio id="myAudio" autoPlay loop>
        <source src="tutu1.mp3" type="audio/mp3" />
      </audio>
        <div className='d-flex align-items-center justify-content-center'>
          <button className='mt-3 btn btn-danger' style={{ color: 'white' }} onClick={fetchJoke}>
            Make Joke
          </button>
        </div>
        <p style={{color:'white'}} className='mt-2 d-flex justify-content-center score'>Your Score So Far: {wcount}</p>
        <div className='my-5 joke d-flex align-items-center justify-content-center mx-5  '>
          {joke && <p>{joke}</p>}
        </div>
        <ConfettiComponent runConfetti={runConfetti} />
        <div className='d-flex align-items-center justify-content-center'>
          <button id='clickButton' onClick={handleClick} className='btn btn-success'>
          Click If I Make You Laugh!
          </button>
        </div>
        <p style={{color:'white'}} className='d-flex justify-content-center'>Number of times you laughed: {count}</p>
      </div>
    </>
  );
};

export default App;
