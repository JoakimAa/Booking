import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import ResourceModal from '@/components/ResourceModal'
import SelectResources from '@/components/SelectResources'
import createAxiosRequest from '@/lib/utils/createAxiosRequest'
import createDialog from '@/lib/utils/createDialog'

export default function CreateBookingForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

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

    await createAxiosRequest({
      method: 'POST',
      url: '/bookings',
      data: form,
    })
      .then((response) => {
        // If the response is true we will send a success message to the user
        console.log('response', response)

        if (response?.status === 201) {
          createDialog(
            'Success!',
            'Your booking has been added',
            'success',
            3000
          )
        }

        setTimeout(() => router.push('/'), 3000)
      })
      .catch((err) => {
        createDialog('Oops!', err, 'error', 3000)
      })
  }

  useEffect(() => {
    if (form.name !== '' && form.owner !== '' && form.type !== '')
      setIsButtonDisabled(false)
    else setIsButtonDisabled(true)
  }, [form])

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
          <button
            disabled={isButtonDisabled}
            className={isButtonDisabled ? 'btnDisabled' : 'btnEnabled'}
            id="createBooking"
            type="submit"
          >
            Create Booking
          </button>
        </div>
      </form>
      <ResourceModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
