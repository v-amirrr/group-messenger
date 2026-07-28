import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    arrow: 'DOWN',
    scrollButton: {
        clicked: false,
        direction: '',
    },
};

const scrollSlice = createSlice({
    name: 'scroll',
    initialState,
    reducers: {
        setArrowUp: (state) => {
            if (state.arrow !== 'UP')
            return {
                ...state,
                arrow: 'UP'
            };
        },
        setArrowDown: (state) => {
            if (state.arrow !== 'DOWN')
            return {
                ...state,
                arrow: 'DOWN'
            };
        },
        setScrollButtonClicked: (state, action) => {
            return {
                ...state,
                scrollButton: {
                    clicked: true,
                    direction: state.arrow,
                },
            };
        },
        setScrollButtonUnclicked: (state) => {
            return {
                ...state,
                scrollButton: {
                    clicked: false,
                    direction: '',
                },
            };
        },
    },
});

export const {
    setArrowUp,
    setArrowDown,
    setScrollButtonClicked,
    setScrollButtonUnclicked,
} = scrollSlice.actions;

export default scrollSlice.reducer;