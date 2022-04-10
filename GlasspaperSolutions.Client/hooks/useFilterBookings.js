import { useState, useEffect } from 'react'

// A custom hook to filter the bookings
export default function useFilterBookings(
  bookings,
  filterParameter,
  filterParameterValue
) {
  const [filteredBookings, setFilteredBookings] = useState()

  const addToFilteredBookings = (filteredBooking) => {
    setFilteredBookings((state) => [...state, filteredBooking])
  }

  useEffect(() => {
    setFilteredBookings([])

    if (!filterParameter) {
      setFilteredBookings(bookings)
    } /* if (filterParameter)  */ else {
      bookings
        ?.filter((booking) =>
          booking?.[filterParameter]
            ?.toLowerCase()
            .includes(filterParameterValue?.toLowerCase())
        )
        .map((filteredBooking) => addToFilteredBookings(filteredBooking))
    }
  }, [bookings, filterParameter, filterParameterValue])

  return [filteredBookings]
}
