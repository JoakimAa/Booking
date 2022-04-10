import React, { useState } from 'react'

import { useRouter } from 'next/router'
import Modal from 'react-modal'

import CreateAxiosRequest from '@/lib/utils/createAxiosRequest'

Modal.setAppElement('#grid')

export default function ResourceModal({ isOpen, setIsOpen }) {
  const router = useRouter()

  const [resourceForm, setResourceForm] = useState({
    name: '',
    category: '',
    bookings: [],
  })

  const handleInputOnChange = ({ currentTarget: { name, value } }) => {
    setResourceForm((state) => ({ ...state, [name]: value }))
  }

  const onSubmit = async () => {
    // event.preventDefault()

    await CreateAxiosRequest({
      method: 'POST',
      url: '/resources',
      data: resourceForm,
    }).catch((err) => {
      console.log(err.message)
    })

    console.log('form', resourceForm)
    setIsOpen(false)
    router.push('/booking/create')
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
        <label htmlFor="name">Name</label>
        <input
          className="formSpacer"
          type="text"
          name="name"
          id="name"
          placeholder="Placeholder for name"
          onChange={handleInputOnChange}
          value={resourceForm?.name}
          required={true}
        />
        <label htmlFor="category">Category</label>
        <input
          className="formSpacer"
          type="text"
          name="category"
          id="category"
          placeholder="Placeholder for category"
          onChange={handleInputOnChange}
          value={resourceForm?.category}
          required={true}
        />
        <button id="addResource" type="submit">
          Add Resource
        </button>
      </form>
    </Modal>
  )
}
