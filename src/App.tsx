import axios from 'axios'
import { Table, TableProps } from 'components'
import { useQuery } from 'react-query'
import { CitiesRes } from 'types'

const citiesFetcher = async (): Promise<TableProps['data']> => {
  const { data } = await axios.get<CitiesRes[]>('http://localhost:5173/cities.json')

  const records = data.map((record, i) => ({
    id: i,
    columns: [record.country, record.subcountry], // Object.values(record)
  }))

  const columns = [
    {
      width: 10,
      name: 'id',
      label: 'ID',
    },
    {
      width: 20,
      name: 'country',
      label: 'Country',
      sortable: true,
    },
    {
      width: 20,
      name: 'sub-country',
      label: 'Sub Country',
      sortable: true,
    },
  ]
  return {
    columns,
    records,
  }
}

function App() {
  const { data, isError, isLoading } = useQuery<TableProps['data']>({
    queryKey: ['cities'],
    staleTime: Infinity,
    keepPreviousData: true,
    queryFn: citiesFetcher,
  })

  return (
    <main className="">
      <Table data={data} isLoading={isLoading} isError={isError} />
    </main>
  )
}

export default App
