import { useEffect, useState } from 'react'

import axios from 'axios'

import { HOST } from '@/lib/constants/constants'

export default function useGetResources() {
  const [resources, setResources] = useState()

  const getResources = async () => {
    try {
      const response = await axios.get(`${HOST.API_URL}/api/resources`)

      if (response?.status === 200) {
        setResources(response.data)
      }
    } catch (error) {
      /*  setErrorMessage(
            `There has been an error getting Resources: ${error.response.status}`
            ) */
      console.log('There has been an error getting resources')
    }
  }

  useEffect(() => {
    getResources()
  }, [])

  return [resources]
}
