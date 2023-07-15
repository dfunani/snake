import { leaderboardSelected } from "@/data/StateManager";
import { LeaderboardState } from "@/interfaces/GameStates";
import { useSession } from "next-auth/react";
import React from "react";
import { useRecoilState } from "recoil";

type props = {
  num: number;
};
export default function DisplayBoard({ num }: props) {
  const { data: session } = useSession();
  const [selection, setSelection] = useRecoilState(leaderboardSelected);

  const getHighScore = async () => {
    let res = await fetch("/api/scores/highscore", {
      method: "POST",
      body: JSON.stringify({ email: session.user.email }),
    });
    return await res.json();
  };

  const getLeaderBoard = async (num: number) => {
    let res = await fetch("/api/scores/leaderboard", {
      method: "POST",
      body: JSON.stringify({ type: num }),
    });
    return await res.json();
  };

  return (
    <>
      {selection === LeaderboardState.personal &&
        <div>{JSON.stringify(getHighScore())}</div>}
        {selection === LeaderboardState.leaderboard &&
        <div>{JSON.stringify(getLeaderBoard(num))}</div>}
    </>
  );
}
