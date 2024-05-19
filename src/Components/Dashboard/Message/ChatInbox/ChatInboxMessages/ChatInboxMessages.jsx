import React, { useEffect, useState } from 'react';
import MessageForm from './MessageForm';
import { collection, getFirestore, getDocs, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { app } from '../../../../../firebase.config';
import { useSelector } from 'react-redux';

const ChatInboxMessages = () => {
    const db = getFirestore(app);
    const { catchCurrentClientData, refreshOnSendMessage } = useSelector((state) => state.GlobalReducer);
    const [messages, setMessages] = useState([]);

    const getCurrentMessages = async (userId) => {
        try {
            // const userMessagesRef = collection(db, `userChat/${userId}/messages`);
            // const sortedQuery = query(userMessagesRef, orderBy('date', 'asc'));
            // const querySnapshot = await getDocs(sortedQuery);

            // const messagesArray = [];
            // querySnapshot.forEach((doc) => {
            //     messagesArray.push({ id: doc.id, ...doc.data() });
            // });
            if (userId) {
                const userMessagesRef = collection(db, `userChat/${userId}/messages`);
                const sortedQuery = query(userMessagesRef, orderBy('date', 'asc'));

                const unsubscribe = onSnapshot(sortedQuery, (querySnapshot) => {
                    const messagesArray = [];
                    querySnapshot.forEach((doc) => {
                        messagesArray.push({ id: doc.id, ...doc.data() });
                    });
                    setMessages(messagesArray);
                });

                // Cleanup the listener on component unmount
                return () => unsubscribe();
            }

        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    };

    useEffect(() => {
        if (catchCurrentClientData?.id) {
            getCurrentMessages(catchCurrentClientData.id);
        }
    }, [catchCurrentClientData, refreshOnSendMessage]);


    return (
        <div className='max-h-[70vh] overflow-y-scroll no-scrollbar px-4 py-16'>
            {
                messages && messages?.map((item, index) => {
                    return <div key={index}>
                        <MessageForm data={item} />
                    </div>
                })
            }
        </div>
    );
}

export default ChatInboxMessages;
