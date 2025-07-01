
import React from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  error
}) => {
  return (
    <div className="mb-4">
      <label className="block text-neon-green font-mono mb-2 uppercase text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-2 border-gray-600 text-white px-4 py-3 focus:border-neon-green focus:outline-none transition-colors font-mono"
      />
      {error && <p className="text-red-500 text-sm mt-1 font-mono">{error}</p>}
    </div>
  );
};

export default Input;
