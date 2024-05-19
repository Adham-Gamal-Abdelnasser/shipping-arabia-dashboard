import { useSelector } from "react-redux";
import ChatInboxHead from "./ChatInboxHead";
import ChatInboxInput from "./ChatInboxInput";
import ChatInboxMessages from "./ChatInboxMessages/ChatInboxMessages";


const ChatInbox = () => {
    const { catchCurrentClientData } = useSelector((state) => state.GlobalReducer);

    return (
        <>
            <ChatInboxHead />
            {
                catchCurrentClientData.name ?
                    <div className='px-4'>
                        <div className='h-[calc(64.5vh-20px)]'>
                            <ChatInboxMessages />
                        </div>
                        <div className="shadow-xl rounded-xl">
                        <ChatInboxInput />
                        </div>
                    </div> : <div className="w-full h-[100vh] flex items-center justify-center font-bold text-[2vw] -translate-y-20">
                        Click To Start Chat
                    </div>
            }
        </>
    );
}

export default ChatInbox;
