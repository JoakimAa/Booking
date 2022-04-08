import { useRouter } from "next/router"
import { useEffect, useState } from 'react'

export default function Product(){
    const router = useRouter()
    const [id, setId] = useState()
    return (
        <p>Product</p>
    )
}
