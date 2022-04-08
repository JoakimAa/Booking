
import Modal from 'react-modal'
import React, { useEffect, useState } from 'react';
import DateTime from 'react-datetime'
import moment from "moment";
import 'moment/locale/nb';
import axios from 'axios'
import { HOST } from '@/lib/constants/constants'
import "react-datetime/css/react-datetime.css";
import ResourceModal from '@/components/ResourceModal'

Modal.setAppElement('#grid');

export default function BookModal({isOpen, setIsOpen, booking, setIsBookingUpdated}) {
  /* const [ checkedState, setCheckedState ] = useState([""]); */
  
  const [datesForm, setDatesForm] = useState({
    startTime: "",
    endTime: "",
  })

  const [bookingForm, setBookingForm] = useState({
    ...booking,
    lender: "",
  })
  
  var yesterday = moment().subtract( 1, 'day' );
  var valid = function( current ){
    return current.isAfter( yesterday );
  }

  let inputProps = {
    placeholder: 'N/A',
  }
    
  const handleDateOnChangeStart = (moment, name) => {
    setDatesForm((state) => ({ ...state, [name]: moment}));
  }

  const handleInputOnChange = ({ 
    currentTarget: { name, value }}) => {
    setBookingForm((state) => ({ ...state, [name]: value }))
    }

  /* const handleOnChange = (position) => {
    console.log("checkedState", checkedState)
    console.log("position", position)
    const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
    );

    console.log("updatedCheckedState",updatedCheckedState)
    
    setCheckedState(updatedCheckedState);

    const resources = updatedCheckedState.reduce(
        (accumulator, currentState, index) => {
            console.log("############")
            console.log("accumulator",accumulator)
            console.log("currentState",currentState)
            console.log("index",index)
            console.log("############")
            if (currentState === true) {
                console.log("dropdown", bookingForm?.resources[index])
                console.log("resources", resources)
                return [...accumulator, bookingForm?.resources[index]]
            }
            return accumulator
        },
        []
    )

    setBookingForm((state) => ({...state, resources}))
  }; */


/*useEffect(() => {
    setCheckedState(new Array(booking?.resources?.length).fill(false))
  }, [booking]) */
   

  const onSubmit = async (event) => {
    //event.preventDefault()    
      let form = {
      ...bookingForm,
      startTime: datesForm?.startTime?.toISOString(), 
      endTime: datesForm?.endTime?.toISOString()
    }
  
    console.log("bookingForm")

    await axios.put(`${HOST.API_URL}/api/bookings/${booking.bookingId}`, form)
    console.log("form", form)
    setIsOpen(false);
    setIsBookingUpdated(true)
  }

  return (
    <Modal id="booking-modal"
      shouldCloseOnEsc={true}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}>
      <button 
        id="btnClose"
        onClick={() => setIsOpen(false)}>
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
          onChange={moment => handleDateOnChangeStart(moment, "startTime")}
        />
        <label htmlFor="endTime">To</label>
        <DateTime 
          closeOnSelect={true}
          name="endTime"
          id="endTime" 
          isValidDate={valid} 
          inputProps={inputProps} 
          value={datesForm?.endTime}
          onChange={moment => handleDateOnChangeStart(moment, "endTime")}
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
        {/* <div>
            <h3>Select Resources</h3>
            <ul className="resources-list">
                {booking?.resources?.map((resource, index) => (
                    <ResourceModal resource={resource} key={index} index={index} checkedState={checkedState} handleOnChange={handleOnChange}/>
                ))}
            </ul>
        </div> */}
        <button type="submit">
          Book
        </button>
      </form>
    </Modal>
  )
}

