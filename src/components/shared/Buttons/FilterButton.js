import React from 'react';
import icons from '../icons';
import CustomButton from './CustomButton';

const FilterButton = ({filterBtnclick}) => {
    return (
        <CustomButton
        hadleClick={filterBtnclick}
        block={false}
        btnClass="lg:w-[107px] lg:h-[46px] h-[56px] text-center text-sm font-normal rounded-lg w-[56px] border border-[#FE0000] text-[#FE0000]"
        text={
          <p className="flex justify-center items-center gap-2">
            <icons.filter />
            <span className="text-[15px] hidden lg:block">
              filters
            </span>{" "}
          </p>
        }
      />
    );
};

export default FilterButton;