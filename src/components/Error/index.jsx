function Error (props) {
  return (
    <div className='absolute grid w-full top-20 place-items-center'>
      <div className='px-8 py-2 text-center text-white bg-gray-800 w-fit'>
        {props.children}
      </div>
    </div>
  )
}

export default Error
