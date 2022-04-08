import { useState, useEffect } from 'react'
import axios from 'axios'
import { HOST } from '@/lib/constants/constants'
import { useRouter } from 'next/router'
import useGetResources from '@/hooks/useGetResources'

export default function BookingForm() {
    const [ dropDownResources ] = useGetResources()
    const [ checkedState, setCheckedState ] = useState([""]);

    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        type: '',
        owner: '',
        resources: [],
      })

    const handleOnChange = (position) => {
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
                    console.log("dropdown", dropDownResources[index])
                    console.log("resources", resources)
                    return [...accumulator, dropDownResources[index]]
                }
                return accumulator
            },
            []
        )

        setForm((state) => ({...state, resources}))
        console.log('form', form)
    };


    useEffect(() => {
        setCheckedState(new Array(dropDownResources?.length).fill(false))
    }, [dropDownResources])


    const handleInputOnChange = ({ currentTarget: { name, value } }) => {
        setForm((state) => ({ ...state, [name]: value }))
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()
          await axios
            .post(`${HOST.API_URL}/api/bookings`, form)
            .catch((err) => {
              console.log(err.message)
            })
            router.push(`/`);
        }
    
    return (
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
                {dropDownResources?.map(({ name }, index) => (
                    <li key={index}>
                    <div className="resources-list-item">
                        <div className="left-section">
                        <input
                            type="checkbox"
                            id={`custom-checkbox-${index}`}
                            name={name}
                            value={name}
                            checked={checkedState[index]}
                            onChange={() => handleOnChange(index)}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                        </div>
                    </div>
                    </li>
                ))}
            </ul>
        </div>
        <button id="sendIssue" type="submit">
            Create Booking
        </button>
        </form>
    )
}