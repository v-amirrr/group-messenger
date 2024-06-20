import { useDispatch } from 'react-redux';
import { setMessagesScrollPosition, setSkeletonEffect, setScrollToMessage } from '../redux/appSlice';

export const useSkeletonEffect = () => {
    const dispatch = useDispatch();

    const storeMessageScrollPosition = (id, position) => {
        dispatch(setMessagesScrollPosition({ id, position }));
    };

    const addSkeletonEffect = (id) => {
        dispatch(setSkeletonEffect(id));
        setTimeout(() => {
            dispatch(setSkeletonEffect(null));
        }, 800);
    };

    const scrollToMessage = (id) => {
        dispatch(setScrollToMessage(id));
        setTimeout(() => {
            dispatch(setScrollToMessage(null));
        }, 100);
    };

    return {
        storeMessageScrollPosition,
        addSkeletonEffect,
        scrollToMessage
    };
};