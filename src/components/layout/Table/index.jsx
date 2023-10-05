import React, { useState } from "react";
import useTable from "../../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>ID</th>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Email</th>
            <th className={styles.tableHeader}>Profile</th>
            <th className={styles.tableHeader}>Phone</th>
            <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el.id}>
              <td className={styles.tableCell}>{el.id}</td>
              <td className={styles.tableCell}>{el.name}</td>
              <td className={styles.tableCell}>{el.email}</td>
              <td className={styles.tableCell}>{el.profile}</td>
              <td className={styles.tableCell}>{el.phone}</td>
              <td className={styles.tableCell}>{el.language}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
