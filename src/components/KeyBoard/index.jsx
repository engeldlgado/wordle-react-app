import { useEffect, useState } from 'react'
import BackspaceIcon from '@mui/icons-material/Backspace'

const keyboard = {
  line1: 'QWERTYUIOP',
  line2: 'ASDFGHJKLÑ',
  line3: 'ZXCVBNM'
}

const defaultLetters = []

'abcdefjhijklmnñopqrstuvwxyz'.split('').forEach((i) => {
  defaultLetters[i] = ''
})

function Key (props) {
  const [state, setState] = useState('bg-gray-300 hover:bg-gray-300 dark:bg-zinc-600 dark:text-white dark:hover:bg-zinc-500')

  const x = props.value.length === 1 ? 'w-7 sm:w-11 ' : 'w-12 sm:w-20 '
  const returnKey = () => {
    props.getKey(props.value)
  }

  useEffect(() => {
    setTimeout(() => {
      if (props.state === 'C') setState('bg-green-500 text-white border-green-500')
      if (props.state === 'E') setState('bg-orange-500 text-white border-orange-500')
      if (props.state === 'N') setState('bg-wrong text-white dark:bg-gray-500')
      if (props.state === 'X') setState('bg-gray-300 hover:bg-gray-300 dark:bg-zinc-400 dark:text-white dark:hover:bg-zinc-500')
    }, 350)
  }, [props.state])

  return (
    <button
      className={
        x +
        state +
        ' h-12 300 grid items-center rounded shadow-lg font-semibold cursor-pointer'
      }
      onClick={returnKey}
    >
      {props.value === 'DEL' ? <div className='flex items-center justify-center w-12 mx-auto'><BackspaceIcon /></div> : props.value}
    </button>
  )
}

function KeyBoard (props) {
  const [letters, setletters] = useState(defaultLetters)
  useEffect(() => {
    setletters(props.letters)
  }, [props.changed])

  const keyHandler = (value) => {
    props.keyHandler(value)
  }
  return (
    <div className='flex justify-center w-full px-16 py-6 rounded-lg bg-gray-50 dark:bg-zinc-700'>
      <div className='flex flex-col items-center'>
        <div className='flex gap-2 my-1'>
          {keyboard.line1.split('').map((value, key) => (
            <Key
              getKey={keyHandler}
              value={value}
              key={key}
              state={letters[value]}
            />
          ))}
        </div>
        <div className='flex gap-2 my-1 ml-8 w-fit'>
          {keyboard.line2.split('').map((value, key) => (
            <Key
              getKey={keyHandler}
              value={value}
              key={key}
              state={letters[value]}
            />
          ))}
        </div>
        <div className='flex gap-2 my-1 mr-8 w-fit'>
          <Key value='ENTER' getKey={keyHandler} />
          {keyboard.line3.split('').map((value, key) => (
            <Key
              getKey={keyHandler}
              value={value}
              key={key}
              state={letters[value]}
            />
          ))}
          <Key value='DEL' getKey={keyHandler} />
        </div>
      </div>
    </div>
  )
}

export default KeyBoard
