import Booking from '@/components/Booking'
import useGetBookings from '@/hooks/useGetBookings'
import Head from 'next/head'

export default function Bookings(){
    const [bookings] = useGetBookings()

    return (
    <>  
        <Head >
            <title>Booking</title>
        </Head>
        <h1>Bookings</h1>
        <div id="bookingFlex">
            {bookings?.map((booking, index) => (
                <Booking key={index} booking={booking} />
            ) )
            }
        </div>
    </>
    )
}