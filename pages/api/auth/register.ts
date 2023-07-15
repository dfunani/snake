import type { NextApiRequest, NextApiResponse } from 'next'
import {createOne} from "@/services/database/connection"
import { generateHash, comparePassword } from '@/services/auth/hash'

type Data = {
    name: string
    password: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    createOne({email: req.body.email, username: req.body.username, password: generateHash(req.body.password)})
    res.status(200).json({ name: req.body.email, password: req.body.password})
}