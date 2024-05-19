import React from 'react';
import search_icon from "../../../../assets/message/search_icon_message.png";
import { useDispatch } from 'react-redux';
import { setChatsSearchWord } from '../../../../store/slices/GlobalSlice';
const ChatsSearch = () => {
    const dispatch = useDispatch()
    return (
        <div className='mt-1 mb-2 py-2 px-4'>
            <p className='border border-[#CFD3D4] rounded-xl flex items-center py-1 px-2 gap-2'>
                <img src={search_icon} alt="search_icon" />
                <input type="search" name="searchMessageClient" id="searchMessageClient" placeholder='search' className='border-0 outline-none w-full'
                    onChange={(e) => {
                        dispatch(setChatsSearchWord(e.target.value.toString().toLowerCase()))
                    }}
                />
            </p>
        </div>
    );
}

export default ChatsSearch;
