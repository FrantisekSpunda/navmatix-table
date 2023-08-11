import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { citiesFetcher } from 'api'
import { IndeterminateCheckbox, Table } from 'components'
import React from 'react'
import { useQuery } from 'react-query'
import { CitiesRes, StateProps } from 'types'

const columns: ColumnDef<CitiesRes & { id: number }, any>[] = [
  {
    accessorKey: 'geonameid',
    enableColumnFilter: false,
    footer: (props) => props.column.id,
    enableSorting: false,
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    header: 'City',
    accessorKey: 'name',
    footer: (props) => props.column.id,
  },
  {
    header: 'Subcountry',
    accessorKey: 'subcountry',
    footer: (props) => props.column.id,
  },
  {
    header: 'Country',
    accessorKey: 'country',
    footer: (props) => props.column.id,
  },
]

function App() {
  // State for manual changes of table state. We need this, because we use backend for pagination, sorting, filtering etc.
  const [state, setState] = React.useState<StateProps>({
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [],
    globalFilter: '',
    columnFilters: [],
    rowSelection: {},
  })

  /**
   * - Helper function to set state of one property in "state".
   * - For example if we need to change "state.pagination" we can do:
   * ```
   * setProperty('pagination', (prev) => ({ ...prev, pageIndex: 0 }))
   * ```
   */
  const setProperty = React.useCallback(
    (property: keyof StateProps) => (value: any) =>
      setState((prev) => {
        if (typeof value === 'function') return { ...prev, [`${property}`]: value(prev[property]) }
        else return { ...prev, [`${property}`]: value }
      }),
    []
  )

  // Fetch filtered, ordered data. Data are cached with React Query to queryClient.
  const { data } = useQuery({
    queryKey: ['cities', state.globalFilter, state.columnFilters, state.sorting, state.pagination],
    queryFn: () => citiesFetcher(state),
    keepPreviousData: true,
  })

  const table = useReactTable<CitiesRes & { id: number }>({
    columns,
    data: data?.records || [],
    getCoreRowModel: getCoreRowModel(),

    manualPagination: true,
    onPaginationChange: setProperty('pagination'),
    pageCount: data?.pageCount,

    manualSorting: true,
    onSortingChange: setProperty('sorting'),

    manualFiltering: true,
    onGlobalFilterChange: setProperty('globalFilter'),
    onColumnFiltersChange: setProperty('columnFilters'),

    onRowSelectionChange: setProperty('rowSelection'),

    state,
  })

  // Reseting to page 1 if we change filters or ordering.
  React.useEffect(() => {
    setState((v) => ({ ...v, pagination: { ...v.pagination, pageIndex: 0 } }))
  }, [state.sorting, state.globalFilter, state.columnFilters])

  // Reset selection after data are changed
  React.useEffect(() => {
    setState((v) => ({ ...v, rowSelection: {} }))
  }, [data])

  return (
    <main className="">
      <Table table={table} />
    </main>
  )
}

export default App
