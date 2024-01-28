import React from 'react';
import styled from 'styled-components';

const SettingsItem = ({ open, hide, component, height }) => {
    return (
        <>
            <SettingsItemContainer
                open={open}
                hide={hide}
                height={height ? height : 0}
            >
                {component}
            </SettingsItemContainer>
        </>
    );
};

const SettingsItemContainer = styled.div`
    width: 72%;
    height: ${props => props.open ? `${props.height}rem` : props.hide ? "0" : "2.2rem"};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: solid 2.5px #ffffff20;
    border-radius: ${props => props.open ? "20px" : "50px"};
    overflow: hidden;
    position: relative;
    margin: .15rem;
    background-color: #00000066;
    box-shadow: var(--normal-shadow);
    opacity: ${props => props.hide ? '0' : '1'};
    transition: ${props => props.hide ?
            'opacity .2s' :
            'opacity .4s .1s'
        },
        ${props => props.open ?
            "height .6s" :
            "height .4s, border-radius 2s"
        };

    .item-header {
        position: absolute;
        top: ${props => props.open ? ".5rem" : "23%"};
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 .5rem .4rem .8rem;
        cursor: pointer;
        transition: ${props => props.open ? "top .1s" : "top .4s .6s"}, border-bottom .4s;

        .item-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            margin-right: .5rem;
        }

        h4 {
            font-size: .9rem;
            font-weight: 600;
        }

        .item-back {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            position: absolute;
            right: .4rem;
            transform: ${props => props.open ? "rotate(90deg)" : ""};
            transition: transform .4s;
        }

        .deleted-messages-counter {
            margin: 0 .3rem;
            font-size: .6rem;
            font-weight: 600;
            width: 1rem;
            height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            background-color: #ff0000aa;
        }
    }

    .item-data {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
`;

export default SettingsItem;