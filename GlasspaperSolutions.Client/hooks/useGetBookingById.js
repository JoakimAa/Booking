import { useCallback, useEffect, useState } from 'react'

import axios from 'axios'

import { HOST } from '@/lib/constants/constants'

// Got inspiration from this. Source: https://dev.to/omarmoataz/react-using-custom-hooks-to-reuse-stateful-logic-11a7

export default function useGetBookingById(
  booking,
  isBookingUpdated,
  setIsBookingUpdated
) {
  const [updatedBooking, setBooking] = useState(booking)

  const getBookingById = useCallback(async () => {
    try {
      console.log('Booking:', booking)

      const response = await axios.get(
        `${HOST.API_URL}/api/bookings/${booking.bookingId}`
      )

      if (response?.status === 200) {
        setBooking(response.data)
      }
    } catch (error) {
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

  return [updatedBooking]
}
