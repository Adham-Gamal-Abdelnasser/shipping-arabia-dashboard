import ChatHead from "../Components/Dashboard/Message/ChatHead"
import ChatInbox from "../Components/Dashboard/Message/ChatInbox/ChatInbox"
import ChatsSideBar from "../Components/Dashboard/Message/ChatSideBar/ChatsSideBar"


const Message = () => {
    return (
        <div className="bg-white  rounded-xl max-h-[90vh] overflow-hidden -translate-y-5 border py-2">
            <ChatHead />
            <div className="flex items-start  gap-2 mt-6">
                <div className="flex-1">
                    <ChatsSideBar />
                </div>
                <div className="flex-[2]">
                    <ChatInbox />
                </div>
            </div>
        </div>
    )
}

export default Message


