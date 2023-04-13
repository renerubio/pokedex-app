import { useDispatch } from 'react-redux'
import { pokemonName } from '../../store/pokemonSlice'
import colorByType from '../../utils/colorByType'
import imgError from './fallback-404.png'
import { useReplace } from '../../hooks'
import { POKEAPI_POKEMON_SPRITES } from '../../api/endpoints'

export const Card = ({ data: pokemon }) => {
    const { name, image, id, types } = pokemon

    const handleErrorImg = e => {
        e.target.onerror = null
        e.target.src = imgError
    }

    const dispatch = useDispatch()
    const handleClick = e => {
        const {
            target: { title }
        } = e
        dispatch(pokemonName(title))
    }

    const imageFormatted = useReplace(image, '/media/', POKEAPI_POKEMON_SPRITES)

    return (
        name &&
        image && (
            <div
                className={
                    'card min-h-[30rem] p-4 max-w-sm bg-white rounded-lg border-4 border-gray-300 shadow-md dark:bg-gray-500 dark:border-gray-200 '
                }
            >
                <img
                    src={imageFormatted}
                    alt={name}
                    title={name}
                    onError={handleErrorImg}
                    onClick={handleClick}
                    className='pokecursor w-auto h-[70%] mx-[auto] mt-1
          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer'
                />
                <div className='px-6 py-2 first-letter:h-[15%]'>
                    <h2
                        className='text-gray-800 font-bold text-xl capitalize
          dark:text-gray-200'
                    >
                        {`#${id}  ${name}`}
                    </h2>
                </div>
                <div className=' px-6 pt-2 h-[15%]'>
                    {types.map((type, index) => (
                        <div
                            key={`${type}_${index}`}
                            className={`${colorByType(
                                type
                            )} border-gray-800 text-gray-900 border-2 inline-block rounded-full px-3 py-1 text-sm font-bold  mr-2 mt-1
              dark:text-gray-900 dark:border-gray-200`}
                        >
                            {type}
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}
