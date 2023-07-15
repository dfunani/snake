import { leaderboardSelected } from '@/data/StateManager'
import { GameState, LeaderboardState } from '@/interfaces/GameStates'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import DisplayBoard from './DisplayBoard'
import { GetHighScore, GetLeaderBoard } from '@/services/database/connection'
import { useSession } from 'next-auth/react'

export default function Leaderboard() {
    const [selection, setSelection] = useRecoilState(leaderboardSelected)
    const [num, setNum] = useState<number>(10)


    
  return (
    <div className='border border-dark h-75 w-100'>
<ul className="nav nav-tabs">
  <li className="nav-item">
    <a className={`nav-link ${selection === LeaderboardState.personal && "active"}`} onClick={() => setSelection(() => LeaderboardState.personal)} aria-current="page" href="#">{LeaderboardState.personal}</a>
  </li>
  <li className="nav-item dropdown">
          <a className={`nav-link dropdown-toggle ${selection === LeaderboardState.leaderboard && "active"}`} onClick={() => setSelection(() => LeaderboardState.leaderboard)} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Top 10</a></li>
            <li><a className="dropdown-item" href="#">Top 25</a></li>
            <li><a className="dropdown-item" href="#">Top 100</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Rank Me</a></li>
          </ul>
        </li>
  <li className='ms-auto'>
    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-primary" type="submit">Search</button>
    </form>
  </li>
</ul>
<DisplayBoard num={num}/>
    </div>
  )
}
