import React from 'react'

const Shortcut = ({value, label, setTarget}) => {
  return (
    <button className='btn-warm' onClick={() => setTarget((prev) => prev + value)}>
        {label}
    </button>
  )
}

export default Shortcut