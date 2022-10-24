import { useSnackbar } from 'notistack'

import { api } from '../api'
import { useQuery } from '@tanstack/react-query'

export const fetchData = async (endpoint: string): Promise<any> => {
  const res = await api.get(endpoint)
  return res?.data
}

export const useFetchData = (
  key: string,
  endpoint: string,
  queryOptions?: {}
): any => {
  const { enqueueSnackbar } = useSnackbar()

  const { data, isLoading, error, isFetching, isError, refetch } = useQuery(
    [key],
    () => fetchData(endpoint),
    queryOptions
  )

  if (isError) {
    enqueueSnackbar('There was an error fetching data', {
      variant: 'error',
    })
  }

  return { data, isFetching, error, isLoading, refetch }
}

export default useFetchData
