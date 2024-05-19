import React, { useEffect, useState } from 'react';
import ChatsSearch from './ChatsSearch';
import ChatsClients from './ChatsClients';
import ChatsSideBarHead from './ChatsSideBarHead';
import { collection, getDocs, getFirestore, onSnapshot } from 'firebase/firestore';
import { app } from '../../../../firebase.config';
import SwitchBetweenChats from './SwitchBetweenChats';
import { useSelector } from 'react-redux';

const ChatsSideBar = () => {
    const db = getFirestore(app)
    const [data, setData] = useState([]);
    const { switchUserAgentChat } = useSelector((state) => state.GlobalReducer);

    // const getAllInformationData = async (collectionName) => {
    //     try {
    //         const informationCollection = collection(db, collectionName);
    //         const querySnapshot = await getDocs(informationCollection);
    //         const documents = [];
    //         querySnapshot.forEach(doc => {
    //             documents.push(doc.data());
    //         });
    //         setData(documents);
    //     } catch (error) {
    //         console.error("Error fetching information data: ", error);
    //     }
    // };
    const getAllInformationData = (collectionName) => {
        try {
            const informationCollection = collection(db, collectionName);
            onSnapshot(informationCollection, (querySnapshot) => {
                const documents = [];
                querySnapshot.forEach(doc => {
                    documents.push({ id: doc.id, ...doc.data() });
                });
                setData(documents);
            });
        } catch (error) {
            console.error("Error fetching information data: ", error);
        }
    };


    useEffect(() => {
        switchUserAgentChat == 1 && getAllInformationData("information");
        switchUserAgentChat == 0 && getAllInformationData("informationUser");
    }, [switchUserAgentChat]);


    return (
        <div className='overflow-y-scroll max-h-[80vh] relative no-scrollbar'>
            <div className='sticky top-0 left-0 bg-white'>
                <ChatsSideBarHead data={data} />
                <ChatsSearch />
                <SwitchBetweenChats />
            </div>
            <ChatsClients data={data} />
        </div>
    );
}

export default ChatsSideBar;
