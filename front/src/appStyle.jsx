import { styled } from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0,0,0,.4);
  min-height: 100vh;
  color: white;
  padding: 20px 30px;
  border-radius: 10px;
`
export const Titles = styled.span`
  font-size: 25px;
  margin-bottom: 10px;
`
export const Input = styled.input`
  width: 100%;
  height: 40px;
  font-size: 28px;
  text-align: center;
  border: none;
  border-radius: 30px;
  margin-bottom: 30px;
  
`
export const ContainerCardinal = styled.div`
   width: 100%;
   height: 40px;
   text-align: center;
   border: none;
   border-radius: 30px;
   margin-bottom: 10px;
   background-color: #fff;
   display: flex;
   justify-content: center;
   align-items: center;
   `
export const ContainerExtenso = styled(ContainerCardinal)`
  min-height: 40px;
  height: fit-content;
`

export const Span= styled.span`
  font-size: 30px;
  color: black;
`