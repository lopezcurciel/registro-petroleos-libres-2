import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('¡Nuevo cliente!', req.body);
    res.status(200).json({ ok: true, mensaje: 'Recibido correctamente' });
  } else {
    res.status(405).end();
  }
}
