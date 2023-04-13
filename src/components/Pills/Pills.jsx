import colorByType from '../../utils/colorByType'

export const Pills = ({ list = [], text = 'pill text' }) => {
  console.log(list)
  return (
    <div className='px-6 pt-2'>
      <h3
        className='text-gray-800 font-bold text-xl capitalize
          dark:text-gray-200'
      >
        {text}
      </h3>
      {list.map((item, index) => (
        <div
          key={`${item}_${index}`}
          className={`${colorByType(
            item
          )} border-gray-700 border-2 inline-block rounded-lg px-3 py-1 text-sm font-bold text-gray-900 mr-2 mt-1`}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
