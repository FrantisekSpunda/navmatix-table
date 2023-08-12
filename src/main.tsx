import React from 'react'
import ReactDOM from 'react-dom/client'
import CitiesTable from './CitiesTable.tsx'
import './styles/index.scss'
import 'bootstrap'
import 'bootstrap/scss/bootstrap.scss'
import 'material-icons/iconfont/material-icons.scss'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CitiesTable />
    </QueryClientProvider>
  </React.StrictMode>
)
