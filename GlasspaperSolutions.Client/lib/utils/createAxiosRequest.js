import axios from 'axios'

import { HEADER_CONFIG } from '@/lib/constants/constants'

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`

export default async function createAxiosRequest(axiosParams) {
  const result = await axios.request({
    ...axiosParams,
    headers: HEADER_CONFIG,
  })

  const response = result

  return response
}
