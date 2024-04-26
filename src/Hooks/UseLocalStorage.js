import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Get the initial value from localStorage or use the provided initialValue
  const initialStoredValue = localStorage.getItem(key);
  const [storedValue, setStoredValue] = useState(initialStoredValue ? JSON.parse(initialStoredValue) : initialValue);

  // Function to get the value from localStorage
  const getValue = () => {
    return storedValue;
  };

  // Function to set the value in localStorage
  const setValue = (value) => {
    // Save the value in localStorage as a stringified JSON
    localStorage.setItem(key, JSON.stringify(value));
    // Update the storedValue state
    setStoredValue(value);
  };

  return [storedValue, getValue, setValue];
};

export default useLocalStorage;