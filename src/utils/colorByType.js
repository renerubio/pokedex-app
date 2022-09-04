const colorByType = (type) => {
  switch (type) {
    case "normal":
      return "bg-gray-400";
    case "fighting":
      return "bg-esmerald-400";

    case "flying":
      return "bg-sky-400";

    case "poison":
      return "bg-yellow-400";

    case "ground":
      return "bg-teal-400";

    case "rock":
      return "bg-stone-400";

    case "bug":
      return "bg-lime-400";

    case "ghost":
      return "bg-rose-400";

    case "steel":
      return "bg-slate-400";

    case "fire":
      return "bg-red-400";

    case "water":
      return "bg-cyan-400";

    case "grass":
      return "bg-green-400";

    case "electric":
      return "bg-indigo-400";

    case "psychic":
      return "bg-purple-400";

    case "ice":
      return "bg-cyan-300";

    case "dragon":
      return "bg-orange-400";

    case "dark":
      return "bg-purple-900";

    case "fairy":
      return "bg-amber-400";

    default:
      return "bg-gray-400";
  }
};

export default colorByType;
