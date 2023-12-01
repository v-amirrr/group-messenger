import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { loaderVariants } from '../config/varitans';

const Loader = () => {
    return (
        <>
            <LoaderContainer initial='hidden' animate='visible' exit='exit' variants={loaderVariants}>
                <div className='profile'></div>
                <div className='menu'></div>
                <div className='scroll'></div>
                <div className='input'></div>
                <div className='messages'>
                    <div className='one'><span></span></div>
                    <div className='two'><span></span></div>
                    <div className='three'><span></span></div>
                    <div className='four'><span></span></div>
                    <div className='five'><span></span></div>
                    <div className='six'><span></span></div>
                    <div className='seven'><span></span></div>
                    <div className='eight'><span></span></div>
                    <div className='six'><span></span></div>
                    <div className='seven'><span></span></div>
                </div>
            </LoaderContainer>
        </>
    );
};

const LoaderContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding: 5rem 2rem 9rem 2rem;

    .profile, .menu, .scroll {
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        border: solid 2.5px #ffffff24;
        border-radius: 50px;
        background-color: #ffffff00;
        background-image: linear-gradient(90deg, #ffffff00 10%, #ffffff14 50%, #ffffff00 90%);
        background-position: left -2.5rem top 0;
        background-repeat: no-repeat;
        animation: skeleton-loading-button ease-out 1.5s infinite;
    }

    .profile {
        top: 1rem;
        left: 8.2rem;
    }

    .menu {
        top: 1rem;
        right: 8.2rem;
    }

    .scroll {
        bottom: 1.2rem;
        right: 8.2rem;
    }

    @keyframes skeleton-loading-button {
        to {
            background-position: left 2.5rem top 0;
        }
    }

    .input {
        position: absolute;
        bottom: 1rem;
        width: 20rem;
        height: 2.6rem;
        border: solid 2.5px #ffffff24;
        border-radius: 50px;
        background-color: #ffffff00;
        background-image: linear-gradient(90deg, #ffffff00 10%, #ffffff14 50%, #ffffff00 90%);
        background-position: left -20rem top 0;
        background-repeat: no-repeat;
        animation: skeleton-loading-input ease-out 1.5s infinite;
    }

    @keyframes skeleton-loading-input {
        to {
            background-position: left 20rem top 0;
        }
    }

    .messages {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .one {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: .1rem 0 0 0;

            span {
                position: relative;
                right: 9rem;
                width: 10rem;
                height: 2rem;
                border-radius: 25px 25px 25px 5px;
                /* background-color: #ffffff14; */
                border: solid 2.5px #ffffff24;
                background-image: linear-gradient(90deg, #ffffff00 0%, #ffffff24 50%, #ffffff00 100%);
                background-position: left -20rem top 0;
                background-repeat: no-repeat;
                animation: skeleton-loading-input ease-out 1.5s infinite;
            }
        }

        .two {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: .1rem 0 0 0;

            span {
                position: relative;
                right: 9rem;
                width: 12rem;
                height: 2rem;
                border-radius: 5px 25px 25px 5px;
                /* background-color: #ffffff14; */
                border: solid 2.5px #ffffff24;
                background-image: linear-gradient(90deg, #ffffff00 0%, #ffffff24 50%, #ffffff00 100%);
                background-position: left -20rem top 0;
                background-repeat: no-repeat;
                animation: skeleton-loading-input ease-out 1.5s infinite;
            }
        }

        .three {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: .1rem 0 0 0;


            span {
                position: relative;
                right: 9rem;
                width: 11rem;
                height: 2rem;
                border-radius: 5px 25px 25px 25px;
                /* background-color: #ffffff14; */
                border: solid 2.5px #ffffff24;
                background-image: linear-gradient(90deg, #ffffff00 0%, #ffffff24 50%, #ffffff00 100%);
                background-position: left -20rem top 0;
                background-repeat: no-repeat;
                animation: skeleton-loading-input ease-out 1.5s infinite;
            }
        }

        .four {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: .5rem 0 0 0;

            span {
                position: relative;
                right: 9rem;
                width: 7rem;
                height: 2rem;
                border-radius: 25px 25px 25px 5px;
                /* background-color: #ffffff14; */
                border: solid 2.5px #ffffff24;
                background-image: linear-gradient(90deg, #ffffff00 0%, #ffffff24 50%, #ffffff00 100%);
                background-position: left -20rem top 0;
                background-repeat: no-repeat;
                animation: skeleton-loading-input ease-out 1.5s infinite;
            }
        }

        .five {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: .1rem 0 0 0;

            span {
                position: relative;
                right: 9rem;
                width: 6rem;
                height: 2rem;
                border-radius: 5px 25px 25px 25px;
                /* background-color: #ffffff14; */
                border: solid 2.5px #ffffff24;
                background-image: linear-gradient(90deg, #ffffff00 0%, #ffffff24 50%, #ffffff00 100%);
                background-position: left -20rem top 0;
                background-repeat: no-repeat;
                animation: skeleton-loading-input ease-out 1.5s infinite;
            }
        }

        .six {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin: .5rem 0 0 0;

            span {
                position: relative;
                left: 9rem;
                width: 13rem;
                height: 2rem;
                border-radius: 25px 25px 5px 25px;
                /* background-color: #ffffff14; */
                border: solid 2.5px #ffffff24;
                background-image: linear-gradient(90deg, #ffffff00 0%, #ffffff24 50%, #ffffff00 100%);
                background-position: left -20rem top 0;
                background-repeat: no-repeat;
                animation: skeleton-loading-input ease-out 1.5s infinite;
            }
        }

        .seven {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin: .1rem 0 0 0;

            span {
                position: relative;
                left: 9rem;
                width: 10rem;
                height: 2rem;
                border-radius: 25px 5px 25px 25px;
                /* background-color: #ffffff14; */
                border: solid 2.5px #ffffff24;
                background-image: linear-gradient(90deg, #ffffff00 0%, #ffffff24 50%, #ffffff00 100%);
                background-position: left -20rem top 0;
                background-repeat: no-repeat;
                animation: skeleton-loading-input ease-out 1.5s infinite;
            }
        }

        .eight {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: .5rem 0 0 0;

            span {
                position: relative;
                right: 9rem;
                width: 13rem;
                height: 3rem;
                border-radius: 25px;
                /* background-color: #ffffff14; */
                border: solid 2.5px #ffffff24;
                background-image: linear-gradient(90deg, #ffffff00 0%, #ffffff24 50%, #ffffff00 100%);
                background-position: left -20rem top 0;
                background-repeat: no-repeat;
                animation: skeleton-loading-input ease-out 1.5s infinite;
            }
        }
    }

    @media (max-width: 768px) {
        width: 100vw;
        padding: 5rem 1rem 10rem 1rem;

        .profile {
            width: 3rem;
            height: 3rem;
            left: 0;
        }

        .menu {
            width: 3rem;
            height: 3rem;
            right: 0;
        }

        .scroll {
            width: 3rem;
            height: 3rem;
            right: 0;
            bottom: 1rem;
        }

        .input {
            width: 18rem;
            height: 3rem;
            margin-right: 4rem;
        }

        .messages {
            .one, .two, .three, .four, .five, .eight {
                span {
                    right: 4rem;
                }
            }

            .six, .seven {
                span {
                    left: 4rem;
                }
            }
        }
    }
`;

export default memo(Loader);