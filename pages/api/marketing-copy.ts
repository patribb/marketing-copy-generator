// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { openai } from '../../utils/constants';

type Data = {
  result: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { input } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Usted es un experto en marketing y un cliente se acerca a usted para escribir una copia de marketing breve y muy interesante para él o ella. Este es el tema que les gustaría una copia de marketing sobre el tema de '${input}.'\n\nEsta es la breve copia de marketing que se te ocurrió:`,
    max_tokens: 200,
    temperature: 0.85,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });
  const suggestion = response.data?.choices?.[0].text;
  if(suggestion === undefined) {
    throw new Error('No se encontraron sugerencias')
  }
  res.status(200).json({ result: suggestion  })
}
