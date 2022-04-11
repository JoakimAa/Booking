import axios from 'axios'

export default async function handler(req, res) {
  const { method } = req

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  switch (method?.toLowerCase()) {
    case 'get':
      axios.get(`${process.env.API_URL}/api/bookings`, {
        headers: {
          'Access-Control-Allow-Origin': true,
          ApiKey: process.env.API_KEY,
        },
        mode: 'cors',
        rejectUnauthorized: false,
      })

      break
    default:
      res.status(405).end()
  }
}
