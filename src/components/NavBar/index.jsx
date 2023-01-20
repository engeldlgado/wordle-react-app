import HelpIcon from '@mui/icons-material/Help'
import BarChartIcon from '@mui/icons-material/BarChart'
import { Switch } from '@mui/material'

function NavBar (props) {
  const handleChange = () => {
    props.darkness(!props.dark)
  }
  return (
    <div className='flex items-center justify-between pt-5 m-5 text-gray-500 bg-gray-100 rounded-lg dark:bg-zinc-700 w-100 sm:p-3 dark:text-white'>
      <div className='w-1/4 text-left'>
        <HelpIcon
          className='hover:cursor-pointer hover:text-blue-500'
          onClick={() => {
            props.help(true)
          }}
        />
      </div>
      <div>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-white'>WORDLE</h1>
      </div>
      <div className='w-1/4 text-right'>
        <BarChartIcon
          className='hover:cursor-pointer hover:text-blue-500'
          onClick={() => props.stats(true)}
        />
        <Switch onChange={handleChange} />
      </div>
    </div>
  )
}

export default NavBar
