const initialState = {
    messages: null,
    error: null,
};

export const messagesReducer = (state=initialState, action) => {
    switch (action.type) {
        case "SET_MESSAGES" :
            return { ...state, messages: action.payload, error: null };

        case "SET_ERROR" :
            return { messages: null, error: action.payload };

        default:
            return state;
    };
};