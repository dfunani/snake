import { GameState } from "@/interfaces/GameStates";

type userType = {
  username: string;
  email: string;
  password: string;
};

export default function register(user: userType): GameState {
  try {
    // MongoDB Connect
    let response: any = fetch("/api/auth/register", {
  method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
}).then(res => res.json()).then(res => res.data)
    
    return response ? GameState.login : GameState.register;
  } catch {
    return GameState.register;
  }
}
