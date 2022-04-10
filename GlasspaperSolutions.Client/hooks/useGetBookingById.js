import { useCallback, useEffect, useState } from 'react'

import createAxiosRequest from '@/lib/utils/createAxiosRequest'

export default function useGetBookingById(
  booking,
  isBookingUpdated,
  setIsBookingUpdated
) {
  const [updatedBooking, setBooking] = useState(booking)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const getBookingById = useCallback(async () => {
    try {
      /*       console.log('Booking:', booking)
       */
      const response = await createAxiosRequest({
        method: 'GET',
        url: `/bookings/${booking.bookingId}`,
      })

      if (response?.status === 200) {
        setBooking(response.data)
        setLoading(false)
      }
    } catch (err) {
      setError('There has been an error getting booking')
      console.log('There has been an error getting Booking')
    }
  }, [booking])

  // Used to get the Booking
  useEffect(() => {
    getBookingById()
  }, [getBookingById])

  useEffect(() => {
    if (isBookingUpdated) {
      setIsBookingUpdated(false)
      getBookingById()
    }
  }, [getBookingById, isBookingUpdated, setIsBookingUpdated])

  return [updatedBooking, loading, error]
}
