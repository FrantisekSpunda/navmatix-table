import React from 'react'
import { Table } from '@tanstack/react-table'
import { cn } from 'utils'

interface PaginationProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  table: Table<unknown>
  options?: {
    fromStart?: number
    around?: number
  }
}

export const Pagination: React.FC<PaginationProps> = ({ table, options, ...props }) => {
  const pageOptions = table.getPageOptions()
  const pages = pageOptions.length - 1
  const page = table.getState().pagination.pageIndex
  const fromStart = options?.fromStart || 4
  const around = options?.around || 1

  return pages > 0 ? (
    <nav {...props}>
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" onClick={table.previousPage} href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {table.getPageOptions().map((v, key) => {
          if (
            v === 0 || // start
            v === pages || // end
            (page <= fromStart - 1 && v <= fromStart) || // around start
            (page > pages - fromStart + 1 && v > pages - fromStart) ||
            (page >= fromStart && page <= pages - fromStart + 1 && v >= page - around && v <= page + around)
          ) {
            return (
              <li key={key} className={cn('page-item', v == page && 'active')}>
                <a className="page-link" href="#" onClick={() => table.setPageIndex(v)}>
                  {v + 1}
                </a>
              </li>
            )
          } else if (
            (page < fromStart && v === pages - 1) || // when on start show on end
            (page > pages - fromStart + 1 && v === 2) || // when on end show on start
            (page >= fromStart && page <= pages - fromStart + 1 && v === pages - 1) ||
            v === 2
          ) {
            return (
              <li key={key} className="page-item">
                <a className="page-link">...</a>
              </li>
            )
          }
        })}
        <li className="page-item">
          <a className="page-link" onClick={table.nextPage} href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  ) : null
}
