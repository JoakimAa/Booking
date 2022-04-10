import { useEffect, useState } from 'react'

/* import axios from 'axios'

import { HEADER_CONFIG } from '@/lib/constants/constants' */
import createAxiosRequest from '@/lib/utils/createAxiosRequest'

export default function useGetBookings(isBookingDeleted, setIsBookingDeleted) {
  const [bookings, setBookings] = useState()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const getBookings = async () => {
    try {
      const response = await createAxiosRequest({
        method: 'GET',
        url: '/bookings',
      })

      if (response?.status === 200) {
        setBookings(response.data)
        setLoading(false)
      }
    } catch (err) {
      setError('There has been an error getting bookings')
      console.log('There has been an error getting bookings')
      console.log('err', err.message)
    }
  }

  useEffect(() => {
    getBookings()
  }, [])

  useEffect(() => {
    getBookings()
    setIsBookingDeleted(false)
  }, [isBookingDeleted, setIsBookingDeleted])

  return [bookings, loading, error]
}
