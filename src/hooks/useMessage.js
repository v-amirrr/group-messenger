import { useState, useEffect } from "react";
import { useSelect } from "./useSelect";
import { useDispatch, useSelector } from 'react-redux';
import { setOptionsMessage, setOptionsAnimationStatus } from '../redux/optionsSlice';
import { useSkeletonEffect } from "./useSkeletonEffect";
import { useOptions } from "./useOptions";

export const useMessage = (messageData, type, messageRef) => {
    // types (places that message component is used): chat, options, trash, edit reply
    // status: 1 means loading, 2 means check animation, 0 means fully sent

    const {
        uid,
        plainText,
        time,
        id,
        replyTo,
        arrayText,
        previousMessageUid,
        nextMessageUid,
        previousMessageDifferentDate,
        nextMessageDifferentDate,
        isLocalMessage,
        isTextPersian,
        textLetters,
    } = messageData;

    const dispatch = useDispatch();
    const { selectedMessages } = useSelector(store => store.selectStore);
    const { skeletonEffect } = useSelector(store => store.appStore);
    const { optionsMessage } = useSelector(store => store.optionsStore);
    const { storeMessageScrollPosition } = useSkeletonEffect();
    const { select, disselect } = useSelect();
    const { addNewReplyId } = useOptions();
    const [messagePosition, setMessagePosition] = useState(null);
    const [selected, setSelected] = useState(false);
    const [messageSkeletonEffect, setMessageSkeletonEffect] = useState(false);
    const [status, setStatus] = useState(0);

    let styles = {
        boxMargin:
            type == 'TRASH' ? '.06rem' :
            messagePosition == 0 ? '.1rem 0' :
            messagePosition == 1 ? '.1rem 0 .06rem 0' :
            messagePosition == 2 ? '.06rem 0 .06rem 0' :
            messagePosition == 3 && '.06rem 0 .1rem 0',
        boxMarginRight: selectedMessages.length && isLocalMessage ? '2rem' : '',
        boxMarginLeft: selectedMessages?.length && !isLocalMessage ? '2rem' : '',
        boxRoundRadius:
            isLocalMessage && messagePosition == 0 ? '25px' :
            isLocalMessage && messagePosition == 1 ? '25px 25px 15px 25px' :
            isLocalMessage && messagePosition == 2 ? '25px 15px 15px 25px' :
            isLocalMessage && messagePosition == 3 ? '25px 15px 25px 25px' :
            !isLocalMessage && messagePosition == 0 ? '15px 25px 25px 25px' :
            !isLocalMessage && messagePosition == 1 ? '15px 25px 25px 15px' :
            !isLocalMessage && messagePosition == 2 ? '15px 25px 25px 15px' :
            !isLocalMessage && messagePosition == 3 && '15px 25px 25px 25px',
        boxNotRoundRadius:
            isLocalMessage && messagePosition == 0 ? '20px' :
            isLocalMessage && messagePosition == 1 ? '20px 20px 15px 20px' :
            isLocalMessage && messagePosition == 2 ? '20px 15px 15px 20px' :
            isLocalMessage && messagePosition == 3 ? '20px 15px 20px 20px' :
            !isLocalMessage && messagePosition == 0 ? '15px 20px 20px 20px' :
            !isLocalMessage && messagePosition == 1 ? '15px 20px 20px 15px' :
            !isLocalMessage && messagePosition == 2 ? '15px 20px 20px 15px' :
            !isLocalMessage && messagePosition == 3 && '15px 20px 20px 20px',
        boxPadding:
            textLetters <= 3 ?
            '.45rem 1rem' :
            textLetters > 3 ?
            '.45rem .6rem' : '',
        boxJustify: isLocalMessage ? 'flex-start' : 'flex-end',
        boxVisibility: optionsMessage?.id == id ? 'hidden' : 'visible',
        messageFlexDirection: isLocalMessage ? 'row-reverse' : 'row',
        messagePaddingTop:
            time?.year && messagePosition < 2 && !isLocalMessage && !previousMessageDifferentDate ? '1.8rem' :
            time?.year && messagePosition < 2 && !isLocalMessage && previousMessageDifferentDate ? '3rem' :
            time?.year && previousMessageDifferentDate ? '1.8rem' : '',
        nextToMessageFlexDirection: isLocalMessage ? 'row' : 'row-reverse',
    };

    // setting message position, storing message scroll position
    useEffect(() => {
        detectMessagePosition();
        if (type == 'CHAT') {
            storeMessageScrollPosition(id, {
                top: messageRef?.current?.offsetTop-200,
            });
        }
    }, [nextMessageUid, previousMessageUid, previousMessageDifferentDate, nextMessageDifferentDate]);

    // handling selected state (used to change message styles when message gets selected)
    useEffect(() => {
        if (!selectedMessages?.length) {
            setSelected(false);
        } else {
            if (selectedMessages[selectedMessages.length-1].id == messageData.id && !selected) {
                setSelected(true);
            }
        }
    }, [selectedMessages]);

    // handling loading status when a new message gets sent
    useEffect(() => {
        if (status == 1 && time?.year) {
            showCheck();
        }
    }, [time, status]);

    // applying skeleton effect (used for selecting and hovering over reply section)
    useEffect(() => {
        if (skeletonEffect == id) {
            applyMessageSkeletonEffect();
        }
    }, [skeletonEffect]);

    // handling status state when message gets sent (so that user can see the message loader)
    useEffect(() => {
        if (!time?.year) {
            setTimeout(() => {
                if (time?.year) {
                    showCheck();
                } else {
                    setStatus(1);
                }
            }, 600);
        }
    }, []);

    const isMessageLoading = () => status > 0;

    const isUserSelecting = () => selectedMessages?.length ? true : false;

    const showCheck = () => {
        setStatus(2);
        setTimeout(() => {
            setStatus(0);
        }, 1000);
    };

    const applyMessageSkeletonEffect = () => {
        setMessageSkeletonEffect(true);
        setTimeout(() => {
            setMessageSkeletonEffect(false);
        }, 800);
    };

    const selectHandler = () => {
        if (selected) {
            disselect(id, messageData.isLocalMessage);
            setSelected(false);
        } else {
            select({
                id: messageData.id,
                plainText: messageData.plainText,
                isLocalMessage: messageData.isLocalMessage,
                time: messageData.time,
            });
        }
    };

    const openOptions = () => {
        dispatch(setOptionsMessage({
            ...messageData,
            top: messageRef?.current?.getBoundingClientRect()?.top,
            left: messageRef?.current?.getBoundingClientRect()?.left,
            width: messageRef?.current?.getBoundingClientRect()?.width,
            height: messageRef?.current?.getBoundingClientRect()?.height,
            styles,
            messagePosition: 0,
        }));
        dispatch(setOptionsAnimationStatus(1));
    };

    const detectMessagePosition = () => {
        if (type == 'TRASH') {
            setMessagePosition(0);
        } else {
            if (previousMessageDifferentDate && nextMessageDifferentDate) {
                setMessagePosition(0);
            }
            if (previousMessageDifferentDate && !nextMessageDifferentDate) {
                if (nextMessageUid == uid) {
                    setMessagePosition(1);
                } else {
                    setMessagePosition(0);
                }
            }
            if (!previousMessageDifferentDate && nextMessageDifferentDate) {
                if (previousMessageUid == uid) {
                    setMessagePosition(3);
                } else {
                    setMessagePosition(0);
                }
            }
            if (!previousMessageDifferentDate && !nextMessageDifferentDate) {
                if (previousMessageUid != uid && nextMessageUid != uid) {
                    setMessagePosition(0);
                } else if (previousMessageUid != uid && nextMessageUid == uid) {
                    setMessagePosition(1);
                } else if (previousMessageUid == uid && nextMessageUid == uid) {
                    setMessagePosition(2);
                } else if (previousMessageUid == uid && nextMessageUid != uid) {
                    setMessagePosition(3);
                }
            }
        }
    };

    const messageClickHandler = () => {
        if (!isMessageLoading()) {
            if (type == 'EDIT_REPLY') {
                addNewReplyId(id);
            } else {
                if (isUserSelecting()) {
                    selectHandler();
                } else {
                    openOptions();
                }
            }
        }
    };

    return {
        messagePosition,
        messageClickHandler,
        selected,
        messageSkeletonEffect,
        status,
        styles,
    };
};