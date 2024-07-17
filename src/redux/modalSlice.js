import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalShow: false,
    modalName: null,
    modalMessages: [],
    modalEditedUsername: null,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action) => {
            return {
                ...state,
                modalShow: action.payload.modalShow,
                modalName: action.payload.modalName,
                modalMessages: action.payload.modalMessages,
                modalEditedUsername: action.payload.modalEditedUsername,
            };
        },
    },
});

export const {
    setModal,
} = modalSlice.actions;

export default modalSlice.reducer;