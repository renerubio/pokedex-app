import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import {
  sortBylowest,
  sortByhighest,
  sortByAZ,
  sortByZA
} from '../../store/pokemonSlice'

export const Sort = () => {
  const { t } = useTranslation('global')
  const dispatch = useDispatch()

  const buttonClass = `mr-1 bg-gray-200 hover:bg-gray-800 text-gray-800 font-bold py-2 px-4 mx-auto mb-2 border-b-4 border-gray-700 hover:border-gray-500 rounded dark:bg-gray-700 dark:hover:bg-gray-400 dark:text-gray-200 dark:border-gray-900 dark:hover:border-gray-500 `

  return (
    <div
      className='bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-3
    dark:bg-gray-800 dark:border-gray-500 dark:text-gray-200'
    >
      <h2 className='text-gray-800 font-bold text-xl capitalize mb-2 dark:text-gray-200'>
        {t('sort.title')}
      </h2>
      <button onClick={() => dispatch(sortBylowest())} className={buttonClass}>
        {t('sort.lowest')}
      </button>
      <button onClick={() => dispatch(sortByhighest())} className={buttonClass}>
        {t('sort.highest')}
      </button>
      <button onClick={() => dispatch(sortByAZ())} className={buttonClass}>
        {t('sort.A-Z')}
      </button>
      <button onClick={() => dispatch(sortByZA())} className={buttonClass}>
        {t('sort.Z-A')}
      </button>
    </div>
  )
}
