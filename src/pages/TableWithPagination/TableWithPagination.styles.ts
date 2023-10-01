import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  
`;

export const TableWrapper = styled.div`
  width: 80%;
  margin-top: 16px;
  overflow-x: auto;
`;

export const StyledTable = styled(Table)`
  min-width: 650px;
`;

export const StyledTableCell = styled(TableCell)`
  font-weight: bold;
`;