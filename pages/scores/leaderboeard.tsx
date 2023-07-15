import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    key: {name: string}
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({key: { name: 'Example' }})
}