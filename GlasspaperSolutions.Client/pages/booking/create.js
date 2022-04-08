import { useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/router'

import ResourceModal from '@/components/ResourceModal'
import SelectResources from '@/components/SelectResources'
import { HOST } from '@/lib/constants/constants'

export default function CreateBookingForm() {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    type: '',
    owner: '',
    resources: [],
  })

  const openModal = () => {
    setIsOpen(true)
  }

  const handleInputOnChange = ({ currentTarget: { name, value } }) => {
    setForm((state) => ({ ...state, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.post(`${HOST.API_URL}/api/bookings`, form).catch((err) => {
      console.log(err.message)
    })
    router.push('/')
  }

  return (
    <>
      <div>
        <button id="btnAddResource" type="button" onClick={openModal}>
          Add new Resource
        </button>
      </div>
      <form className="booking_form" onSubmit={handleSubmit}>
        <h2>New Booking</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputOnChange}
            value={form.name}
            required={true}
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            required={true}
            onChange={handleInputOnChange}
            value={form.type}
          />
        </div>
        <div>
          <label htmlFor="owner">Owner</label>
          <input
            type="text"
            id="owner"
            name="owner"
            required={true}
            onChange={handleInputOnChange}
            value={form.owner}
          />
        </div>
        <div>
          <h3>Select Resources</h3>
          <ul className="resources-list">
            <SelectResources setForm={setForm} />
          </ul>
        </div>
        <div>
          <button id="createBooking" type="submit">
            Create Booking
          </button>
        </div>
      </form>
      <ResourceModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
