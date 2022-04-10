import { useState } from 'react'

import BookingModal from '@/components/BookingModal'
import Resource from '@/components/Resource'
import useGetBookingById from '@/hooks/useGetBookingById'
import createAxiosRequest from '@/lib/utils/createAxiosRequest'
import formatDate from '@/lib/utils/formatData'

export default function Booking({ booking, setIsBookingDeleted }) {
  const [toggleBookingModal, setToggleBookingModal] = useState(false)
  const [toggleEditModal, setToggleEditModal] = useState(false)
  const [isBookingUpdated, setIsBookingUpdated] = useState(false)
  const [updatedBooking, loading, error] = useGetBookingById(
    booking,
    isBookingUpdated,
    setIsBookingUpdated
  )

  const cancelBooking = async () => {
    const { lender, startTime, endTime, ...rest } = booking

    const form = {
      ...rest,
      lender: '',
      startTime: null,
      endTime: null,
      isBooked: false,
    }

    await createAxiosRequest({
      method: 'PUT',
      url: `/bookings/${booking?.bookingId}`,
      data: form,
    }).catch((err) => {
      console.log(err.message)
    })

    setIsBookingUpdated(true)
  }

  const deleteBooking = async () => {
    await createAxiosRequest({
      method: 'DELETE',
      url: `/bookings/${booking?.bookingId}`,
    }).catch((err) => {
      console.log(err.message)
    })

    setIsBookingDeleted(true)
  }

  return (
    <>
      <article>
        <p>{error}</p>
        {!loading && (
          <>
            <div>
              <div id="bookingArticle">
                <h2>{updatedBooking?.name}</h2>
                <p>Type: {updatedBooking?.type}</p>
                <p>Owner: {updatedBooking?.owner}</p>
                <p>
                  {updatedBooking?.isBooked
                    ? `Lender: ${updatedBooking?.lender}`
                    : 'Available'}
                </p>
                <p>
                  {updatedBooking?.startTime
                    ? `From: ${formatDate(updatedBooking?.startTime)}`
                    : ''}
                </p>
                <p>
                  {updatedBooking?.endTime
                    ? `To: ${formatDate(updatedBooking?.endTime)}`
                    : ''}
                </p>
              </div>
              {!updatedBooking?.isBooked ? (
                <button
                  className="btnControl"
                  id="btnBook"
                  type="button"
                  onClick={() => setToggleBookingModal(true)}
                >
                  Book
                </button>
              ) : (
                updatedBooking?.isBooked && (
                  <button
                    className="btnControl"
                    id="btnCancelBooking"
                    type="button"
                    onClick={cancelBooking}
                  >
                    Cancel booking
                  </button>
                )
              )}
              <h3>Resources</h3>
              {updatedBooking?.resources?.map((resource, index) => (
                <Resource key={index} resource={resource} />
              ))}
            </div>
            <div className="controlButtons">
              {updatedBooking?.isBooked && (
                <button
                  className="btnControl"
                  id="btnEdit"
                  type="button"
                  onClick={() => setToggleEditModal(true)}
                >
                  Edit
                </button>
              )}
              <button
                className="btnControl"
                id="btnDelete"
                type="button"
                onClick={deleteBooking}
              >
                Delete
              </button>
            </div>
            <BookingModal
              isOpen={toggleBookingModal}
              setIsOpen={setToggleBookingModal}
              booking={updatedBooking}
              setIsBookingUpdated={setIsBookingUpdated}
            />
            <BookingModal
              isOpen={toggleEditModal}
              setIsOpen={setToggleEditModal}
              booking={updatedBooking}
              setIsBookingUpdated={setIsBookingUpdated}
            />
          </>
        )}
      </article>
    </>
  )
}
