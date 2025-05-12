import { DatePickerType } from "./types";

export interface DatePickerInputProps {
  type?: DatePickerType;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value: Date;
  setValue: (date: Date) => void;
  setDateView: (date: Date) => void;
  landCode?: string;
  showMonthMenu: boolean;
  showYearMenu: boolean;
  setShowMonthMenu: (show: boolean) => void;
  setShowYearMenu: (show: boolean) => void;
  name?: string;
  backColor: string;
}

export const DatePickerInput = (props: DatePickerInputProps) => {
  const formatDate = (date: Date | undefined) => {
    return (
      date?.toLocaleDateString(props.landCode, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) || ""
    );
  };

  const parseDate = (str: string): Date | null => {
    const [day, month, year] = str.split(/[-/.]/).map((s) => parseInt(s, 10));
    if (!day || !month || !year) return null;
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? null : date;
  };

  return (
    <input
      type="text"
      value={formatDate(props.value)}
      placeholder={formatDate(props.value)}
      onFocus={() => props.setIsOpen(true)}
      onChange={(e) => {
        const parsed = parseDate(e.target.value);
        if (parsed) {
          props.setValue(parsed);
          props.setDateView(parsed);
        }
      }}
      className={`text-xs font-semibold ${props.backColor} hover:bg-pink-400 border border-white/10 shadow-xs rounded-md w-50 h-9 px-3 py-1 transition-all 
        outline-1 outline-pink-400
      `}
    />
  );
};
