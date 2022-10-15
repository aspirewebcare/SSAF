import React from 'react';
import { useState } from 'react'
import { Switch } from '@headlessui/react'

function RadioButton({ checkEnable }) {
    const [enabled, setEnabled] = useState(checkEnable || false)

    return (
        <div className="">
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? 'bg-orange-500' : 'bg-gray-300'}
          relative inline-flex h-[21px] w-[38px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[16px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
    )
}
export default RadioButton;