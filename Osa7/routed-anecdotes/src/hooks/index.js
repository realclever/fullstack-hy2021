import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const resetFields = () => setValue("");

  const aneInfo = {
    type,
    value,
    onChange,
  };

  return {
    aneInfo,
    resetFields,
  };
};
