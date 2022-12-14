import React from "react";

const InputLabel = ({
  customClass,
  optional,
  defaultValue = "",
  placeholder = "",
  type = "",
  label = "",
  name = "",
  changeFunc = () => { },
  register = () => { },
  errors = {},
  required = true,
  defaultKey = ''
}) => {
  return (
    <div className={customClass}>
      <p className="font-semibold text-sm">
        {label}
        <span className="text-gray-400 font-normal ml-2">
          {optional ? `(Optional)` : ""}
        </span>
      </p>
      <input
        style={errors[name] ? { borderColor: "#FE0000" } : { borderColor: "" }}
        {...register(name, { required })}
        onChange={(e) => changeFunc([name], e.target.value)}
        defaultValue={defaultValue}
        key={defaultKey}
        className={`outline-none border rounded-md placeholder:text-gray-500 px-3 h-[56px] w-full mt-2`}
        placeholder={placeholder}
        type={type}
        name={name}
      />
      {
        errors[name] && <p className="text-red-500 text-xs mt-1">This feild is  required</p>
      }
    </div>
  );
};

export default InputLabel;
