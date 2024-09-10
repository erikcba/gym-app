import { Link } from 'react-router-dom'

export const BotonSideBar = ({ texto, icono, link }) => {
    return (
        <Link to={link}>
            <button className='my-2 flex gap-2 items-center text-white hover:bg-zinc-900 text-left p-2 w-full rounded-md'><box-icon name={icono} color='#bdb9b9'></box-icon>{texto}</button>
        </Link>
    )
}

export const BotonSideBarExp = ({ texto, icono1, icono2, onClick }) => {
    return (
        <button onClick={onClick} className="text-white py-2 px-3 mb-2 rounded-lg hover:bg-zinc-800 flex items-center justify-between gap-2 w-full transition-all">
            <span className='flex items-center gap-2'><box-icon name={icono1} color='#bdb9b9'></box-icon>{texto}</span> <box-icon name={icono2} color='#bdb9b9'></box-icon> 
        </button>
    )
}