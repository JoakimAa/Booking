import 'react-datetime/css/react-datetime.css'
import 'moment/locale/nb'
import React, { useState } from 'react'

import moment from 'moment'
import DateTime from 'react-datetime'
import Modal from 'react-modal'

import CreateAxiosRequest from '@/lib/utils/createAxiosRequest'

Modal.setAppElement('#grid')

export default function BookModal({
  isOpen,
  setIsOpen,
  booking,
  setIsBookingUpdated,
}) {
  const [datesForm, setDatesForm] = useState({
    startTime: /* booking.startTime ??  */ '',
    endTime: /* booking.endTime ?? */ '',
  })

  const [bookingForm, setBookingForm] = useState({
    ...booking,
    lender: /* booking?.lender ?? */ '',
  })

  const yesterday = moment().subtract(1, 'day')
  const valid = function setValidDates(current) {
    return current.isAfter(yesterday)
  }

  const inputProps = {
    placeholder: 'N/A',
  }

  const handleDateOnChangeStart = (date, name) => {
    setDatesForm((state) => ({ ...state, [name]: date }))
  }

  const handleInputOnChange = ({ currentTarget: { name, value } }) => {
    setBookingForm((state) => ({ ...state, [name]: value }))
  }

  const onSubmit = async (/* event */) => {
    // event.preventDefault()
    const form = {
      ...bookingForm,
      isBooked: true,
      startTime: moment(datesForm?.startTime, 'YYYY-MM-DDT HH:mm:ss').format(),
      endTime: moment(datesForm?.endTime, 'YYYY-MM-DDT HH:mm:ss').format(),
    }

    await CreateAxiosRequest({
      method: 'PUT',
      url: `/bookings/${booking?.bookingId}`,
      data: form,
    }).catch((err) => {
      console.log(err.message)
    })

    console.log('form', form)
    setIsOpen(false)
    setIsBookingUpdated(true)
  }

  return (
    <Modal
      id="booking-modal"
      shouldCloseOnEsc={true}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <button id="btnClose" onClick={() => setIsOpen(false)}>
        Close
      </button>
      <form id="modal_form" onSubmit={onSubmit}>
        <label htmlFor="startTime">From</label>
        <DateTime
          closeOnSelect={true}
          locale="nb"
          dateFormat="DD.MM.YY"
          id="startTime"
          isValidDate={valid}
          inputProps={inputProps}
          value={datesForm?.startTime}
          onChange={(date) => handleDateOnChangeStart(date, 'startTime')}
        />
        <label htmlFor="endTime">To</label>
        <DateTime
          closeOnSelect={true}
          name="endTime"
          id="endTime"
          isValidDate={valid}
          inputProps={inputProps}
          value={datesForm?.endTime}
          onChange={(date) => handleDateOnChangeStart(date, 'endTime')}
        />
        <label htmlFor="lender">Lender</label>
        <input
          className="formSpacer"
          type="text"
          name="lender"
          id="lender"
          placeholder="Placeholder for lender"
          onChange={handleInputOnChange}
          value={bookingForm?.lender}
          required={true}
        />
        <button type="submit">Book</button>
      </form>
    </Modal>
  )
}
