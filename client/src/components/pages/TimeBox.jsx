import React from "react";
import BrainDumps from "./wrappers/TimeBox/BrainDumps.jsx";
import TimeFrames from "./wrappers/TimeBox/TimeFrames.jsx";
import Priorities from "./wrappers/TimeBox/Priorities.jsx";
import DateSelector from "./wrappers/TimeBox/DateSelector.jsx";

export default function TimeBox() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [timeFrame, setTimeFrame] = React.useState([]);
  const [dayTask, setDayTask] = React.useState({
    user_id: userData?.data?.id || null,
    brainDump: [],
    priorities: [],
    date: selectedDate,
  });

  const validationMessages = {
    brainDump:
      "Add at least 3 items to your Brain Dump to proceed to Priorities.",
    priorities: "Add at least 3 Priorities to proceed to Time Frames.",
  };

  return (
    <div className="min-h-screen p-4">
      {/* Date Selector at the top */}
      <div className="mb-4">
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <div className="lg:min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Brain Dumps Section */}
        <div className="flex flex-col space-y-4">
          <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-4 shadow-lg">
            <BrainDumps dayTask={dayTask} setDayTask={setDayTask} />
          </div>
          {dayTask.brainDump.length >= 3 ? (
            <div className="bg-green-100 dark:bg-green-800 rounded-lg p-4">
              <Priorities dayTask={dayTask} setDayTask={setDayTask} />
            </div>
          ) : (
            <div className="text-red-500 text-sm mt-2">
              {validationMessages.brainDump}
            </div>
          )}
        </div>

        {/* Time Frames Section */}
        {dayTask.priorities.length >= 3 ? (
          <div className="bg-yellow-100 dark:bg-yellow-800 rounded-lg p-4 md:col-span-2 md:row-span-2">
            <TimeFrames
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        ) : (
          <div className="text-red-500 text-sm lg:col-span-2 mt-4">
            {dayTask.brainDump.length >= 3 && validationMessages.priorities}
          </div>
        )}
      </div>
    </div>
  );
}
