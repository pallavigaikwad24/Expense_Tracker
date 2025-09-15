import { useState, useRef, useEffect } from "react";
import {
  ChevronDownIcon,
  CheckIcon,
  MagnifyingGlassIcon as Search,
} from "@heroicons/react/24/outline";

interface Option {
  id: string;
  label: string;
}

interface Prop {
  setSelectedItem: (arg: Option) => void;
  selectedItem: Option;
}

export const DropDownComponent: React.FC<Prop> = ({
  setSelectedItem,
  selectedItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: Option[] = [
    { id: "1", label: "January" },
    { id: "2", label: "February" },
    { id: "3", label: "March" },
    { id: "4", label: "April" },
    { id: "5", label: "May" },
    { id: "6", label: "June" },
    { id: "7", label: "July" },
    { id: "8", label: "August" },
    { id: "9", label: "September" },
    { id: "10", label: "October" },
    { id: "11", label: "November" },
    { id: "12", label: "December" },
  ];

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    setSelectedItem(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <>
      {/* Main Searchable Dropdown */}
      <div className="w-[30%]">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between group hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-20"
          >
            <span
              className={`${
                selectedItem.label === "Select an option"
                  ? "text-gray-500"
                  : "text-gray-900"
              } font-medium`}
            >
              {selectedItem.label}
            </span>
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:text-indigo-500 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
              {/* Search Input */}
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-20 focus:border-indigo-300"
                  />
                </div>
              </div>

              {/* Options List */}
              <div className="max-h-64 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option)}
                      className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors duration-150 flex items-center space-x-3 group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 group-hover:text-indigo-700 transition-colors duration-150">
                          {option.label}
                        </div>
                      </div>
                      {selectedItem.label === option.label && (
                        <CheckIcon className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-center">
                    No options found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
