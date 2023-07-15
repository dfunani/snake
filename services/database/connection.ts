import { dbConnect } from "../database/mongodb";
import { comparePassword } from "@/services/auth/hash";

type doc = {
    username?: string;
    email: string;
    password: string
}

export async function createOne(document: doc) {
  let { db } = await dbConnect();

  const user = await db.collection("snake-user").insertOne(document);
  return user;
}

export async function findOne(document: doc) {
  let { db } = await dbConnect();

  const user = await db
    .collection("snake-user")
    .findOne({ email: document.email });
  if (!user) return null;
  return comparePassword(document.password, user.password) ? user : null
}

import React from 'react'

export function GetHighScore() {
  return {highscores: []}
}


export function GetLeaderBoard() {
  return {leaderboard: []}
}
