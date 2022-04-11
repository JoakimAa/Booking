import { useState } from 'react'

import Head from 'next/head'

import Booking from '@/components/Booking'
import useFilterBookings from '@/hooks/useFilterBookings'
import useGetBookings from '@/hooks/useGetBookings'
import { SEARCH_PARAMETERS } from '@/lib/constants/constants'

export default function Bookings() {
  const [isBookingDeleted, setIsBookingDeleted] = useState(false)
  const filterParameters = SEARCH_PARAMETERS
  const [filterParameter, setFilterParameter] = useState()
  const [filterParameterValue, setFilterParameterValue] = useState()

  const handleInputOnChange = ({ currentTarget: { value } }) => {
    setFilterParameter(value)

    console.log(filterParameter)
  }

  const handleInputOnChangeValue = ({ currentTarget: { value } }) => {
    setFilterParameterValue(value)
    console.log(filterParameterValue)
  }

  const [bookings, loading, error] = useGetBookings(
    isBookingDeleted,
    setIsBookingDeleted
  )
  const [filteredBookings] = useFilterBookings(
    bookings,
    filterParameter,
    filterParameterValue
  )

  return (
    <>
      <Head>
        <title>Booking</title>
      </Head>
      <h1>Bookings</h1>
      <div id="search">
        <select
          id="severityDropdown"
          className="grey"
          name="filterParameter"
          onChange={handleInputOnChange}
        >
          <option value="">Filters</option>
          {filterParameters?.map((value) => (
            <option
              key={value.filterParameterValue}
              name={value.filterParameterType}
              value={value.filterParameterValue}
            >
              {value?.filterParameter}
            </option>
          ))}
        </select>
        <label hidden htmlFor="filterParameterValue">
          Search
        </label>
        <input
          className="formSpacer"
          type="text"
          name="filterParameterValue"
          id="filterParameterValue"
          placeholder="Search"
          onChange={handleInputOnChangeValue}
          value={filterParameterValue?.name}
          required={true}
        />
      </div>
      <div id="bookingFlex">
        {!loading &&
          filteredBookings?.map((booking, index) => (
            <Booking
              key={index}
              booking={booking}
              setIsBookingDeleted={setIsBookingDeleted}
            />
          ))}
        <p>{error}</p>
      </div>
    </>
  )
}
