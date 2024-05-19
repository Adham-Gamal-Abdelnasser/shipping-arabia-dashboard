import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openAddNewMessage: 0,
    catchClickedNewMessagePersonData: {
        id: null,
        name: null,
        neighborhood: null,
        switchUserAgentChat: 1,
    },
    newChatsSearchValue: null,
    catchCurrentClientData: {
        name: null,
        role: null,
        id: null
    },
    refreshOnSendMessage: 0
};

const GlobalReducer = createSlice({
    name: "global",
    initialState,
    reducers: {
        setOpenAddNewMessage: (state, action) => {
            state.openAddNewMessage = action.payload
        },
        setCatchClickedNewMessagePersonData: (state, action) => {
            state.catchClickedNewMessagePersonData = action.payload;
        },
        setSwitchUserAgentChat: (state, action) => {
            state.switchUserAgentChat = action.payload
        },
        setChatsSearchWord: (state, action) => {
            state.newChatsSearchValue = action.payload
        },
        setCatchCurrentClientData: (state, action) => {
            state.catchCurrentClientData = action.payload
        },
        setRefreshOnSendMessage: (state, action) => {
            state.refreshOnSendMessage = action.payload
        }
    }
})

export const { setOpenAddNewMessage, setCatchClickedNewMessagePersonData, setSwitchUserAgentChat, setChatsSearchWord, setCatchCurrentClientData ,setRefreshOnSendMessage} = GlobalReducer.actions
export default GlobalReducer.reducer