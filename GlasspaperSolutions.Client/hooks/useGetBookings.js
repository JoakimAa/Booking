import { useEffect, useState } from 'react'
import axios from 'axios'
import { HOST } from '@/lib/constants/constants'

export default function useGetBookings() {
const [bookings, setBookings] = useState()
    
const getBookings = async () => {
    try {
        const response = await axios.get(`${HOST.API_URL}/api/bookings`)
        if (response?.status == 200) {            
            setBookings(response.data)
        }
    } catch (error) {
        /*  setErrorMessage(
            `There has been an error getting bookings: ${error.response.status}`
            ) */
            console.log('There has been an error getting bookings')
        }
    }
    
    useEffect(() => {
        getBookings()
    }, [])

    return [bookings]
}
