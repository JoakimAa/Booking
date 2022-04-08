import { useEffect, useState } from 'react'

import useGetResources from '@/hooks/useGetResources'

export default function Resource({ setForm }) {
  const [dropDownResources] = useGetResources()
  const [checkedState, setCheckedState] = useState([''])

  const handleOnChange = (position) => {
    /*   console.log('checkedState', checkedState) */

    /* console.log('position', position) */
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )

    /*   console.log('updatedCheckedState', updatedCheckedState) */

    setCheckedState(updatedCheckedState)

    const resources = updatedCheckedState.reduce(
      (accumulator, currentState, index) => {
        /*  console.log('############')
        console.log('accumulator', accumulator)
        console.log('currentState', currentState)
        console.log('index', index)
        console.log('############') */
        if (currentState === true) {
          /* console.log('dropdown', dropDownResources[index])
          console.log('resources', resources) */

          return [...accumulator, dropDownResources[index]]
        }

        return accumulator
      },
      []
    )

    setForm((state) => ({ ...state, resources }))
  }

  useEffect(() => {
    setCheckedState(new Array(dropDownResources?.length).fill(false))
  }, [dropDownResources])

  return (
    <>
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
    </>
  )
}
