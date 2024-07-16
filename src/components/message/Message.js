import React, { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMessage } from '../../hooks/useMessage';
import MessageBox from './MessageBox';
import MessageDate from './MessageDate';
import MessageSelectCheck from './MessageSelectCheck';
import MessageUsername from './MessageUsername';
import MessageLoader from './MessageLoader';
import MessageReplyIcon from './MessageReplyIcon';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { messageVariants } from '../../config/varitans';

const Message = ({ messageData, type }) => {

    const messageRef = useRef();
    const { selectedMessages } = useSelector(store => store.selectStore);
    const { editReply } = useSelector(store => store.appStore);

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

    const showMessageDate = () => previousMessageDifferentDate && time?.year;

    const showMessageUsername = () => !isLocalMessage && messagePosition < 2;

    const showMessageSelectCheck = () => selectedMessages?.length ? true : false;

    const showReplyIcon = () => editReply?.replyId == id;

    const {
        messagePosition,
        messageClickHandler,
        selected,
        messageSkeletonEffect,
        status,
        styles
    } = useMessage(messageData, type, messageRef);

    return (
        <>
            <MessageContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={messageVariants}
                layout
                layoutId={id}
                ref={messageRef}
                styles={{ ...styles }}
            >
                {showMessageDate() && <MessageDate layout layoutId={id} data={time} />}
                {showMessageUsername() && <MessageUsername uid={uid} isUserSelecting={selectedMessages?.length} showMessageDate={showMessageDate()} />}
                <AnimatePresence>
                    {showMessageSelectCheck() && <MessageSelectCheck selected={selected} messageClickHandler={messageClickHandler} isLocalMessage={isLocalMessage} />}
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
                        persian: isTextPersian ? 1 : 0,
                        skeletonEffect: messageSkeletonEffect ? 1 : 0,
                    }}
                />
                <AnimatePresence>
                    {showReplyIcon() ? <MessageReplyIcon key='MessageReplyIcon' /> : ''}
                </AnimatePresence>
                <MessageLoader status={status} />
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
    transition: padding .4s;
`;

export default memo(Message);