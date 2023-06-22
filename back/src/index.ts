
import express, { Request, Response } from 'express'
import cors from 'cors'

const server = express()
const port = process.env.PORT || 3003

server.use(express.json())
server.use(cors())

server.listen(port, () => console.log("server on in port", port))

server.get("/", (req: Request, res: Response) => {
  res.send("Bem vindo a romano2cardinal!")
})

server.get("/romano2cardinal/", (req: Request, res: Response) => {
  res.send("")
})

server.get("/romano2cardinal/:romano", (req: Request, res: Response) => {

  try {

    const aRomano = req.params.romano.toUpperCase()
    const indMax = aRomano.length

    let result: number = 0           // resultado da conversão
    let rCurrent: string = ""        // número romano - atual 
    let rNext: string | null = ""    // número romano - próximo

    const romanos: { [key: string]: number } = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000
    }

    // verifica se é um número romano válido
    if (!validRomano(aRomano)) {
      res.statusCode = 400
      throw new Error("número romano inválido!")
    }

    /* exemplos
      XI = 11 (atual maior que o próximo ou igual soma)
      XX = 20 (atual maior que o próximo ou igual soma)
      IX = 20 (atual menor que o próximo subtrai)
   */

    for (let ind = 0; ind < indMax; ind++) {
      // algarismo romano - atual
      rCurrent = aRomano[ind]

      rNext = null  // reset

      // verifica se existe um próximo número romano
      if (ind + 1 < indMax) {
        // algarismo romano - próximo
        rNext = aRomano[ind + 1]
      }

      if (rNext && romanos[rNext] > romanos[rCurrent]) {
        result -= romanos[rCurrent]
      } else {
        result += romanos[rCurrent]
      }
    }

    res.status(200).json(result)

  } catch (error) {

    if (res.statusCode === 200) {
      res.status(500)
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado.")
    }
  }

})

// Validação do número romano
function validRomano(romano: string) {
  const regexLetterAcepted = /^([IVXLCDM]+)$/i // letras válidas
  const regexNoValidSequence0 = /(\w)\1\1\1/g // não permite mais de três repetições de uma letra)
  const regexNoValidSequence1 = /I[LCDM]/ // I não pode aparecer antes de L,C,D e M
  const regexNoValidSequence2 = /V[XLCDM]/ // V não pode aparecer antes de X,L,C,D e M
  const regexNoValidSequence3 = /X[DM]/  //  X não pode aparecer antes de D e M
  const regexNoValidSequence4 = /L[CM]/  // L não pode aparecer antes de C e M
  const regexNoValidSequence5 = /(V|L|D).*\1/; // as letras V,L e D não podem se repetir seguidamente
  const regexNoValidSequence6 = /I.*I.*V/; // I não pode se repetir antes de V
  const regexNoValidSequence7 = /I.*I.*X/; // I não pode se repetir antes de X
  const regexNoValidSequence8 = /C.*C.*M/  // C não pode se repetir antes de M
  const regexNoValidSequence9 = /IXI/  // sequencia invalida
  const regexNoValidSequence10 = /VIX/  // sequencia invalida
  const regexNoValidSequence11 = /IXV/  // sequencia invalida
  const regexNoValidSequence12 = /IVI/  // sequencia invalida
  const regexNoValidSequence13 = /IXL/  // sequencia invalida
  const regexNoValidSequence14 = /IXX/  // sequencia invalida
  const regexNoValidSequence15 = /XLX/  // sequencia invalida
  const regexNoValidSequence16 = /CMC/  // sequencia invalida
  const regexNoValidSequence17 = /XCX/  // sequencia invalida

  // aceito
  if (romano.match(regexLetterAcepted) === null) return false

  //negado
  for (let num = 0; num <= 17; num++) {
    const cond = eval("regexNoValidSequence" + num)
    if (romano.match(cond) !== null) {
      return false
    }
  }

  return true
}

server.post("/addition", (req: Request, res: Response) => {
  try {

    const { valueA, valueB } = req.body

    if (valueA === undefined || valueB === undefined) {
      res.status(400)
      throw new Error("need to inform, valueA and valueB.")
    }
    if (typeof valueA !== "number") {
      res.status(422)
      throw new Error("'valueA' needs to be number.")
    }
    if (typeof valueB !== "number") {
      res.status(422)
      throw new Error("'valueB' needs to be number.")
    }
    res.json(valueA + valueB)

  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500)
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado.")
    }

  }
})