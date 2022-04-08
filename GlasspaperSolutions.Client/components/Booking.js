import Resource from '@/components/Resource'
import formatDate from '@/lib/utils/formatData'
import BookingModal from '@/components/BookingModal'
import { useState } from 'react';
import useGetBookingById from '@/hooks/useGetBookingById'
import axios from 'axios'
import { HOST } from '@/lib/constants/constants'


export default function Booking({booking}){
    const [isOpen, setIsOpen] = useState(false);
    const [isBookingUpdated, setIsBookingUpdated] = useState(false)
    const [updatedBooking] = useGetBookingById(booking, isBookingUpdated, setIsBookingUpdated);

    const book = () => {
        setIsOpen(true)
    }

    const cancelBooking = async () => {
        const {lender, startTime, endTime, ...rest} = booking
        
        let form = {
            ...rest,
            lender: "",
            startTime: null,
            endTime: null,
        }

        console.log("form", form)

        await axios
        .put(`${HOST.API_URL}/api/bookings/${booking?.bookingId}`, form)
        setIsBookingUpdated(true)
    }

    return (
        <>
        <article>
            <div id="bookingArticle">
                <h2>{updatedBooking?.name}</h2>
                <p>Type: {updatedBooking?.type}</p>
                <p>Owner: {updatedBooking?.owner}</p>
                <p>{updatedBooking?.lender ? "Lender: " + updatedBooking?.lender : "Available" }</p>
                <p>{updatedBooking?.startTime ? "From: " + formatDate(updatedBooking?.startTime) : ""}</p>
                <p>{updatedBooking?.endTime ? "To: " + formatDate(updatedBooking?.endTime) : ""}</p>
            </div>
                {!updatedBooking?.lender ? (
                    <button 
                        className="btnBooking"
                        type="button"
                        onClick={book}>
                        Book
                    </button>
                ):
                updatedBooking?.lender && (
                    <button 
                        className="btnBooking"
                        id="btnCancelBooking"
                        type="button"
                        onClick={cancelBooking}>
                        Cancel booking
                    </button>
                )}
            <h3>Resources</h3>
            {updatedBooking?.resources?.map((resource, index) => (
                <Resource key={index} resource={resource} />
            ))}
            <BookingModal isOpen={isOpen} setIsOpen={setIsOpen} booking={updatedBooking} setIsBookingUpdated={setIsBookingUpdated} />
            
        </article>
        </>
    )
}
