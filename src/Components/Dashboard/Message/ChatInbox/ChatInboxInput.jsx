import React, { useEffect, useState } from 'react';
import send_icon from "../../../../assets/message/send_icon.png";
import { collection, doc, getFirestore, addDoc, updateDoc } from 'firebase/firestore';
import { app } from '../../../../firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import formattedDate from '../../../../currentDate';
import { setRefreshOnSendMessage } from '../../../../store/slices/GlobalSlice';

const ChatInboxInput = () => {
    const dispatch = useDispatch();

    const [caughtMessageValue, setMessageValue] = useState('');
    const { catchCurrentClientData } = useSelector((state) => state.GlobalReducer);




    const db = getFirestore(app);

    const onClickSendMessage = async () => {
        try {
            const messagesCollection = collection(doc(collection(db, "userChat"), catchCurrentClientData?.id), "messages");
            await addDoc(messagesCollection, {
                date: new Date(),
                senderId: "admin",
                receiverId: catchCurrentClientData?.id,
                messageValue: caughtMessageValue
            });
            if (catchCurrentClientData?.role === "user") {
                const informationDocument = doc(db, "informationUser", catchCurrentClientData?.id);

                const result = await updateDoc(informationDocument, {
                    LMessage: caughtMessageValue
                });
            }
            else {

                const informationDocument = doc(db, "information", catchCurrentClientData?.id);

                const result = await updateDoc(informationDocument, {
                    LMessage: caughtMessageValue
                });
            }
        } catch (error) {
            return error;
        }
    };

    return (
        <div className='border sendMessage rounded-xl p-2 flex items-center justify-between bg-white relative z-50'>
            <div className="addFile">
                {/* <label className='cursor-pointer'>
                    <p className='bg-[#0a2f351a] text-[24px] w-[25px] px-4 rounded-lg flex items-center justify-center'>+</p>
                    <input type="file" className='hidden' />
                </label> */}
            </div>
            <div className="input w-full">
                <input
                    onChange={(e) => setMessageValue(e.target.value)}
                    type="text"
                    name="message"
                    id="message"
                    className='w-full border-0 outline-none'
                />
            </div>
            <div>
                <button
                    onClick={
                        (e) => {
                            dispatch(setRefreshOnSendMessage(Math.random()))
                            onClickSendMessage()
                            e.target.closest(".sendMessage").querySelector("input").value = "";
                        }
                    }
                    className='bg-[#0a2f351a] py-2 px-6 rounded-lg flex items-center justify-center'>
                    Send
                    <img src={send_icon} alt="send_icon" />
                </button>
            </div>
        </div>
    );
};

export default ChatInboxInput;
