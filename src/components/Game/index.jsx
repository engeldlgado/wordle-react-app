import { useState, useEffect } from 'react'
import Board from '../Board'
import Error from '../Error'
import Help from '../Help'
import KeyBoard from '../KeyBoard'
import { BaseModal } from '../Modal/base'
import NavBar from '../NavBar'
import styles from './style.module.css'
import Stats from '../Stats'

function Game (props) {
  const [letter, setLetter] = useState()
  const [changed, setChanged] = useState(false)
  const [letters, setLetters] = useState({})
  const [help, setHelp] = useState(false)
  const [clicked, setClicked] = useState(0)
  const [error, setError] = useState('')
  const [dark, setDark] = useState(false)
  const [stats, setStats] = useState({})
  const [openStats, setOpenStats] = useState(false)
  const [gameTimer, setGameTimer] = useState(null)
  const [resetGame, setResetGame] = useState(false)
  const [message, setMessage] = useState('')
  const onClickDown = (event) => {
    if (event.key === 'Enter') {
      setLetter('ENTER')
      setClicked(clicked + 1)
    } else if (event.key === 'Backspace') {
      setLetter('DEL')
      setClicked(clicked + 1)
    } else if ('abcdefghijklmnñopqrstuvwxyz'.includes(event.key.toLowerCase())) {
      setLetter(event.key.toUpperCase())
      setClicked(clicked + 1)
    }
  }

  useEffect(() => {
    const nextDate = new Date().getTime() + 300000 // 5 minutes
    const now = new Date().getTime()

    if (nextDate < now) {
      setResetGame(true)
      setGameTimer(nextDate)
    } else {
      setResetGame(false)
      setGameTimer(nextDate)
    }
  }, [resetGame])

  useEffect(() => {
    window.addEventListener('keydown', onClickDown)

    return () => window.removeEventListener('keydown', onClickDown)
  })

  useEffect(() => {
    props.darkness(dark)
  }, [dark])

  useEffect(() => {
    if (!stats || !window.localStorage.getItem('GameStats')) {
      setHelp(true)
      window.localStorage.setItem('GameStats', JSON.stringify({
        wins: 0,
        loses: 0,
        games: 0
      }))
      setStats(JSON.parse(window.localStorage.getItem('GameStats')))
    }

    // update stats
    if (message) {
      const stats = JSON.parse(window.localStorage.getItem('GameStats'))
      if (message === 'Has ganado!') {
        stats.wins++
        stats.games++
      } else {
        stats.loses++
        stats.games++
      }
      window.localStorage.setItem('GameStats', JSON.stringify(stats))
      setStats(JSON.parse(window.localStorage.getItem('GameStats')))
    }

    if (stats) {
      setStats(JSON.parse(window.localStorage.getItem('GameStats')))
    }
  }, [message])

  useEffect(() => {
    if (message) {
      setOpenStats(true)
    } else {
      setOpenStats(false)
      setMessage('')
    }
  }, [message])

  const keyHandler = (letterValue) => {
    setLetter(letterValue)
    setClicked(clicked + 1)
  }
  const LettersHandler = (lettersValue) => {
    setLetters(lettersValue)
    setChanged(!changed)
  }

  const handleClose = () => {
    setHelp(false) // Close the modal
  }

  const handleCloseStats = () => {
    setOpenStats(false)
    setMessage('')
  }

  const timerHandler = () => {
    const nextDate = new Date().getTime() + 300000 // 5 minutes
    setGameTimer(nextDate) // 5 minutes
  }

  const resetTimeHandler = () => {
    setResetGame(true)
    setOpenStats(false)
    setMessage('')
  }

  return (
    <>
      <BaseModal title='Como jugar' isOpen={help} handleClose={handleClose}>
        <Help handleClose={handleClose} />
      </BaseModal>
      <BaseModal title='Estadísticas' isOpen={openStats} handleClose={handleCloseStats}>
        <Stats handleCloseStats={handleCloseStats} stats={stats} gameTimer={gameTimer} resetHandler={resetTimeHandler} message={message} />
      </BaseModal>
      {error && <Error>{error}</Error>}
      <div className={styles.game}>
        <NavBar help={setHelp} darkness={setDark} dark={dark} stats={setOpenStats} />
        <Board
          letter={letter}
          clicks={clicked}
          letters={LettersHandler}
          error={setError}
          reset={resetGame}
          timerHandler={timerHandler}
          setMessage={setMessage}
        />
        <KeyBoard keyHandler={keyHandler} letters={letters} changed={changed} />
      </div>
    </>
  )
}

export default Game
