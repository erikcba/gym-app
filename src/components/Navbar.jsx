import { useNavigate } from 'react-router-dom'
import { useAuth } from '../js/useAuth'

const Navbar = () => {

    const user = useAuth()
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/dashboard')
    }

    return (
        <nav className='w-full h-16 flex justify-around items-center bg-zinc-800 sticky top-0 z-10 py-5' >
            <h1 className='text-white text-3xl font-bold'>Logo</h1>
            <ul className='flex gap-4 text-white justify-center items-center'>
                <button onClick={handleClick} className='text-white hover:bg-zinc-700 p-2 rounded-md'>Home</button>
                <p className='text-white p-2 rounded-md flex justify-center items-center gap-2'>{user.displayName} <box-icon name='user-circle' color='#bdb9b9' ></box-icon></p>
            </ul>
        </nav>
    )
}

export default Navbar