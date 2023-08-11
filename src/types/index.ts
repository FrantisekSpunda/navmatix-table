import { ColumnFiltersState, PaginationState, RowSelectionState, SortingState } from '@tanstack/react-table'

export * from './types.api'
export * from './types.modules'

export interface StateProps {
  pagination: PaginationState
  sorting: SortingState
  globalFilter: string
  columnFilters: ColumnFiltersState
  rowSelection: RowSelectionState
}
