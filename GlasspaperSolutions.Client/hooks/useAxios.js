import { useState, useEffect } from 'react'

import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

export default function useAxios(axiosParams) {
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = async (params) => {
    try {
      const result = await axios.request(params)

      setResponse(result.data)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(axiosParams)
  }, [axiosParams])

  return { response, error, loading }
}
