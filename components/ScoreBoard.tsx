import { countDownAtom, gameState } from "@/data/StateManager";
import { GameState } from "@/interfaces/GameStates";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import {
  AiFillStar,
  AiFillTrophy,
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { useRecoilState } from "recoil";


type props = {
    startGame: () => void
    highscore: number
    score: number
}
export default function ScoreBoard({startGame, score, highscore}: props) {
  const [gameStatus, setGameStatus] = useRecoilState<GameState | null>(gameState);
  const [countDown, setCountDown] = useRecoilState<number>(countDownAtom)


  return (
    <>
      <section className="row row-cols-2 fs-3 ms-3 me-3">
        
        <div className="score d-flex flex-column justify-content-center align-items-start text-nowrap mt-4">
          <p className="p-0 m-0">
            <AiFillStar />
            Score: {score}
          </p>
          <p className="p-0 m-0">
            <AiFillTrophy />
            Highscore: {highscore > score ? highscore : score}
          </p>
        </div>
        {gameStatus === GameState.start && countDown > 0 ? (
          <button onClick={() => setGameStatus(() => GameState.playing)}>
            {countDown === 4 ? "Start Game" : countDown}
          </button>
        ) : (
          <div className="controls d-flex flex-column justify-content-center align-items-end mt-4">
            <p className="p-0 m-0">How to Play?</p>
            <p className="p-0 m-0">
              <AiOutlineArrowDown />
              <AiOutlineArrowLeft />
              <AiOutlineArrowRight />
              <AiOutlineArrowUp />
            </p>
          </div>
        )}
        <div className="menu d-flex flex-row justify-content-between mt-2 w-100">
          <button className="btn btn-dark m-1 w-25" onClick={() => startGame()} type="submit">Start</button>
          <button className="btn btn-dark m-1" disabled={gameStatus === GameState.playing || gameStatus === GameState.start} onClick={() => setGameStatus(() => GameState.leaderboard)} type="submit">Leaderboard</button>
          <button className="btn btn-dark m-1 w-25" onClick={() => signOut()} type="submit">Sign Out</button>
        </div>
      </section>
    </>
  );
}
