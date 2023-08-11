import React from 'react'
import { cn } from 'utils'
import { type Table as TableType, flexRender } from '@tanstack/react-table'
import { Icon, Pagination } from 'components'

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  table: TableType<any>
}

export const Table: React.FC<TableProps> = ({ className, table, ...props }) => {
  // if (isLoading || isError) return <div>error</div>

  const removeFilters = () => {
    table.resetColumnFilters()
    table.resetGlobalFilter()
  }

  return (
    <div className={cn('container pt-5', className)} {...props}>
      <div className="d-flex">
        {/* Global search */}
        <div className="input-group w-25">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            value={table.getState().globalFilter || ''}
          />
        </div>

        {/* Column Filters */}
        <div className="dropdown mx-3">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filters
          </button>

          <ul className="dropdown-menu p-2">
            {table.getFlatHeaders().map((header, key) =>
              header.column.getCanFilter() ? (
                <div key={key} className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="example"
                    onChange={(e) => header.column.setFilterValue(e.target.value)}
                    value={(header.column.getFilterValue() as string) || ''}
                  />
                  <label htmlFor="floatingInput">{flexRender(header.column.columnDef.header, header.getContext())}</label>
                </div>
              ) : null
            )}
          </ul>
        </div>

        <button className="btn btn-primary" onClick={removeFilters}>
          Remove all filters
        </button>
      </div>

      <table className={cn('table my-4', className)}>
        <thead>
          {table.getHeaderGroups().map((group, key) => (
            <tr key={key}>
              {group.headers.map((header, key) =>
                header.isPlaceholder ? null : (
                  <td key={key} onClick={header.column.getToggleSortingHandler()}>
                    <div className="d-flex align-items-center">
                      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                      {{
                        asc: <Icon name="keyboard_arrow_down" />,
                        desc: <Icon name="keyboard_arrow_up" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </td>
                )
              )}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length !== 0
            ? table.getRowModel().rows.map((row, key) => (
                <tr key={key}>
                  {row.getVisibleCells().map((cell, key) => (
                    <td key={key}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {table.getRowModel().rows.length === 0 ? (
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex justify-content-center">
            <Icon name="search_off" type="outlined" className="mx-2" />
            <p className="text-center">No results</p>
          </div>
          <button className="btn btn-outline-secondary" onClick={removeFilters}>
            Remove all filters
          </button>
        </div>
      ) : null}

      <Pagination table={table} />
    </div>
  )
}
