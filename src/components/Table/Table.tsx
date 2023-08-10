import React from 'react'
import { cn } from 'utils'

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  isLoading: boolean
  isError: boolean
  data?: {
    columns: {
      name: string
      label: string
      width: number
      sortable?: boolean
    }[]
    records: {
      id: number
      columns: string[]
    }[]
  }
}

export const Table: React.FC<TableProps> = React.memo(({ className, isLoading, isError, data, ...props }) => {
  if (isLoading || isError) return <div>error</div>

  return (
    <div className="container pt-5">
      <div className="input-group">
        <input className="form-control" placeholder="Search..." />
      </div>

      <div className="row bd-example">
        <table className={cn('table mb-0 p-2', className)} {...props}>
          <thead>
            <tr>
              {data?.columns.map((column, key) => (
                <th key={key} scope="col-lg-6">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.records.map((record) => (
              <tr>
                <th key={record.id} scope="row">
                  {record.id}
                </th>
                {record.columns.map((column, key) => (
                  <td key={key}>{column}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})
