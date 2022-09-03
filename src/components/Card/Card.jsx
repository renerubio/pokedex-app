import colorByType from "../../utils/colorByType";
import imgError from "./fallback-404.png";

export const Card = ({ data: pokemon }) => {
  const { name, image, id, types } = pokemon;

  const handleErrorImg = (e) => {
    e.target.onerror = null;
    e.target.src = imgError;
  };

  return (
    name &&
    image && (
      <div
        className={
          "card min-h-[30rem] p-4 max-w-sm bg-white rounded-lg border-4 border-gray-300 shadow-md dark:bg-gray-300 dark:border-gray-700 "
        }
      >
        <img
          src={image}
          alt={name}
          onError={handleErrorImg}
          className="pokecursor w-auto h-[70%] mx-[auto] mt-1
          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer"
        />
        <div className="px-6 py-2 first-letter:h-[15%]">
          <h2 className="text-gray-800 font-bold text-xl capitalize">
            {`#${id}  ${name}`}
          </h2>
        </div>
        <div className=" px-6 pt-2 h-[15%]">
          {types.map((type, index) => (
            <div
              key={`${type}_${index}`}
              className={`${colorByType(
                type,
                "bg"
              )} border-gray-700 border-2 inline-block rounded-full px-3 py-1 text-sm font-bold text-gray-900 mr-2 mt-1`}
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    )
  );
};
