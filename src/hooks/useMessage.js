import { useState, useEffect } from "react";
import { useOptions } from "./useOptions";
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
        isTextPersian,
        textLetters,
     } = messageData;

    const { selectedMessages, scrollMessageId } = useSelector(store => store.appStore);
    const { replyMessage, addMessageScrollPosition, applyScrollMessageId } = useOptions();
    const { selectMessage, unSelectMessage } = useSelect();
    const [messagePosition, setMessagePosition] = useState(null);
    const [hold, setHold] = useState(false);
    const [selected, setSelected] = useState(false);
    const [replyEffect, setReplyEffect] = useState(false);
    const [status, setStatus] = useState(time?.year == undefined ? 1 : 0);

    let selectByHoldingTimer;
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
        messageBoxMarginRight: selectedMessages.length && isLocalMessage ?
            '3rem' : '',
        messageBoxMarginLeft: selectedMessages?.length && !isLocalMessage ? '3rem' : '',
        messageBoxRoundBorderRadius: isLocalMessage ?
            messagePosition == 0 ?
            '25px' : messagePosition == 1 ?
            '25px 25px 12px 25px' :
            messagePosition == 2 ?
            '25px 12px 12px 25px' :
            messagePosition == 3 &&
            '25px 12px 25px 25px' :
            messagePosition == 0 ?
            '12px 25px 25px 25px' :
            messagePosition == 1 ?
            '12px 25px 25px 12px' :
            messagePosition == 2 ?
            '12px 25px 25px 12px' :
            messagePosition == 3 &&
            '12px 25px 25px 25px',
        messageBoxNotRoundBorderRadius: isLocalMessage ?
            messagePosition == 0 ?
            '20px' :
            messagePosition == 1 ?
            '20px 20px 12px 20px' :
            messagePosition == 2 ?
            '20px 12px 12px 20px' :
            messagePosition == 3 &&
            '20px 12px 20px 20px' :
            messagePosition == 0 ?
            '12px 20px 20px 20px' :
            messagePosition == 1 ?
            '12px 20px 20px 12px' :
            messagePosition == 2 ?
            '12px 20px 20px 12px' :
            messagePosition == 3 &&
            '12px 20px 20px 20px',
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
            addMessageScrollPosition(id, messageRef?.current?.getBoundingClientRect()?.top);
        }
    }, [nextMessageUid, previousMessageUid, previousMessageDifferentDate, nextMessageDifferentDate]);

    useEffect(() => {
        if (!selectedMessages?.length) {
            setHold(false);
            setSelected(false);
        } else {
            if (selectedMessages[selectedMessages.length-1].id == messageData.id) {
                setSelected(true);
            }
        }
    }, [selectedMessages]);

    useEffect(() => {
        if (status == 1 && time.year) {
            setStatus(2);
            setTimeout(() => {
                setStatus(0);
            }, 1000);
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

    const selectThisMessage = () => {
        selectMessage({
            id: messageData.id,
            plainText: messageData.plainText,
            isLocalMessage: messageData.isLocalMessage,
            time: messageData.time,
        });
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
        if (status != 1 && status != 2) {
            if (type == 'CHAT' || type == 'TRASH') {
                if (selectedMessages?.length) {
                    if (hold) {
                        setHold(false);
                    } else if (selected && !hold) {
                        unSelectMessage(id, messageData.isLocalMessage);
                        setSelected(false);
                    } else {
                        selectThisMessage();
                    }
                } else {
                    options.setMessageOptions({
                        data: {
                            ...messageData,
                            top: messageRef?.current?.getBoundingClientRect()?.top,
                            left: messageRef?.current?.getBoundingClientRect()?.left,
                            width: messageRef?.current?.offsetWidth,
                            height: messageRef?.current?.offsetHeight,
                            messageStyles,
                            messagePosition: 0,
                        },
                        animationStatus: 1
                    });
                }
            } else {
                onClick();
            }
        }
    };

    const onHoldStarts = () => {
        let scrollLocalStorage = localStorage.getItem('scroll');
        if (!selectedMessages?.length && type != 'EDIT_REPLY') {
            selectByHoldingTimer = setTimeout(() => {
                if (scrollLocalStorage == localStorage.getItem('scroll')) {
                    selectThisMessage();
                    setHold(true);
                }
            }, 300);
        }
    };

    const onHoldEnds = () => {
        if (!selectedMessages?.length) {
            clearTimeout(selectByHoldingTimer);
            setHold(false);
        }
    };

    return {
        messagePosition,
        messageClickHandler,
        onHoldStarts,
        onHoldEnds,
        selected,
        replyEffect,
        status,
        messageStyles,
    };
};