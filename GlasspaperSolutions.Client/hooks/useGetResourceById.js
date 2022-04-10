import { useCallback, useEffect, useState } from 'react'

import createAxiosRequest from '@/lib/utils/createAxiosRequest'

export default function useGetResourceById(resourceId) {
  const [resource, setResource] = useState()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const getResource = useCallback(async () => {
    try {
      const response = await createAxiosRequest({
        method: 'GET',
        url: `/resources/${resourceId}`,
      })

      if (response?.status === 200) {
        setResource(response.data)
        setLoading(false)
      }
    } catch (err) {
      setError('There has been an error getting resource')
      console.log('There has been an error getting resource')
    }
  }, [resourceId])

  useEffect(() => {
    getResource()
  }, [getResource])

  return [resource, loading, error]
}
