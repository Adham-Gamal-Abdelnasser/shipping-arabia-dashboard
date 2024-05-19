import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCatchClickedNewMessagePersonData, setOpenAddNewMessage } from '../../../store/slices/GlobalSlice';
import { baseUrl } from '../../../env';
import axios from 'axios';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../../../firebase.config';

const AddNewMessageModal = () => {

    const db = getFirestore(app);


    const addNewMessageDataToFireBaseInformationCollection = async (collectionName, data) => {
        try {
            const informationDocument = doc(db, collectionName, data?.id);
            const result = await setDoc(informationDocument, data);
            result && console.log(result);
        }
        catch (error) {
            return error;
        }
    }


    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [dataForFilter, setDataForFilter] = useState(null);
    const [isAgent, setIsAgent] = useState(1);

    const getAllShippingAgents = async () => {
        try {
            if (isAgent == 1) {
                const result = await axios.get(`${baseUrl}/agent`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                result && setData(result?.data?.result);
            }
            else {
                const result = await axios.get(`${baseUrl}/user`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                result && setData(result?.data?.result);
            }
        }
        catch (error) {
            return error;
        }
    }

    const searchForItem = (e) => {
        const searchValue = e.target.value.toString().toLowerCase();
        const filteredData = data?.filter((item) => {
            return (
                item.Name.toLowerCase().includes(searchValue) ||
                item._id.toString().toLowerCase().includes(searchValue)
            )
        })
        setDataForFilter(filteredData);
        (searchValue === null || typeof searchValue === "undefined") && setDataForFilter(data)
    }

    useEffect(() => {
        getAllShippingAgents()
    }, [isAgent])

    useEffect(() => {
        setDataForFilter(data)
    }, [data])
    return (
        <div className="bg-white w-[400px] h-[400px] rounded-xl shadow-xl p-2">

            <div className='w-full flex items-center justify-between gap-2 mb-2'>
                <input type="search" className='w-full border outline-0 p-2 rounded-xl' placeholder="Search here"
                    onChange={(e) => {
                        searchForItem(e)
                    }}
                />

                <i className='fas fa-x p-1 cursor-pointer'
                    onClick={() => {
                        dispatch(setOpenAddNewMessage(false))
                    }}
                ></i></div>
            {
                !dataForFilter && <div className='w-full min-h-[150px] flex items-end justify-center'>
                    no Data Found
                </div>
            }
            <div className='border max-h-[300px] rounded-xl mt-2 overflow-y-scroll no-scrollbar'>
                {
                    data && dataForFilter?.map((item, index) => {
                        return <div key={index} className='flex items-center justify-between p-1 py-4 border hover:bg-[#0a2f351a] cursor-pointer'
                            onClick={() => {
                                dispatch(setCatchClickedNewMessagePersonData({ id: item?._id, name: item?.Name, neighborhood: (item?.Address && !item?.Area) ? item?.Address?.Governorate : item?.Area?.Neighborhood }))
                                const clickedRowData = {
                                    id: item?._id,
                                    name: item?.Name,
                                    role: item?.Role,
                                    address: item?.Address
                                }
                                isAgent == 1 && addNewMessageDataToFireBaseInformationCollection("information", clickedRowData)
                                isAgent == 0 && addNewMessageDataToFireBaseInformationCollection("informationUser", clickedRowData)
                                setTimeout(() => {
                                    dispatch(setOpenAddNewMessage(false))
                                }, 200)
                            }}
                        >
                            <span>{item?._id}</span>
                            <span>{item?.Name}</span>

                            <span>
                                {(item?.Address && item?.Area) && item?.Area?.Neighborhood}
                                {(item?.Address && !item?.Area) && item?.Address?.Governorate}
                            </span>
                        </div>
                    })
                }
            </div>
            <div className='switchUserAgent mt-2'>

                <label class="inline-flex items-center cursor-pointer">
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

export default AddNewMessageModal;
