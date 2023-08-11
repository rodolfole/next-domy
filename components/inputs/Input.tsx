'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  disabled?: boolean;
  errors: FieldErrors
  formatPrice?: boolean;
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>,
  required?: boolean;
  type?: "email" | "number" | "password" | "text";
}

const Input: React.FC<InputProps> = ({
  disabled, 
  errors,
  formatPrice,
  id,
  label,
  register,
  required,
  type = "text"
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}  
          className="
          absolute
          left-2
            text-neutral-700
            top-5
          "
        />
      )}
      <input
        {...register(id, { required })}
        className={`
          bg-white 
          border-2
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          disabled:cursor-not-allowed
          disabled:opacity-70
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
          font-light 
          outline-none
          p-4
          peer
          ${formatPrice ? 'pl-9' : 'pl-4'}
          pt-6 
          rounded-md
          transition
          w-full
        `}
        disabled={disabled}
        id={id}
        placeholder=" "
        type={type}
      />
      <label 
        className={`
          -translate-y-3 
          absolute 
          duration-150 
          ${formatPrice ? 'left-9' : 'left-4'}
          origin-[0] 
          peer-focus:-translate-y-4
          peer-focus:scale-75
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          text-md
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
          top-5 
          transform 
          z-10 
        `}
      >
        {label}
      </label>
    </div>
   );
}
 
export default Input;