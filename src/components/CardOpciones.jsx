import { Link } from "react-router-dom"

const CardOpciones = ({titulo, link, icono, boxicon}) => {
    return (
        <div className='bg-zinc-800 p-4 rounded-md text-white flex gap-4 items-center justify-between drop-shadow'>
            <h1 className="font-semibold flex items-center gap-2">{boxicon}{titulo}</h1>
            <Link to={link}><button className='bg-blue-800 rounded-lg hover:bg-blue-600 h-9 w-9 font-bold flex justify-center items-center'><box-icon name='chevron-right' size='md' color='#f3f0f0' ></box-icon></button></Link>
        </div>
    )
}

export default CardOpciones