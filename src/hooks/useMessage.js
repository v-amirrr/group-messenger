import { useState, useEffect } from "react";
import { useMessageOptions } from "./useMessageOptions";
import { useSelect } from "./useSelect";
import { useSelector } from "react-redux";

export const useMessage = (messageData, type, messageRef, options, onClick) => {

    const {
        uid,
        plainText,
        time,
        id,
        replyTo,
        deleted,
        arrayText,
        previousMessageUid,
        nextMessageUid,
        previousMessageDifferentDate,
        nextMessageDifferentDate,
        username,
        isLocalMessage,
        localUid,
        isTextPersian,
        textLetters,
     } = messageData;

    const { selectedMessages, scrollMessageId } = useSelector(store => store.appStore);
    const { replyMessage, addMessageScrollPosition, applyScrollMessageId } = useMessageOptions();
    const { selectMessage, checkMessage, unSelectMessage } = useSelect();
    const [messagePosition, setMessagePosition] = useState(null);
    const [hold, setHold] = useState(false);
    const [selected, setSelected] = useState(false);
    const [replyEffect, setReplyEffect] = useState(false);
    const [status, setStatus] = useState(time?.year == undefined ? 1 : 0);
    let timer;
    let messageStyles = {
        messageBoxMargin: type == 'TRASH' ?
            '.2rem' :
            messagePosition == 0 ?
            '.1rem 0 .1rem 0' :
            messagePosition == 1 ?
            '.1rem 0 .06rem 0' :
            messagePosition == 2 ?
            '.06rem 0 .06rem 0' :
            messagePosition == 3 &&
            '.06rem 0 .1rem 0',
        messageBoxMarginRight: type == 'TRASH' ?
            '2rem' :
            selectedMessages.length && isLocalMessage ?
            '3rem' : '',
        messageBoxMarginLeft: selectedMessages?.length && !isLocalMessage ? '3rem' : '',
        messageBoxRoundBorderRadius: isLocalMessage ?
            messagePosition == 0 ?
            '25px' : messagePosition == 1 ?
            '25px 25px 8px 25px' :
            messagePosition == 2 ?
            '25px 8px 8px 25px' :
            messagePosition == 3 &&
            '25px 8px 25px 25px' :
            messagePosition == 0 ?
            '8px 25px 25px 25px' :
            messagePosition == 1 ?
            '8px 25px 25px 8px' :
            messagePosition == 2 ?
            '8px 25px 25px 8px' :
            messagePosition == 3 &&
            '8px 25px 25px 25px',
        messageBoxNotRoundBorderRadius: isLocalMessage ?
            messagePosition == 0 ?
            '20px' : messagePosition == 1 ?
            '20px 20px 8px 20px' :
            messagePosition == 2 ?
            '20px 8px 8px 20px' :
            messagePosition == 3 &&
            '20px 8px 20px 20px' :
            messagePosition == 0 ?
            '8px 20px 20px 20px' :
            messagePosition == 1 ?
            '8px 20px 20px 8px' :
            messagePosition == 2 ?
            '8px 20px 20px 8px' :
            messagePosition == 3 &&
            '8px 20px 20px 20px',
        messageBoxPadding: type == 'TRASH' && textLetters > 2 ?
            '.45rem .6rem' :
            type == 'TRASH' && textLetters <= 2 ?
            '.45rem .9rem' :
            replyTo != 'no_reply' ?
            '.45rem .6rem .45rem .45rem' :
            textLetters <= 2 ?
            '.45rem 1rem' :
            textLetters > 2 ?
            '.45rem .6rem' : '',
    };

    useEffect(() => {
        detectMessagePosition();
        if (type == 'CHAT') {
            addMessageScrollPosition(id, messageRef.current?.getBoundingClientRect().top);
        }
    }, [nextMessageUid, previousMessageUid, previousMessageDifferentDate, nextMessageDifferentDate]);

    useEffect(() => {
        checkMessage(id, selected, setSelected);
        if (!selectedMessages?.length) {
            setHold(false);
        }
    }, [selectedMessages]);

    useEffect(() => {
        if (status == 1 && time.year) {
            setStatus(2);
            setTimeout(() => {
                setStatus(0);
            }, 1500);
        }
    }, [time]);

    useEffect(() => {
        if (scrollMessageId.id == id) {
            setReplyEffect(true);
            setTimeout(() => {
                setReplyEffect(false);
            }, 1000);
        }
    }, [scrollMessageId]);

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
        if (status != 1 && status != 2) {
            if (type == 'CHAT' || type == 'TRASH') {
                if (selectedMessages?.length || type == 'TRASH') {
                    if (hold) {
                        setHold(false);
                    } else if (selected && !hold) {
                        unSelectMessage(id);
                        setSelected(false);
                    } else {
                        selectMessage({ ...messageData });
                    }
                } else {
                    if (options?.messageOptions?.id == id && type == 'CHAT') {
                        options.setMessageOptions(false);
                    } else {
                        options.setMessageOptions(messageData);
                    }
                }
            } else {
                onClick();
            }
        }
    };

    const messageDoubleClickHandler = () => {
        if (!selectedMessages?.length && type == 'CHAT' && status != 1 && status != 2) {
            options.setMessageOptions(false);
            replyMessage(id, plainText, username);
        }
    };

    const onHoldStarts = () => {
        let scrollLocalStorage = localStorage.getItem('scroll');
        if (!selectedMessages?.length && type == 'CHAT') {
            timer = setTimeout(() => {
                if (scrollLocalStorage == localStorage.getItem('scroll')) {
                    selectMessage({ ...messageData });
                    setHold(true);
                }
            }, 300);
        }
    };

    const onHoldEnds = () => {
        if (!selectedMessages?.length) {
            clearTimeout(timer);
            setHold(false);
        }
    };

    return {
        messagePosition,
        messageClickHandler,
        messageDoubleClickHandler,
        onHoldStarts,
        onHoldEnds,
        selected,
        replyEffect,
        status,
        messageStyles,
    };
};