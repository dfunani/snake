import { findOne } from "@/services/database/connection";
import { WithId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WithId<any>|null>
) {
  let data = await findOne({ email: req.body.email, password: req.body.password })
    res.status(200).json(data)
}
