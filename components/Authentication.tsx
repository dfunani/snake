import React, { useEffect, useRef } from "react";
import { gameState } from "@/data/StateManager";
import { useRecoilState } from "recoil";
import {
  ClientSafeProvider,
  LiteralUnion,
  getSession,
  signIn,
  signOut,
} from "next-auth/react";
import { GameState } from "@/interfaces/GameStates";
import { BuiltInProviderType } from "next-auth/providers";
import { FaGithub } from "react-icons/fa";
import styles from "@/styles/Home.module.css";
import { AiTwotoneMail } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import register from "@/services/auth/register";
import { useRouter } from "next/router";

type props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export default function SignIn({ providers }: props) {
  const email = useRef("");
  const password = useRef("");
  const username = useRef("");
  const [gameStatus, setGameStatus] = useRecoilState(gameState);

  
  return (
    <div className="h-100 d-flex">
      <div className="w-100 d-flex flex-column justify-content-evenly">
        <div className="h-100 w-100">
          <form
            action="#"
            className="h-100 w-100 d-flex flex-column align-items-evenly justify-content-evenly"
          >
            <h3 className="text-center register">{gameStatus}</h3>
            <div className="d-flex flex-column align-items-center justify-content-center w-100">
              {gameStatus === GameState.register && (
                <div
                  className={`input-group w-25 bg-dark rounded-3 ${styles.username}`}
                >
                  <span className="input-group-text" id="basic-addon1">
                    <BiSolidUser className="fs-5" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => (username.current = e.target.value)}
                  />
                </div>
              )}

              <div
                className={`input-group w-25 bg-dark rounded-3 ${styles.email}`}
              >
                <span className="input-group-text" id="basic-addon2">
                  <AiTwotoneMail className="fs-5" />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon2"
                  onChange={(e) => (email.current = e.target.value)}
                />
              </div>

              <div
                className={`input-group w-25 bg-dark rounded-3 ${styles.password}`}
              >
                <span className="input-group-text" id="basic-addon3">
                  <MdPassword className="fs-5" />
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon3"
                  onChange={(e) => (password.current = e.target.value)}
                />
              </div>

              <div className="text-center m-1">
                <a href="#" className="">
                  Forgot Password?
                </a>
              </div>
              <div className="text-center w-100">
                <button
                  type="button"
                  className="w-25 rounded-2 btn btn-dark"
                  onClick={() =>
                    gameStatus !== GameState.register
                      ? signIn("credentials", {
                          email: email.current,
                          password: password.current,
                        })
                      : setGameStatus(() =>
                          register({
                            email: email.current,
                            password: password.current,
                            username: username.current,
                          })
                        )
                  }
                >
                  {gameStatus === GameState.register ? "Register" : "Log In"}
                </button>
              </div>
            </div>

            <div className="text-center">
              <span className="">
                <span className=""></span>
                <span className="">or login with</span>
                <span className=""></span>
              </span>
              <div className="flex flex-col space-y-4">
                {providers &&
                  Object.values(providers).map((provider) => {
                    if (provider.name !== "Credentials") {
                      return (
                        <div key={provider.name} style={{ marginBottom: 0 }}>
                          <a
                            href="#"
                            className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 rounded-md group hover:bg-gray-800 focus:outline-none"
                            onClick={() => signIn(provider.id)}
                          >
                            {provider.name.toLowerCase() === "github" && (
                              <FaGithub className="fs-3" />
                            )}
                          </a>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </form>
        </div>

        {gameStatus !== GameState.register && (
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account? </span>
            <a
              href="#"
              onClick={() => setGameStatus(() => GameState.register)}
              className="underline"
            >
              Create Account
            </a>
          </p>
        )}

        {gameStatus === GameState.register && (
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Already have an account? </span>
            <a
              href="#"
              onClick={() => setGameStatus(() => GameState.login)}
              className="underline"
            >
              Login
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
