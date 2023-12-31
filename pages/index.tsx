import Head from "next/head";
// import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useRef, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameState } from "@/data/StateManager";
import { useSession, getProviders, getSession, signOut } from "next-auth/react";
import Authentication from "../components/Authentication";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import GameScreen from "@/components/GameScreen";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  providers
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [gameStatus, setGameStatus] = useRecoilState(gameState);
  const { data: session, status } = useSession();
  
  return (
    <>
      <Head>
        <title>Ayoba SnakeJS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className="text-center">{status === "authenticated" ? "Welcome " + session?.user?.username : "Welcome to Ayoba SnakeJS"}</h1>
        <div className="bg-white rounded-md shadow-lg">
          {status === "authenticated" && <GameScreen/>}
          {/* {status === "authenticated" && <button onClick={() => signOut()}>signOut</button>} */}
          {status === "unauthenticated" && (
            <Authentication providers={providers}/>
          )}
          {status === "loading" && "<Login providers={providers} />"}
        </div>
      </main>
      <footer>
        Copyright &copy; <a href="https://github.com/dfunani">Delali Funani</a>{" "}
        2022 &nbsp;|&nbsp;{" "}
        <a href="https://github.com/dfunani/snake">
          <FaGithub /> Github
        </a>
      </footer>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
