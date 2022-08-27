const initialState = {
    messages: null,
    error: null,
    loading: false,
};

export const messagesReducer = (state=initialState, action) => {
    switch (action.type) {
        case "SET_MESSAGES" :
            return { ...state, messages: action.payload, error: null };

        case "SET_ERROR" :
            return { ...state, messages: null, error: action.payload };

        case "SET_LOADING_ON":
            return { ...state, loading: true };

        case "SET_LOADING_OFF":
            return { ...state, loading: false };

        default:
            return state;
    };
};