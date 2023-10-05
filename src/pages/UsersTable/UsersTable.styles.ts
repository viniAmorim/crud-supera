import styled from 'styled-components'
import { Container, Table } from '@chakra-ui/react'

export const SyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TableWrapper = styled.div`
  width: 80%;
  margin-top: 16px;
  overflow-x: auto;
`;

export const StyledTable = styled(Table)`
  min-width: 650px;
`;

export const StyledTableCell = styled.div`
  font-weight: bold;
`;