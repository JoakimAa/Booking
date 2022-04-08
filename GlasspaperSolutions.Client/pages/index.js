import { useState } from 'react'

import Head from 'next/head'

import Booking from '@/components/Booking'
import useGetBookings from '@/hooks/useGetBookings'

export default function Bookings() {
  const [isBookingDeleted, setIsBookingDeleted] = useState(false)

  const [bookings] = useGetBookings(isBookingDeleted, setIsBookingDeleted)

  return (
    <>
      <Head>
        <title>Booking</title>
      </Head>
      <h1>Bookings</h1>
      <div id="bookingFlex">
        {bookings?.map((booking, index) => (
          <Booking
            key={index}
            booking={booking}
            setIsBookingDeleted={setIsBookingDeleted}
          />
        ))}
      </div>
    </>
  )
}
