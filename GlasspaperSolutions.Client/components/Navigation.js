import NavLink from 'next/link'

export default function Navigation() {
  return (
    <nav className="nav">
      <NavLink href="/">
        Bookings
      </NavLink>
      <NavLink href="/booking/create">
        New Booking
      </NavLink>
    </nav>
  )
}
