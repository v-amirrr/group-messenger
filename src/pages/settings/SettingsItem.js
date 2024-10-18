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
    position: relative;
    width: 72%;
    height: ${props => props.open ? `${props.height}rem` : props.hide ? "0" : "2.3rem"};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: var(--border);
    border-radius: ${props => props.open ? "20px" : "50px"};
    margin: .18rem;
    /* background-color: #ffffff05; */
    box-shadow: var(--shadow);
    opacity: ${props => props.hide ? '0' : '1'};
    overflow: hidden;
    transition: ${props => props.hide ?
            'opacity .2s' :
            'opacity .4s .1s'
        },
        ${props => props.open ?
            "height .6s, width .6s" :
            "height .3s, width .3s, border-radius 2s"
        };

    .item-header {
        position: absolute;
        top: 0;
        width: 100%;
        height: ${props => props.open ? "2.3rem" : "100%"};
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 .5rem 0 .6rem;
        cursor: pointer;
        transition: ${props => props.open ? "height .1s" : "height 1s"};

        .item-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            margin-right: .2rem;
        }

        .item-text {
            font-size: 1rem;
            font-weight: 600;
        }

        .item-arrow {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            position: absolute;
            right: .4rem;
            transform: ${props => props.open ? "rotate(90deg)" : ""};
            transition: transform .4s;
        }
    }

    .item-data {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    @media (max-width: 768px) {
        width: 60%;
        height: ${props => props.open ? `${props.height}rem` : props.hide ? "0" : "2.6rem"};
    }
`;

export default SettingsItem;