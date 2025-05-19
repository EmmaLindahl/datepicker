import { useState, useRef, useEffect } from "react";
import { DatePickerValue, DatePickerType } from "./types";
import { DatePickerInput } from "./datePicker-input";
import { DatePickerBody } from "./datePicker-body";
import { DatePickerHeader } from "./datePicker-header";

export interface DatePickerProps {
  type?: DatePickerType;
  value: Date;
  setValue: (value: DatePickerValue) => void;

  landCode?: string;
  startOnMonday?: boolean;
  open?: boolean;

  backColor?: string;
}

export const DatePicker = ({
  type,
  value = new Date(),
  setValue,
  landCode = "",
  startOnMonday = false,
  open = false,
  backColor = "bg-white",
}: DatePickerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewDate, setViewDate] = useState<Date>(today);
  const [isOpen, setIsOpen] = useState<boolean>(open);

  const [showMonthMenu, setShowMonthMenu] = useState<boolean>(false);
  const [showYearMenu, setShowYearMenu] = useState<boolean>(false);

  useEffect(() => {
    setViewDate(today);
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
      if (!window.getComputedStyle(document.documentElement).getPropertyValue('--tw-bg-opacity')) {
    console.warn("Tailwind CSS is not detected. Please ensure Tailwind is set up in your project.");
  }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowMonthMenu(false);
        setShowYearMenu(false);
        setIsOpen(false);
        setViewDate(today);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOnClickMonth = () => {
    console.log("Month");
    setShowMonthMenu(!showMonthMenu);
    setShowYearMenu(false);
  };
  const handleOnClickYear = () => {
    setShowYearMenu(!showYearMenu);
    setShowMonthMenu(false);
  };
  const handleOnClickNext = () => {
    if (showYearMenu) {
      setViewDate(
        (prev) => new Date(prev.getFullYear() + 12, prev.getMonth(), 1)
      );
      return;
    }
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  const handleOnClickPrev = () => {
    if (showYearMenu) {
      setViewDate(
        (prev) => new Date(prev.getFullYear() - 12, prev.getMonth(), 1)
      );
      return;
    }
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const handleOnClickDate = (date: Date) => {
    setValue(date);
  };

  return (
    <>
      <div className="relative" ref={wrapperRef}>
        <DatePickerInput
          type={type}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          value={value}
          setDateView={setViewDate}
          landCode={landCode}
          setShowMonthMenu={setShowMonthMenu}
          showMonthMenu={showMonthMenu}
          setShowYearMenu={setShowYearMenu}
          showYearMenu={showYearMenu}
          name="yourDateFieldName"
          backColor={backColor}
        />
        <div
          className={`absolute flex flex-col gap-2 shadow-md ${backColor} rounded-lg px-4 h-fit w-64 items-center transition-all z-50 mt-3`}
        >
          {/* mt-4 ger space mellan dropdown och input */}
          {isOpen && (
            <>
              <div className="absolute left-1/8 -translate-x-1/2 -top-2 border-l-5 border-r-5 border-b-8 border-l-transparent border-r-transparent border-b-pink-100 z-50" />
              <DatePickerHeader
                dateView={viewDate}
                onClickMonth={handleOnClickMonth}
                onClickYear={handleOnClickYear}
                onClickNext={handleOnClickNext}
                onClickPrev={handleOnClickPrev}
                landCode={landCode}
                showMonthMenu={showMonthMenu}
                showYearMenu={showYearMenu}
              />
              <DatePickerBody
                type={type}
                value={value}
                dateView={viewDate}
                setDateView={setViewDate}
                onClickDate={handleOnClickDate}
                landCode={landCode}
                startOnMonday={startOnMonday}
                showMonthMenu={showMonthMenu}
                showYearMenu={showYearMenu}
                setShowYearMenu={setShowYearMenu}
                setShowMonthMenu={setShowMonthMenu}
              />
            </>
          )}
        </div>
      </div>
      <div className="bg-pink-600 w-screen">Testing Something</div>
    </>
  );
};
