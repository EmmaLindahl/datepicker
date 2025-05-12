import ChevronRightIcon from "./icons/arrowRight.svg?react";
import ChevronLeftIcon from "./icons/arrowLeft.svg?react";

export interface DatePickerHeaderProps {
  dateView: Date;
  onClickMonth: () => void;
  onClickYear: () => void;
  onClickNext: () => void;
  onClickPrev: () => void;
  landCode?: string;
  showMonthMenu: boolean;
  showYearMenu: boolean;
}

export const DatePickerHeader = (props: DatePickerHeaderProps) => {
  return (
    <div className="flex items-center w-full mt-2 border-b-1 border-b-pink-400">
      <div
        className={`  text-xs w-8 h-8 flex items-center justify-center  rounded-full transition-colors mr-auto ${
          props.showMonthMenu
            ? "bg-white/30"
            : "bg-white/50 cursor-pointer hover:bg-white/100"
        }`}
        onClick={props.showMonthMenu ? undefined : props.onClickPrev}
      >
        <ChevronLeftIcon
          className={`h-5 w-5 ${
            props.showMonthMenu ? "fill-gray-300" : "fill-black"
          } `}
        />
      </div>
      <div className="flex gap-1 mb-1">
        <div
          className={`text-sm font-medium mx-auto cursor-pointer p-2 hover:bg-white/50 rounded-lg ${
            props.showMonthMenu ? "bg-pink-200" : ""
          }`}
          onClick={props.onClickMonth}
        >
          {props.dateView.toLocaleString(props.landCode, {
            month: "short",
          })}
        </div>
        <div
          className={`text-sm font-medium mx-auto cursor-pointer p-2 hover:bg-white/50 rounded-lg ${
            props.showYearMenu ? "bg-pink-200" : ""
          }`}
          onClick={props.onClickYear}
        >
          {props.dateView.toLocaleString(props.landCode, {
            year: "numeric",
          })}
        </div>
      </div>

      <div
        className={` text-xs w-8 h-8 flex items-center justify-center rounded-full transition-colors ml-auto ${
          props.showMonthMenu
            ? "bg-white/30"
            : "bg-white/50 cursor-pointer hover:bg-white/100"
        }`}
        onClick={props.showMonthMenu ? undefined : props.onClickNext}
      >
        <ChevronRightIcon
          className={`h-5 w-5 ${
            props.showMonthMenu ? "fill-gray-300" : "fill-black"
          } `}
        />
      </div>
    </div>
  );
};
