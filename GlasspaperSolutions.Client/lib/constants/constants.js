export const HEADER_CONFIG = {
  ApiKey: process.env.NEXT_PUBLIC_API_KEY,
}

export const SEARCH_PARAMETERS = [
  {
    filterParameter: 'Booking Name',
    filterParameterValue: 'name',
    filterParameterType: 'booking',
  },
  {
    filterParameter: 'Booking Type',
    filterParameterValue: 'type',
    filterParameterType: 'booking',
  },
  {
    filterParameter: 'Owner',
    filterParameterValue: 'owner',
    filterParameterType: 'booking',
  },
  {
    filterParameter: 'Lender',
    filterParameterValue: 'lender',
    filterParameterType: 'booking',
  },
  {
    filterParameter: 'Resource Name',
    filterParameterValue: 'rname',
    filterParameterType: 'resource',
  },
  {
    filterParameter: 'Resource Category',
    filterParameterValue: 'category',
    filterParameterType: 'resource',
  },
]
