import React from 'react';
import { useDispatch } from 'react-redux';
import { setOpenAddNewMessage } from "../../../store/slices/GlobalSlice";
const ChatHead = () => {
    const dispatch = useDispatch();

    return (
        <div className='flex items-center justify-between px-4'>
            <p className='text-[16px] text-[#45464E] font-semibold opacity-75'>
                Conversations with Customers
            </p>
            <p>
                <button
                    type="button"
                    onClick={() => {
                        dispatch(setOpenAddNewMessage(1))
                    }}
                    className='text-white text-[14px] font-normal bg-[#0A2F35] rounded-2xl py-3 px-8 hover:scale-110 ease-linear transition-transform'>
                    New Message
                </button>
            </p>
        </div>
    );
}

export default ChatHead;
