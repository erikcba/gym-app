import React from 'react'
import { Link } from 'react-router-dom'


const VolverBtn = ({link}) => {
  return (
    <div>
        <Link to={link}><button className='bg-blue-800 rounded-lg hover:bg-blue-600 h-9 w-9 font-bold flex justify-center items-center'><box-icon name='chevron-left' size='md' color='#f3f0f0' ></box-icon></button></Link>
    </div>
  )
}

export default VolverBtn