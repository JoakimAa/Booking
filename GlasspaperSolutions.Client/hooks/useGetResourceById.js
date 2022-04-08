import { useCallback, useEffect, useState } from 'react'

import axios from 'axios'

import { HOST } from '@/lib/constants/constants'

export default function useGetResourceById(resourceId) {
  const [resource, setResource] = useState()

  const getResource = useCallback(async () => {
    try {
      const response = await axios.get(
        `${HOST.API_URL}/api/resources/${resourceId}`
      )

      if (response?.status === 200) {
        /* console.log(response.data) */

        setResource(response.data)
      }
    } catch (error) {
      /*  setErrorMessage(
            `There has been an error getting resource: ${error.response.status}`
            ) */
      console.log('There has been an error getting resource')
    }
  }, [resourceId])

  useEffect(() => {
    getResource()
  }, [getResource])

  return [resource]
}
