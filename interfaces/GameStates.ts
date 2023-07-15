import { signIn } from "next-auth/react";
export enum GameState {
  login = "Log In!",
  register = "Register Now!",
  logout = "Log Out!",
  playing = "Game On!",
  gameover = "Game Over!",
  start = "Start Game",
  leaderboard = "Leaderboard"
}

export enum LeaderboardState {
    personal = "Scores",
    leaderboard = "Leaderboard"
}