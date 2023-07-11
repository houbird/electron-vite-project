import React from 'react'
import DataNotFound from '@components/utils/DataNotFound'
import { type IRenderHandler } from '@interface/IRenderHandler'

interface Column {
  name: string
  key: string
}

type Row = Record<string, IRenderHandler>

interface TableProps {
  column: Column[]
  data: Row[]
  renderHandler: (key: string, value: IRenderHandler, item: any) => React.ReactNode
}

const Table = ({ column, data, renderHandler }: TableProps) => {
  // If there is no data, render a DataNotFound component
  if (data.length === 0) {
    return <DataNotFound />
  }

  // Otherwise, render the table
  return (
    <div>
      <table>
        <thead>
          <tr>
            {/* Render each column as a table header */}
            {column.map((col, i) => (
              <th
                key={i}
                scope="col"
              >
                <span>{col.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render each row as a table row */}
          {data.map((row, i) => (
            <tr
              key={i}
            >
              {/* Render each cell as a table cell */}
              {column.map((col, j) => (
                <td
                  key={j}
                >
                  <div>
                    {/* Render each cell value by calling the renderHandler */}
                    {renderHandler(col.key, row[col.key], row)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
