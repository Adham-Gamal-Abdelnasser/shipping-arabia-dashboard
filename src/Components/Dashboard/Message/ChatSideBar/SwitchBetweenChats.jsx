import React, { useEffect, useState } from 'react';
import { setSwitchUserAgentChat } from '../../../../store/slices/GlobalSlice';
import { useDispatch } from 'react-redux';

const SwitchBetweenChats = () => {
    const [isAgent, setIsAgent] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSwitchUserAgentChat(isAgent))

    }, [isAgent])
    return (
        <div>
            <div className='switchUserAgent my-2'>

                <label class="flex items-start cursor-pointer">
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mx-4">Agent</span>
                    <input type="checkbox" value="" class="sr-only peer"
                        onClick={() => {
                            setIsAgent(!isAgent)
                        }}
                    />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-[#df982681] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#DF9726]"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mx-4" >User</span>
                </label>

            </div>
        </div>
    );
}

export default SwitchBetweenChats;
