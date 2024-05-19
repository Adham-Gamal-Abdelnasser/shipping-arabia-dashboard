import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCatchCurrentClientData } from '../../../../store/slices/GlobalSlice';
const ChatsClients = ({ data }) => {
    const dispatch = useDispatch();

    const [dataForFilter, setDataForFilter] = useState(null);

    const { newChatsSearchValue } = useSelector((state) => state.GlobalReducer);

    const searchForItem = (newChatsSearchValue) => {
        const searchValue = newChatsSearchValue;
        if (newChatsSearchValue !== null && typeof newChatsSearchValue !== "undefined") {
            const filteredData = data?.filter((item) => {
                return (
                    item.name.toLowerCase().includes(searchValue) ||
                    item.id.toString().toLowerCase().includes(searchValue)
                )
            })
            setDataForFilter(filteredData);
        }
        (newChatsSearchValue === null || typeof newChatsSearchValue === "undefined") && setDataForFilter(data)
    }

    useEffect(() => {
        searchForItem(newChatsSearchValue)
    }, [newChatsSearchValue, data])
    return (
        <div>
            {
                data && dataForFilter?.map((item, index) => {
                    return (

                        <div
                            onClick={() => {
                                dispatch(setCatchCurrentClientData({
                                    name: item?.name,
                                    id: item?.id,
                                    role: item?.role
                                }))
                            }}
                            key={index} className='cursor-pointer flex items-start gap-2 py-2 px-4 border border-l-0 border-r-0'>
                            <div className="avatar">
                                <i className='text-[30px] py-1 px-[7px] border bg-[#fafafa] rounded-full object-fill fas fa-user' />
                            </div>
                            <div>
                                <div className="name mb-2">
                                    <div className="name text-[#45464E] text-[16px] font-semibold">
                                        {item?.name}
                                    </div>
                                </div>

                                <div className="lastMessage flex items-center justify-between text-[#8B8D97] text-[11px] font-normal">
                                    <div className="message">{item?.LMessage && item?.LMessage}</div>
                                    <div className="time">{item?.time && item?.time}</div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default ChatsClients;
