import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export const InputWithText = ({ register, item, demo = "" }) => {
  const { placeholder, text, type = "text", name = "" } = item;
  const [showPass, setShowPass] = useState(false);
  const [inputType, setInputType] = useState('text')

  useEffect(() => {
    if(inputType==='password'){
      if(showPass){
        setInputType('text')
      }else{
        setInputType('password')
      }
    }else{
      setInputType(type)
    }
  }, [showPass])
  return (
    <div>
      <p className="text-sm mb-2">{text}</p>
      <div
        className={`border rounded-md  text-sm flex  items-center ${demo ? "justify-between" : ""
          } pr-6 `}
      >
        <input
          {...register(name)}
          className={`w-full font-medium placeholder:font-normal placeholder:text-[#E0DEE2] outline-none rounded-md  py-3 px-4 text-sm ${item.customClass}`}
          placeholder={placeholder}
          type={inputType}
          name={name}
          id={name}
          required={register.required}
        />
        {demo && <span className="text-black font-medium">{demo}</span>}
        {type === 'password' && <span  className="text-black font-medium cursor-pointer">
          {
            showPass ?
              <AiFillEyeInvisible className="text-gray-400 text-2xl" onClick={()=>setShowPass(false)}/>
              :
              <AiFillEye className="text-2xl" onClick={()=>setShowPass(true)}/>
          }
        </span>}
      </div>
    </div>
  );
};
