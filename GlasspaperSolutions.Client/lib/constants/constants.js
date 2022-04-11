export const HEADER_CONFIG = {
  ApiKey: process.env.NEXT_PUBLIC_API_KEY,
}

export const SEARCH_PARAMETERS = [
  {
    filterParameter: 'Booking Name',
    filterParameterValue: 'name',
  },
  {
    filterParameter: 'Booking Type',
    filterParameterValue: 'type',
  },
  {
    filterParameter: 'Owner',
    filterParameterValue: 'owner',
  },
  {
    filterParameter: 'Lender',
    filterParameterValue: 'lender',
  },
]
