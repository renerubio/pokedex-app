import React from "react";

export const Card = ({ data: pokemon }) => {
  const { name, image } = pokemon;
  return (
    name &&
    image && (
      <div className="card p-8 max-w-sm bg-white rounded-lg border border-gray-300 shadow-md dark:bg-gray-300 dark:border-gray-700">
        <img src={image} alt={name} className="w-auto h-[70%]" />
        <div className="px-6 py-2 first-letter:h-[15%]">
          <h2 className="text-gray-800 font-bold text-xl capitalize">{name}</h2>
        </div>
        <div className="px-6 py-2 h-[15%]">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-1">
            {`#${name}`}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-1">
            #pokemon
          </span>
        </div>
      </div>
    )
  );
};
