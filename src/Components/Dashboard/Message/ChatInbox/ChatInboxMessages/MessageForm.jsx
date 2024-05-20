import React, { useEffect, useRef } from 'react';

const MessageForm = ({ data }) => {
    // Convert Firebase Timestamp to JavaScript Date object
    const date = data.date ? data.date.toDate() : null;

    // Function to format time as string (HH:MM:SS)
    const formatTime = (date) => {
        if (!date) return '';
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');
        return `${hour}:${minute}:${second}`;
    };

    // Create a ref to the last message element
    const lastMessageRef = useRef(null);

    // Scroll to the last message when the component mounts or updates
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: "end" });
        }
    }, [data]);

    return (
        <div>
            <div className="mb-6">
                {
                    data?.senderId !== "admin" ?
                        <div className='flex mb-3'>
                            <div className='flex flex-col items-start'>
                                <div className='max-w-[350px] bg-[#0A2F35] text-[16px] font-normal py-2 px-3 rounded-2xl rounded-bl-none text-white break-words'>
                                    {data?.messageValue}
                                </div>
                                <div className="time text-[16px] font-normal text-[#8B8D97] mt-1">{formatTime(date)}</div>
                            </div>
                        </div> :
                        <div className='flex flex-row-reverse'>
                            <div className='flex flex-col items-end'>
                                <div className='max-w-[350px] bg-[#0a2f351a] text-[16px] font-normal py-2 px-3 rounded-2xl rounded-br-none text-black break-words'>
                                    {data?.messageValue}
                                </div>
                                <div className="time text-[16px] font-normal text-[#8B8D97] mt-1">{formatTime(date)}</div>
                            </div>
                        </div>
                }
            </div>
            <div ref={lastMessageRef}></div>
        </div>
    );
}

export default MessageForm;
