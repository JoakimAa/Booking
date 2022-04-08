import useGetResourceById from '@/hooks/useGetResourceById'

export default function Resource({resource, index, checkedState, handleOnChange}) {
    const [ resourceById ]  = useGetResourceById(resource?.resourceId)

    return (
        <>
        <li key={index}>
            <div className="resources-list-item">
                <div className="left-section">
                <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={resourceById?.name}
                    value={resourceById?.name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                />
                <label htmlFor={`custom-checkbox-${index}`}>{resourceById?.name}</label>
                </div>
            </div>
            </li>
        </>    
    )
}




