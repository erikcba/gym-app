import React from 'react'

const VerPlantilla = ({plantilla}) => {
  return (
    <div className="container flex flex-col items-center mx-auto gap-5 bg-zinc-800 p-4 rounded-md text-white">
       <h1 className="text-2xl font-bold text-center p-5 text-white border-b-2 border-zinc-700 w-full">{plantilla}</h1>
    </div>
  )
}

export default VerPlantilla