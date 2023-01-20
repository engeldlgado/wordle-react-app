import { useEffect, useState } from 'react'
import BackspaceIcon from '@mui/icons-material/Backspace'

function Box (props) {
  const [state, setState] = useState('text-black border-2 bg-zinc-300 border-zinc-300 dark:bg-zinc-600 dark:border-zinc-600 dark:text-white')

  useEffect(() => {
    setTimeout(() => {
      if (props.state === 'C') { setState(' cell-fill-animation shadowed bg-green-500 text-white border-green-500') }
      if (props.state === 'E') { setState('cell-fill-animation shadowed bg-orange-500 text-white border-orange-500') }
      if (props.state === 'N') { setState('cell-fill-animation bg-wrong text-white shadowed dark:bg-zinc-500') }
      if (props.state === 'X') { setState('text-black border-2 bg-zinc-300 border-zinc-300 dark:bg-zinc-600 dark:text-white dark:border-zinc-600 rounded') }
    }, 125 * props.pos)
  }, [props.state])

  return (
    <div
      className={
        'h-12 w-12 sm:w-16 sm:h-16 grid place-items-center p-0 m-0 font-bold text-2xl rounded ' + state
      }
    >
      {props.value === 'DEL' ? <BackspaceIcon /> : props.value}
    </div>
  )
}

export default Box
