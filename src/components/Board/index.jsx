import { useEffect, useState } from 'react'
import Box from '../Box'
import words from '../../words'

function removeAccents (input) {
  input = input.toUpperCase().replace(/[\W_]/g, '')
  return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const noAccentsWords = words.map(word => removeAccents(word))
const fiveLetterWords = noAccentsWords.filter(word => word.length === 5)
const correctWord = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)].toUpperCase()
const defaulBoard = []
const defaultLetters = []

'abcdefghijklmnñopqrstuvwxyz'.split('').forEach((i) => {
  defaultLetters[i] = ''
})
for (let i = 0; i < 5; i++) {
  defaulBoard.push([])
  for (let j = 0; j < 5; j++) {
    defaulBoard[i].push(['', ''])
  }
}

function Board (props) {
  const [correct, setCorrect] = useState('')
  const [letters, setLetters] = useState(defaultLetters)
  const [board, setBoard] = useState(defaulBoard)
  const [changed, setChanged] = useState(false)
  const [row, setRow] = useState(0)
  const [col, setCol] = useState(0)
  const [win, setWin] = useState(false)
  const [lost, setLost] = useState(false)

  const resetFunction = (timer) => {
    setTimeout(() => {
      // clear board and letters
      setWin(false)
      setLost(false)

      // get new word
      const newWord = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)].toUpperCase()
      setCorrect(newWord)
      // clear board
      const newBoard = []
      for (let i = 0; i < 5; i++) {
        newBoard.push([])
        for (let j = 0; j < 5; j++) {
          newBoard[i].push(['', 'X'])
        }
      }
      setBoard(newBoard)
      setRow(0)
      setCol(0)

      // clear letters in the keyboard
      const newLetters = []
      'abcdefghijklmnñopqrstuvwxyz'.toUpperCase().split('').forEach((i) => {
        newLetters[i] = 'X'
      })
      props.letters(newLetters)
      setLetters(newLetters)

      // reset timer
      props.timerHandler()
    }, timer * 1000) // 1000 = 1 second
  }

  useEffect(() => {
    if (props.clicks !== 0) {
      if (props.letter === 'DEL') {
        setCol(col === 0 ? 0 : col - 1)
        setBoard((prevBoard) => {
          prevBoard[row][col === 0 ? 0 : col - 1][0] = ''
          return prevBoard
        })
      } else {
        setBoard((prevBoard) => {
          if (col < 5) {
            if (props.letter !== 'ENTER') {
              prevBoard[row][col][0] = props.letter
              setCol(col + 1)
            } else {
              props.error('Las palabras deben tener 5 letras!')
              setTimeout(() => {
                props.error('')
              }, 1000)
            }
          } else {
            if (props.letter === 'ENTER') {
              let correctLetters = 0
              let word = ''
              for (let i = 0; i < 5; i++) {
                word += prevBoard[row][i][0]
              }
              if (fiveLetterWords.includes(word.toUpperCase())) {
                for (let i = 0; i < 5; i++) {
                  if (correct[i] === prevBoard[row][i][0]) {
                    prevBoard[row][i][1] = 'C'
                    correctLetters++
                  } else if (correct.includes(prevBoard[row][i][0])) { prevBoard[row][i][1] = 'E' } else prevBoard[row][i][1] = 'N'
                  setRow(row + 1)
                  if (row === 4) {
                    setLost(true)
                    setTimeout(() => {
                      props.setMessage(`La palabra era: ${correct}`)
                    }, 3000) // 3000 = 3 seconds
                  }

                  setCol(0)
                  setLetters((prev) => {
                    prev[board[row][i][0]] = board[row][i][1]
                    return prev
                  })
                }
                setChanged(!changed)

                if (correctLetters === 5) {
                  setWin(true)
                  setTimeout(() => {
                    props.setMessage('Has ganado!')
                  }, 3000) // 3000 = 5 seconds
                }
                return prevBoard
              } else {
                props.error('La palabra no existe!')
                setTimeout(() => {
                  props.error('')
                }, 1000)
              }
            }
          }
          return prevBoard
        })
      }
    }
  }
  , [props.clicks])

  useEffect(() => {
    props.letters(letters)
  }, [changed])

  useEffect(() => {
    setCorrect(correctWord)
  }, [])

  useEffect(() => {
    if (win || lost) {
      resetFunction(3)
      setChanged(!changed)
    }
  }, [win, lost])

  useEffect(() => {
    if (props.reset) {
      resetFunction(0)
      setChanged(!changed)
    }
  }, [props.reset])

  return (
    <div className='grid items-center justify-center px-10 py-5 gap-y-1 w-100'>
      {board.map((row, key) => {
        return (
          <div key={key} className='flex gap-1 w-fit'>
            {row.map((value, key) => (
              <Box key={key} value={value[0]} state={value[1]} pos={key} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Board
