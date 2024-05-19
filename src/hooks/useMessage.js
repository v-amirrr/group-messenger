import { useState, useEffect } from "react";
import { useMessageOptions } from "./useMessageOptions";
import { useSelector } from "react-redux";
import { useSelect } from "./useSelect";
import { isPersian } from '../functions/isPersian';

export const useMessage = (message, type, messageRef, options, onClick) => {

    const {
        messageUid,
        localUid,
        localMessage,
        text,
        plainText,
        isTextPersian,
        textLetters,
        id,
        replyTo,
        messageUsername,
        periorUsername,
        nextUsername,
        time,
        priorDifferentDate,
        nextDifferentDate,
    } = message;

    const { selectedMessages, scrollMessageId } = useSelector(store => store.appStore);
    const { replyMessage, addMessageScrollPosition, applyScrollMessageId } = useMessageOptions();
    const { selectMessage, checkMessage, unSelectMessage } = useSelect();
    const [messagePosition, setMessagePosition] = useState(null);
    const [hold, setHold] = useState(false);
    const [selected, setSelected] = useState(false);
    const [replyEffect, setReplyEffect] = useState(false);
    const [status, setStatus] = useState(time?.year == undefined ? 1 : 0);
    let timer;
    let messageData = {
        messageBoxMargin: type == 'TRASH' ?
            '.2rem' :
            messagePosition == 0 ?
            '.1rem 0 .1rem 0' :
            messagePosition == 1 ?
            '.1rem 0 .06rem 0' :
            messagePosition == 2 ?
            '.06rem 0 .06rem 0' :
            messagePosition == 3 &&
            '.06rem 0 .2rem 0',
        messageBoxMarginRight: type == 'TRASH' ?
            '2rem' :
            selectedMessages.length && localMessage ?
            '3rem' : '',
        messageBoxMarginLeft: type != 'TRASH' && selectedMessages.length && !localMessage ? '3rem' : '',
        messageBoxBorderRadius: type == 'TRASH' ?
            '20px' :
            localMessage ?
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
        messageBoxPadding: type == 'TRASH' && textLetters > 2 ?
            '.45rem .6rem' :
            type == 'TRASH' && textLetters <= 2 ?
            '.45rem .9rem' :
            replyTo != 'no_reply' ?
            '.45rem .7rem .45rem .45rem' :
            textLetters <= 2 ?
            '.45rem 1rem' :
            textLetters > 2 ?
            '.45rem .7rem' : '',
        messageBoxBorderRadiusPhone: localMessage ?
            messagePosition == 0 ?
            '20px' :
            messagePosition == 1 ?
            '20px 20px 5px 20px' :
            messagePosition == 2 ?
            '20px 5px 5px 20px' :
            messagePosition == 3 && '20px 5px 20px 20px' :
            messagePosition == 0 ?
            '5px 20px 20px 20px' :
            messagePosition == 1 ?
            '5px 20px 20px 5px' :
            messagePosition == 2 ?
            '5px 20px 20px 5px' :
            messagePosition == 3 &&
            '5px 20px 20px 20px',
    };

    useEffect(() => {
        detectMessagePosition();

        if (type == 'CHAT') {
            addMessageScrollPosition(id, messageRef.current?.getBoundingClientRect().top);
        }
    }, [nextUsername, periorUsername, priorDifferentDate, nextDifferentDate]);

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
            if (priorDifferentDate && nextDifferentDate) {
                setMessagePosition(0);
            }
            if (priorDifferentDate && !nextDifferentDate) {
                if (nextUsername == messageUid) {
                    setMessagePosition(1);
                } else {
                    setMessagePosition(0);
                }
            }
            if (!priorDifferentDate && nextDifferentDate) {
                if (periorUsername == messageUid) {
                    setMessagePosition(3);
                } else {
                    setMessagePosition(0);
                }
            }
            if (!priorDifferentDate && !nextDifferentDate) {
                if (periorUsername != messageUid && nextUsername != messageUid) {
                    setMessagePosition(0);
                } else if (periorUsername != messageUid && nextUsername == messageUid) {
                    setMessagePosition(1);
                } else if (periorUsername == messageUid && nextUsername == messageUid) {
                    setMessagePosition(2);
                } else if (periorUsername == messageUid && nextUsername != messageUid) {
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
                        selectMessage({
                            ...message,
                            isMessageFromLocalUser: messageUid == localUid ? 1 : 0,
                            isPersian: isPersian(text) ? 1 : 0,
                        });
                    }
                } else {
                    if (options?.messageOptions?.id == id && type == 'CHAT') {
                        options.setMessageOptions(false);
                    } else {
                        options.setMessageOptions(message);
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
            replyMessage(id, plainText, messageUsername);
        }
    };

    const onHoldStarts = () => {
        let scrollLocalStorage = localStorage.getItem('scroll');
        if (!selectedMessages?.length && type == 'CHAT') {
            timer = setTimeout(() => {
                if (scrollLocalStorage == localStorage.getItem('scroll')) {
                    selectMessage({
                        ...message,
                        isMessageFromLocalUser: messageUid == localUid ? 1 : 0,
                        isPersian: isPersian(text) ? 1 : 0,
                    });
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
        messageData,
    };
};