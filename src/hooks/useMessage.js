import { useState, useEffect } from "react";
import { useSelect } from "./useSelect";
import { useSelector } from "react-redux";
import { useSkeletonEffect } from "./useSkeletonEffect";

export const useMessage = (messageData, type, messageRef, options, editReplyClickHandler) => {
    // types: chat, options, trash, edit reply modal
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

    const { selectedMessages, skeletonEffect } = useSelector(store => store.appStore);
    const { storeMessageScrollPosition } = useSkeletonEffect();
    const { select, unSelect } = useSelect();
    const [messagePosition, setMessagePosition] = useState(null);
    const [hold, setHold] = useState(false);
    const [selected, setSelected] = useState(false);
    const [messageSkeletonEffect, setMessageSkeletonEffect] = useState(false);
    const [status, setStatus] = useState(time?.year == undefined ? 1 : 0);

    let selectByHoldingTimer;
    let styles = {
        boxMargin:
            type == 'TRASH' ? '.06rem' :
            messagePosition == 0 ? '.1rem 0' :
            messagePosition == 1 ? '.1rem 0 .06rem 0' :
            messagePosition == 2 ? '.06rem 0 .06rem 0' :
            messagePosition == 3 && '.06rem 0 .1rem 0',
        boxMarginRight:
            selectedMessages.length && isLocalMessage ? '3rem' : '',
        boxMarginLeft:
            selectedMessages?.length && !isLocalMessage ? '3rem' : '',
        boxRoundRadius:
            isLocalMessage && messagePosition == 0 ? '25px' :
            isLocalMessage && messagePosition == 1 ? '25px 25px 12px 25px' :
            isLocalMessage && messagePosition == 2 ? '25px 12px 12px 25px' :
            isLocalMessage && messagePosition == 3 ? '25px 12px 25px 25px' :
            !isLocalMessage && messagePosition == 0 ? '12px 25px 25px 25px' :
            !isLocalMessage && messagePosition == 1 ? '12px 25px 25px 12px' :
            !isLocalMessage && messagePosition == 2 ? '12px 25px 25px 12px' :
            !isLocalMessage && messagePosition == 3 && '12px 25px 25px 25px',
        boxNotRoundRadius:
            isLocalMessage && messagePosition == 0 ? '20px' :
            isLocalMessage && messagePosition == 1 ? '20px 20px 12px 20px' :
            isLocalMessage && messagePosition == 2 ? '20px 12px 12px 20px' :
            isLocalMessage && messagePosition == 3 ? '20px 12px 20px 20px' :
            !isLocalMessage && messagePosition == 0 ? '12px 20px 20px 20px' :
            !isLocalMessage && messagePosition == 1 ? '12px 20px 20px 12px' :
            !isLocalMessage && messagePosition == 2 ? '12px 20px 20px 12px' :
            !isLocalMessage && messagePosition == 3 && '12px 20px 20px 20px',
        boxPadding:
            replyTo != 'NO_REPLY' && type != 'TRASH' ?
            '.45rem .6rem .45rem .45rem' :
            textLetters <= 2 ?
            '.45rem 1rem' :
            textLetters > 2 ?
            '.45rem .6rem' : '',
        boxJustify:
            isLocalMessage ? 'flex-start' : 'flex-end',
        messageFlexDirection:
            isLocalMessage ? 'row-reverse' : 'row',
        messagePaddingTop:
            time?.year && messagePosition < 2 && !isLocalMessage && !previousMessageDifferentDate ? '1.8rem' :
            time?.year && messagePosition < 2 && !isLocalMessage && previousMessageDifferentDate ? '3rem' :
            time?.year && previousMessageDifferentDate ? '1.8rem' : ''
    };

    // setting message position, storing message scroll position
    useEffect(() => {
        detectMessagePosition();
        if (type == 'CHAT') {
            storeMessageScrollPosition(id, {
                top: ~~messageRef?.current?.offsetTop,
                height: ~~messageRef?.current?.getBoundingClientRect()?.height,
            });
        }
    }, [nextMessageUid, previousMessageUid, previousMessageDifferentDate, nextMessageDifferentDate]);

    // handling selected state (used to change message styles when message gets selected)
    useEffect(() => {
        if (!selectedMessages?.length) {
            setHold(false);
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
            setStatus(2);
            setTimeout(() => {
                setStatus(0);
            }, 1000);
        }
    }, [time]);

    // applying skeleton effect (used for selecting and hovering over reply section)
    useEffect(() => {
        if (skeletonEffect == id) {
            applyMessageSkeletonEffect();
        }
    }, [skeletonEffect]);

    const isMessageLoading = () => {
        return status > 0;
    };

    const isUserSelecting = () => {
        return selectedMessages?.length ? true : false;
    };

    const applyMessageSkeletonEffect = () => {
        setMessageSkeletonEffect(true);
        setTimeout(() => {
            setMessageSkeletonEffect(false);
        }, 800);
    };

    const selectThisMessage = () => {
        select({
            id: messageData.id,
            plainText: messageData.plainText,
            isLocalMessage: messageData.isLocalMessage,
            time: messageData.time,
        });
    };

    const openOptions = () => {
        options.setMessageOptions({
            data: {
                ...messageData,
                top: messageRef?.current?.getBoundingClientRect()?.top,
                left: messageRef?.current?.getBoundingClientRect()?.left,
                width: messageRef?.current?.getBoundingClientRect()?.width,
                height: messageRef?.current?.getBoundingClientRect()?.height,
                styles,
                messagePosition: 0,
            },
            animationStatus: 1
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
        // message won't be clickable while loading
        // if select mode is off then the options will be opened
        // if select mode is on then message gets selected ro unselected whether it's been selected before or not

        if (!isMessageLoading()) {
            if (type == 'EDIT_REPLY') {
                editReplyClickHandler();
            } else {
                if (isUserSelecting()) {
                    if (hold) {
                        setHold(false);
                    } else if (selected && !hold) {
                        unSelect(id, messageData.isLocalMessage);
                        setSelected(false);
                    } else {
                        selectThisMessage();
                    }
                } else {
                    openOptions();
                }
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
            }, 200);
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
        messageSkeletonEffect,
        status,
        styles,
    };
};