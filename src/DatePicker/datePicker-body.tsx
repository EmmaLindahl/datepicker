import { DatePickerType } from "./types";
import { WeekDays } from "./utils";

export interface DatePickerBodyProps {
  type?: DatePickerType;
  dateView: Date;
  value: Date;
  setDateView: (date: Date) => void;
  onClickDate: (date: Date) => void;
  landCode?: string;
  startOnMonday?: boolean;
  showMonthMenu: boolean;
  showYearMenu: boolean;
  setShowYearMenu: (show: boolean) => void;
  setShowMonthMenu: (show: boolean) => void;
}

export const DatePickerBody = (props: DatePickerBodyProps) => {
  const today = props.dateView;
  function getYearsLabels(startYear: number, count: number = 12): number[] {
    return Array.from({ length: count }, (_, i) => startYear + i);
  }
  function getMonthsLabels(locale = "eng-Us", month = "short"): string[] {
    return Array.from({ length: 12 }, (_, i) =>
      new Intl.DateTimeFormat(locale, { month }).format(new Date(2021, i, 1))
    );
  }
  function getWeekdayLabels(
    locale = "eng-US",
    weekday = "short",
    startOnMonday = false
  ): string[] {
    const baseDate = new Date(Date.UTC(2021, 0, startOnMonday ? 4 : 3));
    return Array.from({ length: 7 }, (_, i) =>
      new Intl.DateTimeFormat(locale, { weekday }).format(
        new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000)
      )
    );
  }
  let years = getYearsLabels(props.dateView.getFullYear());
  const months = getMonthsLabels(props.landCode);
  const weekdays = getWeekdayLabels(
    props.landCode,
    "short",
    props.startOnMonday
  );

  const first = new Date(today.getFullYear(), today.getMonth(), 1);
  let firstWeekDay = first.getDay();
  if (props.startOnMonday) {
    firstWeekDay = firstWeekDay === 0 ? 6 : firstWeekDay - 1;
  }

  const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const numberOfdaysInMonth = last.getDate();

  const calendarDays = [
    ...Array.from({ length: firstWeekDay }, () => ""),
    ...Array.from({ length: numberOfdaysInMonth }, (_, i) => i + 1),
  ];

  const handleDateClick = (day: number) => {
    if (!day) return;
    const fullDate = new Date(
      props.dateView.getFullYear(),
      props.dateView.getMonth(),
      day
    );
    fullDate.setHours(0, 0, 0, 0);
    props.onClickDate(fullDate);
  };
  const handleYearClick = (year: number) => {
    const currentMonth = props.dateView.getMonth();
    const currentDay = props.dateView.getDate();
    const lastDayOfMonth = new Date(year, currentMonth + 1, 0).getDate();
    const safeDay = Math.min(currentDay, lastDayOfMonth);
    const fullDate = new Date(year, currentMonth, safeDay);
    fullDate.setHours(0, 0, 0, 0); // <- important to avoid timezone shifts
    props.setDateView(fullDate);
    props.setShowYearMenu(false);
    // props.setShowYearMenu(false);
  };

  const handleMonthClick = (month: string) => {
    // Generate month names dynamically based on the current locale (country code)
    const monthNames = Array.from({ length: 12 }, (_, i) =>
      new Intl.DateTimeFormat(props.landCode, { month: "short" }).format(
        new Date(2021, i)
      )
    );
    // Find the month index based on the passed month name
    const monthIndex = monthNames.indexOf(month);
    if (monthIndex === -1) return; // Handle invalid month (shouldn't happen)
    // Get the current dateView's year and day
    const currentYear = props.dateView.getFullYear();
    const currentDay = props.dateView.getDate();
    // Calculate the last day of the clicked month to ensure the day is valid
    const lastDayOfMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
    const safeDay = Math.min(currentDay, lastDayOfMonth); // Adjust to last day if the current day exceeds the days in the month
    // Create a new date with the selected month and the "safe" day
    const fullDate = new Date(currentYear, monthIndex, safeDay);
    fullDate.setHours(0, 0, 0, 0); // Set the time to midnight to avoid timezone issues
    // Update the dateView to the selected month
    props.setDateView(fullDate);
    props.setShowMonthMenu(false);
  };

  return (
    <>
      <div>
        {props.showMonthMenu && (
          <div className="grid grid-cols-4 w-fit h-fit gap-z-4 gap-y-2 mb-3">
            {months.map((label, index) => (
              <div
                className="text-center text-l pl-3 pr-3 font-small w-fit  cursor-pointer transition-colors hover:bg-white/50 rounded-lg"
                key={index}
                onClick={() => handleMonthClick(label)}
              >
                {label}
              </div>
            ))}
          </div>
        )}
        {props.showYearMenu && (
          <div className="grid grid-cols-4 w-fit h-fit gap-z-4 gap-y-2 mb-3">
            {years.map((label, index) => (
              <div
                className="text-center text-l pl-3 pr-3 font-small w-fit  cursor-pointer transition-colors hover:bg-white/50 rounded-lg"
                key={index}
                onClick={() => handleYearClick(label)}
              >
                {label}
              </div>
            ))}
          </div>
        )}

        {!props.showMonthMenu && !props.showYearMenu && (
          <>
            <div className="grid grid-cols-7 w-fit h-fit gap-y-1">
              {weekdays.map((label, index) => (
                <div
                  className="text-center text-xs font-medium w-8"
                  key={index}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 w-fit h-fit gap-y-1 mb-3">
              {calendarDays.map((day, index) => {
                const today = new Date();
                const isToday =
                  today.getDate() === day &&
                  today.getMonth() === props.dateView.getMonth() &&
                  today.getFullYear() === props.dateView.getFullYear();
                const isSelected =
                  props.value &&
                  props.value.getDate() === day &&
                  props.value.getMonth() === props.dateView.getMonth() &&
                  props.value.getFullYear() === props.dateView.getFullYear();
                return (
                  <div
                    key={index}
                    className={`flex justify-center items-center text-center text-xs font-medium w-8 rounded-full cursor-pointer transition-colors h-8 ${
                      isToday
                        ? "bg-pink-300 hover:bg-pink-200"
                        : "hover:bg-white/50"
                    }
                ${isSelected ? "border-2 border-pink-400" : ""}`}
                    onClick={() => handleDateClick(day)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};
