import Countdown from 'react-countdown'

const Stats = ({ handleCloseStats, stats, gameTimer, resetHandler, message }) => {
  return (
    <div className='text-center w-100 dark:text-white'>
      <div className='flex py-5 text-center justify-evenly'>
        <div>
          <h2 className='text-xl font-bold'>{stats.wins}</h2>
          <p>Victorias</p>
        </div>
        <div>
          <h2 className='text-xl font-bold'>{stats.loses}</h2>
          <p>Perdidas</p>
        </div>
        <div>
          <h2 className='text-xl font-bold'>{stats.games}</h2>
          <p>Jugadas</p>
        </div>
      </div>
      <div>
        <h2 className='py-10 text-xl font-bold'>{message}</h2>
      </div>
      <div className='flex justify-center'>
        <p>Siguiente palabra en:</p>
      </div>
      <Countdown
        className='text-lg font-medium text-gray-900 dark:text-gray-100'
        date={gameTimer}
        onComplete={resetHandler}
        daysInHours
      />
      <div className='text-center'>
        <button className='px-16 py-2 mt-6 font-bold text-white bg-green-600 rounded dark:bg-green-600 hover:bg-green-800 dark:hover:bg-zinc-600 dark:text-zinc-200 focus:outline-none focus:shadow-outline' onClick={handleCloseStats}>
          ¡CONTINUAR!
        </button>
      </div>
    </div>
  )
}

export default Stats
