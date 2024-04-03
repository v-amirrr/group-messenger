import { useState, useEffect } from "react";
import { useMessageOptions } from "./useMessageOptions";
import { useSelector } from "react-redux";
import { useSelect } from "./useSelect";
import { isRTL } from '../functions/isRlt';

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
                        isPersian: isRTL(text) ? 1 : 0,
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
    };

    const messageDoubleClickHandler = () => {
        if (!selectedMessages?.length && type == 'CHAT') {
            options.setMessageOptions(false);
            replyMessage(id, plainText, messageUsername);
        }
    };

    const onHoldStarts = () => {
        if (!selectedMessages?.length && type == 'CHAT') {
            timer = setTimeout(() => {
                selectMessage({
                    ...message,
                    isMessageFromLocalUser: messageUid == localUid ? 1 : 0,
                    isPersian: isRTL(text) ? 1 : 0,
                });
                setHold(true);
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
    };
};