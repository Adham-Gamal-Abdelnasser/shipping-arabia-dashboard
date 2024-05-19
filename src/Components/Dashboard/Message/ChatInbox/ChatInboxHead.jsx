import React from 'react';
import { useSelector } from 'react-redux';
const ChatInboxHead = () => {
    const { catchCurrentClientData } = useSelector((state) => state.GlobalReducer);
    return (

        <div className='flex items-center justify-between py-2 px-4 border-b'>
            <div className='flex items-start gap-4'>
                <div className="image">
                    <i className='text-[50px] bg-[#fafafa] rounded-full border p-2 object-fill fas fa-user' />
                </div>
                <div className="data">
                    <div className="name text-[#45464E] font-semibold text-[18px] capitalize">{catchCurrentClientData?.name}</div>
                    <div className="status flex items-center gap-2 mt-6">
                        <span className='flex items-center gap-2'>
                            <span className='opacity-70'>{catchCurrentClientData?.role}</span>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ChatInboxHead;
