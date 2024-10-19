import React, { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMessage } from '../../../hooks/useMessage';
import MessageBox from './MessageBox';
import MessageDate from './MessageDate';
import MessageUsername from './MessageUsername';
import MessageSendStatus from './MessageSendStatus';
import MessageEditReplyIndicator from './MessageEditReplyIndicator';
import MessageRepliedTo from './MessageRepliedTo';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { localMessageVariants, nonLocalMessageVariants } from '../../../config/varitans';

const Message = ({ messageData, type }) => {

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

    const messageRef = useRef();
    const [isVisible, setIsVisible] = useState(false);
    const { editReply } = useSelector(store => store.appStore);

    const {
        messagePosition,
        messageClickHandler,
        selected,
        messageSkeletonEffect,
        status,
        styles
    } = useMessage(messageData, type, messageRef);

    const showMessageDate = () => previousMessageDifferentDate && time?.year;

    const showMessageUsername = () => !isLocalMessage && messagePosition < 2;

    const showEditReplyIndicator = () => editReply?.replyId == id;

    const showRepliedTo = () => isVisible && replyTo != 'NO_REPLY' && type != 'TRASH';

    const setVariants = () => isLocalMessage ? localMessageVariants : nonLocalMessageVariants;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    observer.unobserve(messageRef?.current);
                }
            },
            {
              root: null,
              threshold: 0.1,
            }
        );

        if (messageRef?.current) {
            observer.observe(messageRef?.current);
        }

        return () => {
            if (messageRef?.current) {
              observer.unobserve(messageRef?.current);
            }
          };
    }, [isVisible]);

    return (
        <>
            <MessageContainer
                initial='hidden' animate='visible' exit='exit' variants={setVariants()}
                layout
                layoutId={id}
                ref={messageRef}
                styles={{ ...styles }}
            >
                {showMessageDate() && <MessageDate data={time} />}
                <AnimatePresence>
                    {showMessageUsername() && <MessageUsername uid={uid} showMessageDate={showMessageDate()} />}
                </AnimatePresence>
                <MessageBox
                    messageClickHandler={messageClickHandler}
                    data={{
                        type: type,
                        replyTo: replyTo,
                        arrayText: arrayText,
                        plainText: plainText,
                    }}
                    styles={{
                        ...styles,
                        selected: selected,
                        persian: isTextPersian ? 1 : 0,
                        skeletonEffect: messageSkeletonEffect ? 1 : 0,
                    }}
                />
                {showRepliedTo() ? <MessageRepliedTo replyTo={replyTo} type={type} isLocalMessage={isLocalMessage} /> : ''}
                <div className='next-to-message'>
                    <AnimatePresence>
                        {showEditReplyIndicator() ? <MessageEditReplyIndicator key='MessageEditReplyIndicator' /> : ''}
                    </AnimatePresence>
                    <MessageSendStatus status={status} />
                </div>
            </MessageContainer>
        </>
    );
};

const MessageContainer = styled(motion.div)`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: ${props => props.styles.messageFlexDirection};
    padding-top: ${props => props.styles.messagePaddingTop};
    transition: padding .2s;

    .next-to-message {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: ${props => props.styles.nextToMessageFlexDirection};
        margin: 0 .4rem;
    }
`;

export default memo(Message);