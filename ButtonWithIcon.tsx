import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IButtonWithIcon {
  btnText: string;
  icon: IconProp;
  btnClasses?: string;
  iconClasses?: string;
  textClasses?: string;
  onClickHandler: () => void;
  disabled?: boolean;
}

const ButtonWithIcon = ({
  btnText,
  icon,
  btnClasses = "",
  iconClasses = "",
  textClasses = "",
  onClickHandler,
  disabled = false,
}: IButtonWithIcon) => {
  return (
    <button
      className={`flex flex-row gap-2 items-center px-6 py-3 font-bold transition-all duration-300 ${btnClasses} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
      onClick={onClickHandler}
      disabled={disabled}
    >
      <span className={textClasses}>{btnText}</span>
      <FontAwesomeIcon className={iconClasses} icon={icon} />
    </button>
  );
};

export default ButtonWithIcon;