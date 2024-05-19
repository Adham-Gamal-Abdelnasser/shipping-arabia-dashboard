import React from 'react';

const ChatsSideBarHead = ({data}) => {
    return (
        <div className='flex items-center justify-between py-2 px-4'>
            <p className='text-[#2C2D33] text-[20px] font-semibold'>
                Contacts
            </p>
            <p className='text-[#A6A8B1] text-[20px] font-semibold'>
                {data?.length}
            </p>
        </div>
    );
}

export default ChatsSideBarHead;
