import { GameState, LeaderboardState } from "@/interfaces/GameStates"
import {atom, selector} from "recoil"


import React from 'react'


export const gameState = atom<GameState | null>({
    key: 'game-state',
    default: GameState.login
})


export const countDownAtom = atom<number>({
    key: 'Count-Down',
    default: 4
})


export const leaderboardSelected = atom<LeaderboardState>({
    key: 'Leader-Board',
    default: LeaderboardState.personal
})
