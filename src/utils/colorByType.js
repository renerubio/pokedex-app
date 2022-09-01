const colorByType = (type, property = "bg") => {
  switch (type) {
    case `normal`:
      return `${property}-gray-400`;
    case `fighting`:
      return `${property}-esmerald-400`;

    case `flying`:
      return `${property}-sky-400`;

    case `poison`:
      return `${property}-yellow-400`;

    case `ground`:
      return `${property}-teal-400`;

    case `rock`:
      return `${property}-stone-400`;

    case `bug`:
      return `${property}-lime-400`;

    case `ghost`:
      return `${property}-rose-400`;

    case `steel`:
      return `${property}-slate-400`;

    case `fire`:
      return `${property}-red-400`;

    case `water`:
      return `${property}-cyan-400`;

    case `grass`:
      return `${property}-green-400`;

    case `electric`:
      return `${property}-indigo-400`;

    case `psychic`:
      return `${property}-purple-400`;

    case `ice`:
      return `${property}-cyan-300`;

    case `dragon`:
      return `${property}-orange-400`;

    case `dark`:
      return `${property}-purple-900`;

    case `fairy`:
      return `${property}-amber-400`;

    default:
      return `${property}-gray-400`;
  }
};

export default colorByType;
