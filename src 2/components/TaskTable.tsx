import React from 'react';
import { useTable } from 'react-table';

const sampleData = [
  { id: 1, task: 'Prepare dive gear', status: 'Pending', due: '2026-04-10' },
  { id: 2, task: 'Contact guest', status: 'In Progress', due: '2026-04-12' },
  { id: 3, task: 'Update website', status: 'Done', due: '2026-04-15' },
];

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Task', accessor: 'task' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Due Date', accessor: 'due' },
];

export default function TaskTable({ data = sampleData }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="min-w-full border text-sm">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="border px-2 py-1 bg-gray-100">{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="border px-2 py-1">{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
