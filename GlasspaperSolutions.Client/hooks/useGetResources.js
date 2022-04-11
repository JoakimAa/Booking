import { useEffect, useState } from 'react'

import createAxiosRequest from '@/lib/utils/createAxiosRequest'

export default function useGetResources() {
  const [resources, setResources] = useState()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const getResources = async () => {
    try {
      const response = await createAxiosRequest({
        method: 'GET',
        url: '/resources',
      })

      if (response?.status === 200) {
        setResources(response.data)
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      setError('There has been an error getting resources')
      console.log('There has been an error getting resources ', err)
    }
  }

  useEffect(() => {
    getResources()
  }, [])

  return [resources, loading, error]
}
