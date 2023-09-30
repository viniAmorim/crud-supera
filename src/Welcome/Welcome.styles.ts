import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
  margin-bottom: 20px;

  h1 {
    font-size: 2.5em;
    margin-bottom: .5em;
  }

  h1 span {
    color: #fe7e00;
    padding: 0 0.2em;
    background-color: #333;
  }

  p {
    margin-bottom: 1.5em;
    color: #7b7b7b;
  }
`