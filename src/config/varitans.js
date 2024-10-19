let phone = document.documentElement.offsetWidth < 600;

export const errorBoxVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.2
        }
    },
};

// --------------------------------------

export const notificationSlowVariants = {
    hidden: {
        y: -80,
    },
    visible: {
        y: 0,
        transition: {
            duration: 1,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: {
        scale: 0,
        opacity: 0,
        transition: {
            duration: 1.5,
        },
    },
};

export const notificationFastVariants = {
    hidden: {
        y: -80
    },
    visible: {
        y: 0,
        transition: {
            duration: 1,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: {
        y: -80,
        transition: {
            duration: 1,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
};

// --------------------------------------

export const loginVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.2
        }
    },
};

export const loginItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.2, type: 'spring', stiffness: 100 },
    },
    exit: {
        opacity: 0,
        y: 30,
        transition: { duration: 0.3 },
    },
};

export const loginPasswordIconVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.2 },
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.2 },
    },
};

export const loginPasswordInputVariants = {
    hidden: {
        opacity: 0,
        x: -5,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.2 },
    },
    exit: {
        opacity: 0,
        x: 5,
        transition: { duration: 0.2 },
    },
};

// --------------------------------------

export const messengerVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.2
        }
    },
};

export const chatMessagesVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            when: 'beforeChildren'
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.2
        }
    },
};

export const messagesVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            when: 'beforeChildren'
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.2
        }
    },
};

export const messageUsernameVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

export const nonLocalMessageRepliedToVariants = {
    hidden: {
        opacity: 0,
        x: -10
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.8,
            type: 'spring',
            stiffness: 120,
        },
    },
};

export const localMessageRepliedToVariants = {
    hidden: {
        opacity: 0,
        x: 10
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.8,
            type: 'spring',
            stiffness: 120,
        },
    },
};

export const chatDateVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

export const localMessageVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        x: 120,
        transition: {
            duration: 0.3,
        },
    },
}

export const nonLocalMessageVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        x: -120,
        transition: {
            duration: 0.3,
        },
    },
}

export const messageLoaderVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.2, delay: 0.2 },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 },
    },
};

export const replyIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        transition: {
            duration: 0.3,
        },
    },
};

// --------------------------------------

export const optionsGlassVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            // delay: 0.05,
            duration: 0.2,
        },
    },
};

export const optionsVariants = {
    hidden: {
        opacity: 0,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.5,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
            when: 'beforeChildren'
        },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: {
            duration: 0.2,
            when: 'beforeChildren'
        },
    },
};

export const optionLocalVariants = {
    hidden: {
        opacity: 0,
        // x: 5,
    },
    visible: {
        opacity: 1,
        // x: 0,
        transition: {
            duration: 0.2,
        },
    },
    exit: {
        opacity: 0,
        // x: -5,
        transition: {
            duration: 0.2,
        },
    },
};

export const optionNonLocalVariants = {
    hidden: {
        opacity: 0,
        // x: 5,
    },
    visible: {
        opacity: 1,
        // x: 0,
        transition: {
            duration: 0.2,
        },
    },
    exit: {
        opacity: 0,
        // x: -5,
        transition: {
            duration: 0.2,
        },
    },
};

// --------------------------------------

export const popupPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2, when: 'afterChildren' } },
};

export const popupContainerVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.2
        }
    },
};

// --------------------------------------

export const settingsContainerVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.2
        }
    },
};

export const settingsItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4 },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.2 },
    },
};

export const notificationSettingsVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: {
        opacity: 0,
        transition: {
            delay: 0.2,
            duration: 0.4,
        },
    },
};

export const userSettingsVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.15,
        },
    },
};

// --------------------------------------

export const featuresPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.1, when: 'afterChildren' } },
};

export const featuresContainerVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.2
        }
    },
};

export const featuresIconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
        },
    },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

export const featuresListVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1,
            staggerChildren: 0.03,
            when: 'beforeChildren',
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.1,
            when: 'afterChildren',
        },
    },
};

export const featuresItemVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        transition: {
            duration: 0.8,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, y: 30, scaleY: 0.9, transition: { duration: 0.3 } },
};

export const featuresSectionUpVariatns = {
    hidden: { opacity: 0, y: -50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
        },
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
};

export const featuresSectionDownVariatns = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
        },
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
};

// --------------------------------------

export const selectBarVariants = {
    hidden: {
        y: 80
    },
    visible: {
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 80,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
        },
    },
};

export const chatInputVariants = {
    hidden: {
        y: 80
    },
    visible: {
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 80,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
        },
    },
};

export const inputButtonVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 40 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, scale: 0.8, x: 40, transition: { duration: 0.25 } },
};

export const inputReplyIndicator = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
    exit: {
        opacity: 0,
        y: 40,
        scaleY: 0,
        transition: {
            duration: 0.6,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
};

export const editReplyBarVariatns = {
    hidden: {
        y: 80
    },
    visible: {
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 80,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
        },
    },
};

// --------------------------------------

export const trashPageVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.2
        }
    },
};

export const trashSelectBarVariants = {
    hidden: {
        y: 80
    },
    visible: {
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 80,
        },
    },
    exit: {
        y: 80,
        transition: {
            duration: 0.6,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
};

export const trashSelectBarSwitchIconVariants = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: {
            duration: 0.3,
        },
    },
    exit: {
        scale: 0,
        transition: {
            duration: 0.3,
        },
    },
};

// --------------------------------------

export const checkVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.2 } },
};

export const dotsLoaderVariants = {
    hidden: {
        opacity: 0,
        scale: 1.1
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4
        }
    },
    exit: {
        opacity: 0,
        scale: 1.1,
        transition: {
            duration: 0.4
        }
    },
};

// --------------------------------------

export const scrollButtonVariants = {
    hidden: {
        opacity: 0,
        x: 20,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.6,
            duration: 0.2,
        },
    },
    exit: {
        opacity: 0,
        x: 20,
        transition: {
            duration: 0.2,
        }
    },
};

export const menuButtonVariants = {
    hidden: {
        opacity: 0,
        x: 20,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.5,
            duration: 0.2,
        },
    },
    exit: {
        opacity: 0,
        x: 20,
        transition: {
            delay: 0.2,
            duration: 0.2,
        }
    },
};

// --------------------------------------

export const chatLoaderVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.2
        }
    },
};

export const loaderVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.4
        }
    },
};