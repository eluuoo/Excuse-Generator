interface ISelect {
  options: { text: string; value: string }[];
  handleSelectCategory: (category: string) => void;
  className?: string;
}

const Select = ({ options, handleSelectCategory, className = "" }: ISelect) => {
  return (
    <select
      className={`w-full bg-white rounded-full px-4 py-3 cursor-pointer appearance-none font-bold border-3 border-pinocchio-yellow hover:border-pinocchio-red focus:outline-none focus:ring-2 focus:ring-pinocchio-blue ${className}`}
      defaultValue={""}
      onChange={(e) => handleSelectCategory(e.target.value)}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="bg-white text-pinocchio-blue font-comic py-2"
        >
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;