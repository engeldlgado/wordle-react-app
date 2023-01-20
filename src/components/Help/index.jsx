import Box from '../Box'

function Help ({ handleClose }) {
  return (
    <>
      <p className='mb-3 text-sm text-zinc-500 dark:text-zinc-300'>
        Adivina la palabra oculta en cinco intentos.
      </p>
      <p className='mb-3 text-sm text-zinc-500 dark:text-zinc-300'>
        Cada intento debe ser una palabra válida de 5 letras.
      </p>
      <p className='mb-3 text-sm text-zinc-500 dark:text-zinc-300'>
        Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.
      </p>

      <b className='text-sm text-zinc-500 dark:text-zinc-300'>Ejemplos</b>
      <div className='flex justify-center gap-2 py-3'>
        <Box value='G' state='C' />
        <Box value='A' />
        <Box value='T' />
        <Box value='O' />
        <Box value='S' />
      </div>
      <p className='text-sm text-zinc-500 dark:text-zinc-300'>
        La letra <b>G</b> está en la palabra y en la posición correcta.
      </p>
      <div className='flex justify-center gap-2 py-3'>
        <Box value='V' />
        <Box value='O' />
        <Box value='C' state='E' />
        <Box value='A' />
        <Box value='L' />
      </div>
      <p className='text-sm text-zinc-500 dark:text-zinc-300'>
        La letra <b>C</b> está en la palabra pero en la posición incorrecta
      </p>
      <div className='flex justify-center gap-2 py-3'>
        <Box value='C' />
        <Box value='A' state='N' />
        <Box value='N' />
        <Box value='T' />
        <Box value='O' />
      </div>
      <p className='text-sm text-zinc-500 dark:text-zinc-300'>
        La letra <b>O</b> no está en la palabra.
      </p>

      <p className='mt-6 text-sm italic text-zinc-500 dark:text-zinc-300'>
        Puede haber letras repetidas. Las pistas son independientes para cada letra.
      </p>

      <p className='mt-6 text-sm text-center text-zinc-500 dark:text-zinc-300'>
        ¡Una palabra nueva cada 5 minutos!, si ganas o pierdes se generará una nueva palabra.
      </p>
      <div className='text-center'>
        <button className='px-16 py-2 mt-6 font-bold text-white bg-green-600 rounded dark:bg-green-600 hover:bg-green-800 dark:hover:bg-zinc-600 dark:text-zinc-200 focus:outline-none focus:shadow-outline' onClick={handleClose}>
          ¡JUGAR!
        </button>
      </div>
    </>
  )
}

export default Help
