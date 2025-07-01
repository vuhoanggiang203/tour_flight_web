'use client';

import React, { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

const NcInputNumber = ({
  className = "w-full", // Đảm bảo className này được truyền vào div chính để căn chỉnh tốt hơn
  defaultValue = 0,
  min = 0,
  max,
  onChange,
  label,
  desc,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    // Đảm bảo giá trị luôn nằm trong khoảng min/max khi defaultValue thay đổi
    let newValue = defaultValue;
    if (newValue < min) {
      newValue = min;
    }
    if (max !== undefined && newValue > max) {
      newValue = max;
    }
    setValue(newValue);
  }, [defaultValue, min, max]);

  const handleClickDecrement = () => {
    if (min >= value) return;
    const newValue = value - 1;
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleClickIncrement = () => {
    if (max !== undefined && max <= value) return;
    const newValue = value + 1;
    setValue(newValue);
    onChange?.(newValue);
  };

  const renderLabel = () => (
    <div className="flex flex-col text-left"> {/* Căn chỉnh text-left cho label */}
      <span className="font-medium text-gray-800 text-base"> {/* Điều chỉnh font-medium, màu, kích thước */}
        {label}
      </span>
      {desc && (
        <span className="text-sm text-gray-500 font-normal mt-0.5"> {/* Điều chỉnh kích thước, màu, margin-top */}
          {desc}
        </span>
      )}
    </div>
  );

  return (
    <div
      className={`nc-NcInputNumber flex items-center justify-between ${className}`} // className được áp dụng ở đây
      data-nc-id="NcInputNumber"
    >
      {label && renderLabel()}

      <div className="flex items-center space-x-2.5"> {/* Giảm space-x-5 thành space-x-2.5 */}
        <button
          className="
            w-10 h-10 rounded-full flex items-center justify-center
            border border-gray-300 bg-white text-gray-700
            hover:border-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-700
            transition duration-200
          "
          type="button"
          onClick={handleClickDecrement}
          disabled={min >= value}
        >
          <MinusIcon className="w-5 h-5" /> {/* Tăng kích thước icon */}
        </button>

        <span className="font-semibold text-xl text-gray-900 min-w-[30px] text-center"> {/* Định dạng số hiển thị */}
          {value}
        </span>

        <button
          className="
            w-10 h-10 rounded-full flex items-center justify-center
            border border-gray-300 bg-white text-gray-700
            hover:border-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-700
            transition duration-200
          "
          type="button"
          onClick={handleClickIncrement}
          disabled={max !== undefined ? max <= value : false}
        >
          <PlusIcon className="w-5 h-5" /> {/* Tăng kích thước icon */}
        </button>
      </div>
    </div>
  );
};

export default NcInputNumber;