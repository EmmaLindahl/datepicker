import { useState } from "react";
// import "./App.css";
import { DatePicker } from "./DatePicker";
import { DatePickerValue } from "./DatePicker/types";

function App() {
  const [calendarValue, setCalendarValue] = useState<Date>();
  console.log("calendarValue: ", { calendarValue });
  console.log(typeof calendarValue);
  const [count, setCount] = useState(1);
  // const [open, setOpen] = useState<boolean>(false);

  //"sv-SE"
  //"en-US"
  //"ja-JP"

  return (
    <>
      <div className="flex flex-col items-center h-screen gap-10">
        <div className="mt-40 w-screen flex flex-col justify-center items-center">
          <DatePicker
            value={calendarValue}
            setValue={setCalendarValue}
            landCode="sv-SE"
            startOnMonday
            // open
            backColor="bg-white"
          />
        </div>
        <div>
          {calendarValue?.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
        <p className="bg-blue-300 bottom-0 absolute w-full flex justify-center">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;
