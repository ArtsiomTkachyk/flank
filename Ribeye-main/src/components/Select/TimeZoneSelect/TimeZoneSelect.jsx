import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Array of timezones
const timezones = [
  -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
];

export default function TimeZoneSelect({ changeEvent, placementFormValues: { day_hour_targets_tz: selected }, defaultValue }) {
  useEffect(() => {
  }, [defaultValue])
  return (
    <div className="w-[100px]">
      <Listbox value={selected} onChange={val => {
        changeEvent({ target: { name: 'day_hour_targets_tz', value: val } })
      }}>
        <div className="relative">
          <Listbox.Button className="cursor-pointer relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-[#708090] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <KeyboardArrowDownIcon
                aria-hidden="true"
                className={`h-5 w-5 text-gray-400 ${selected ? "rotate-[0]" : "rotate-[180deg]"
                  }`}
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full timezone_select overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {timezones.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `cursor-pointer relative select-none py-2 pl-10 pr-4 ${active ? "bg-indigo-600 text-white" : "text-indigo-600"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                          }`}
                      >
                        {person}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
