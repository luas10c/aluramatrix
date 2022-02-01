import { NextApiRequest, NextApiResponse } from 'next';

export default function(request: NextApiRequest, response: NextApiResponse) {
  return response.json({ message: 'ok!' })
}