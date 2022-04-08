import { useEffect, useState } from 'react'
import axios from 'axios'
import { HOST } from '@/lib/constants/constants'

export default function useGetResourceById(resourceid) {
const [resource, setResource] = useState()
    
const getResource = async () => {
    try {
        const response = await axios.get(`${HOST.API_URL}/api/resources/${resourceid}`)
        if (response?.status == 200) {       
            /* console.log(response.data) */
                 
            setResource(response.data)
        }
    } catch (error) {
        /*  setErrorMessage(
            `There has been an error getting resource: ${error.response.status}`
            ) */
            console.log('There has been an error getting resource')
        }
    }
    
    useEffect(() => {
        getResource()
    }, [])

    return [resource]
}