import axios from 'axios'
import { StateProps, CitiesRes } from 'types'
import { slug } from 'utils'

export const citiesFetcher = async ({ pagination, globalFilter, sorting, columnFilters }: StateProps) => {
  const { data } = await axios.get<CitiesRes[]>('http://localhost:5173/cities.json')

  // Prepare data
  let records = data.map((record, i) => ({
    id: i,
    ...record,
  }))
  records = records.filter((record) => record.country === 'United States')

  /**
   * Helper function to prepare values be be filtered
   */
  const prepare = (record: number | string) =>
    String(record)
      .split(' ')
      .map((v) => slug(v))

  // Global filter logic
  if (globalFilter) {
    records = records.filter((record) =>
      Object.values(record).some((col) => prepare(globalFilter).every((word) => prepare(col).find((word2) => word2.includes(word))))
    )
  }

  // Filter colummns logic
  columnFilters.forEach((filter) => {
    records = records.filter((record) =>
      prepare(filter.value as string).every((word) => prepare((record as any)[filter.id]).find((word2) => word2.includes(word)))
    )
  })

  // Sorting logic
  if (sorting[0]) {
    const { id, desc } = sorting[0]

    const func = (a: any, b: any) => {
      if (desc) return a[id] < b[id] ? 1 : -1
      return a[id] > b[id] ? 1 : -1
    }

    records = records.sort(func)
  }

  // Pagination logic
  const pageCount = Math.ceil(records.length / pagination.pageSize)
  records = records.slice(pagination.pageIndex * pagination.pageSize, (pagination.pageIndex + 1) * pagination.pageSize)

  return { records, pageCount }
}
