"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
const page = () => {
  
  const [hitValue,setHitValue] = useState(0);
  const [timer,setTimer] = useState(59);
  const [scoreValue,setScoreValue] = useState(0);
  const [isGameOver,setIsGameOver] = useState(false);
  const [message,setMessage] = useState('');
  const timerRef=useRef<NodeJS.Timeout | number>(0);

  // Generate random numbers once on mount
  const randomNumbers = useMemo(()=>{
    return Array.from({length:98},()=>Math.floor(Math.random()*10+1))
  },[scoreValue]);

  // Handle timer countdown
 const handleTimer = () => {
  timerRef.current = setInterval(()=>{
    setTimer(prev=>{
      if(prev<=1){
        clearInterval(timerRef.current);
        setIsGameOver(true);
        setMessage("Oops you lose");
        return 0;
      }
      return prev-1;
    });
  },1000);
 }

//  Handle bubble click
  const handleScore = (e:React.MouseEvent,num:number) => {
    if(num=== hitValue){
      setScoreValue(prev=>prev+10);
    if(scoreValue===90){
      setIsGameOver(true);
      setMessage("Congrats you won")
    }
   

    
      // Generate new hit value
      setHitValue(Math.floor(Math.random()*10+1));
    }
  }



  // New Game
  const newGame = () => {
    setIsGameOver(false);
    setScoreValue(0);
    setTimer(60);
    handleTimer();
  }

  // Initialize game
  useEffect(()=>{
    setHitValue(Math.floor(Math.random()*10+1));
    handleTimer();

    // Cleanup interval on unmount
    return () => {
      if (timerRef.current)
          clearInterval(timerRef.current);
    }
  },[]);

  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-bl from-zinc-700 to-zinc-900 min-h-screen'>
     
      {isGameOver?(
              <div className=' flex flex-col items-center space-y-5 '>
              <h1 className='text-3xl font-bold'>Game Over! Final Score: {scoreValue}</h1>
              <h2 className={`${scoreValue===100?'text-green-500':'text-red-500'} text-2xl rounded-lg p-2`}>{message}</h2>
              <p className='text-xl'>Click on New Game Button to Play Again</p>
              <button
              onClick={newGame}
              className='bg-violet-600 text-xl hover:bg-violet-700 p-2 rounded-md  cursor-pointer'>New Game</button>
        </div>
      ):(
        <div className='flex flex-col items-center my-5 justify-center'>
            <h1 className='text-3xl font-bold  mb-5'>Bubble Game</h1>
           <div className='space-x-10 text-xl mb-5'>
      <span>{`Hit: ${hitValue}`}</span>
      <span>{`Timer: ${timer}`}</span>
      <span>{`Score : ${scoreValue}`}</span>
      </div>
      <div
        className='flex  flex-wrap w-[80%] h-[80%]  rounded-2xl'>
              {randomNumbers.map((num,i)=>(
                
                <button 
               
                onClick={(e)=>handleScore(e,num)}
                key={i+1} className={` bg-green-600 hover:bg-green-700 mx-3 my-3  cursor-pointer rounded-full w-15 h-15`}>{num}</button>
              ))}
  
        </div>
        </div>
        
      )}
    </div>
  )
}

export default page
