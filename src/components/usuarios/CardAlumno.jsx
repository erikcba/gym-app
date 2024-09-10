const CardAlumno = ({alumno, onNuevoPlanClick, btnText}) => {

    const buttonLabel = btnText ? btnText : (alumno.estadoPlan === 'Pendiente' ? 'Agregar' : 'Editar')

    return (
        <table className='w-full table-auto mt-4'>
            <thead className="bg-zinc-800">
                <tr>
                    <th className='text-center text-white px-4 py-2'>Nombre</th>
                    <th className='text-center text-white px-4 py-2'>Plan</th>
                    <th className='text-center text-white px-4 py-2'>Estado</th>
                    <th className='text-center text-white px-4 py-2'>Acción</th>
                </tr>
            </thead>
            <tbody className='rounded'>
                {
                    alumno && (
                        <tr className='odd:bg-zinc-700 even:bg-zinc-800' key={alumno.id}>
                            <td className='text-center text-white px-4 py-2 capitalize'>{alumno.name}</td>
                            <td className='text-center text-white px-4 py-2'>{alumno.email}</td>
                            <td className='text-center text-white px-4 py-2'>{alumno.estadoPlan}</td>
                            <td className='text-center text-white px-4 py-2'>
                                <button onClick={onNuevoPlanClick} className='bg-blue-800 py-1 px-3 rounded-lg hover:bg-blue-600'>{buttonLabel}</button>
                            </td>
                        </tr>
                    )
                }


            </tbody>
        </table>
    )
}

export default CardAlumno