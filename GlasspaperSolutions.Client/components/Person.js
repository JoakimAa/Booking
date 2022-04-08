import Image from 'next/image'

export default function Person({person}) {
    return (
        <>
        <div className="person">
            <h2>{person?.first_name + " " + person?.last_name}</h2>
            <p>{person?.role}</p>
            <figure>
                <Image src={person?.image_path} alt="Avatar" width={250} height={250} />
            </figure>
            <p>{person?.about}</p>
        </div>
        </>    
    )
}