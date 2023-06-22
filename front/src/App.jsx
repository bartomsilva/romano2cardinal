import axios from "axios"
import { useState, useEffect } from "react"
import { BASE_URL_D2E, BASE_URL_R2D } from './constants/constants'
import { ContainerCardinal, ContainerExtenso, Input, Main, Span, Titles } from "./appStyle"

function App() {

  const [romano, setRomano] = useState("")
  const [cardinal, setCardinal] = useState("")
  const [extenso, setExtenso] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const convertToCardinal = async (romano) => {
    setIsLoading(true)
    try {
      const path = BASE_URL_R2D + "romano2cardinal/" + romano
      const result = await axios.get(path)
      setCardinal(result.data)
    } catch (error) {
      setCardinal("inválido!")
    }
    setExtenso('')
    setIsLoading(false)
  }

  const convertToExtenso = async () => {
    try {
      
      const path = BASE_URL_D2E + cardinal
      const result = await axios.get(path)
      setExtenso(result.data)

    } catch (error) {
      setExtenso("")
    }
  }

  useEffect(() => {
    convertToCardinal(romano)
  }, [romano])

  useEffect(() => {
    convertToExtenso(cardinal)
  }, [cardinal])


  const handleChange = (event) => {
    const romano = event.target.value
    setRomano(romano.toUpperCase())
  }

  return (
    <>
      <Main>

        <Titles>Algarísmo Romano</Titles>
        <Input type="text" value={romano} onChange={handleChange} />

        <Titles>Valor cardinal</Titles>
        <ContainerCardinal>
          { !isLoading && <Span>{romano?.length>0 && cardinal}</Span> }
        </ContainerCardinal>
        <Titles>Valor por Extenso</Titles>
        <ContainerExtenso>
          <Span>{extenso}</Span>
        </ContainerExtenso>

      </Main>

    </>
  )
}

export default App
