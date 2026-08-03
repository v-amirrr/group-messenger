let phone = document.documentElement.offsetWidth < 600;

export const pageVariants = {
    hidden: {
        opacity: 0,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
            when: 'beforeChildren'
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.2,
            when: 'beforeChildren'
        }
    },
};

// --------------------------------------

export const toastSlowVariants = {
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

export const toastFastVariants = {
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

export const authInputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, type: 'spring', stiffness: 80 },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.2 },
    },
};

export const authShowPasswordIconVariants = {
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

// --------------------------------------

export const messengerChatVariants = {
    hidden: {
        opacity: 0,
        // scale: 0.9
    },
    visible: {
        opacity: 1,
        // scale: 1,
        transition: {
            duration: 0.2,
            when: "beforeChildren"
        },
    },
    // exit: {
    //     opacity: 0,
    //     scale: 0.9,
    //     transition: {
    //         duration: 0.2
    //     }
    // },
};

export const chatMessagesVariants = {
    hidden: {
        opacity: 0,
        // scale: 0.9
    },
    visible: {
        opacity: 1,
        // scale: 1,
        transition: {
            // delay: 0.5,
            duration: 0.2,
            when: "beforeChildren"
        },
    },
    // exit: {
    //     opacity: 0,
    //     scale: 0.9,
    //     transition: {
    //         duration: 0.2
    //     }
    // },
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
            delay: 0.5,
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
            delay: 0.5,
            type: 'spring',
            stiffness: 120,
        },
    },
};

export const messageDateVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

export const localMessageVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        x: -20,
    },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            duration: 0.3,
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        x: 290,
        transition: {
            duration: 0.3,
        },
    },
}

export const nonLocalMessageVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        x: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            duration: 0.3,
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        x: -290,
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

export const messageEditReplyIndicatorVariants = {
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
            duration: 0.2,
        },
    },
};

export const optionsVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.05,
            duration: 0.3,
            when: 'beforeChildren'
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
            when: 'beforeChildren'
        },
    },
};

export const optionsLocalVariants = {
    hidden: {
        opacity: 0,
        x: 10,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 80,
        },
    },
    exit: {
        opacity: 0,
        x: -10,
        transition: {
            duration: 0.2,
        },
    },
};

export const optionsNonLocalVariants = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 80,
        },
    },
    exit: {
        opacity: 0,
        x: 10,
        transition: {
            duration: 0.2,
        },
    },
};

// --------------------------------------

export const modalPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2, when: 'afterChildren' } },
};

// --------------------------------------

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

export const inputBarVariants = {
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

export const inputBarButtonVariants = {
    hidden: { scale: 0, x: 40 },
    visible: { scale: 1, x: 0, transition: { duration: 0.25 } },
    exit: { scale: 0, x: 40, transition: { duration: 0.25 } },
};

export const inputBarReplyIndicator = {
    hidden: {
        opacity: 0,
        y: 20,
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
        opacity: [1, 1, 1, 1, 1, 1, 0.8, 0.5, 0.2, 0],
        y: 45,
        transition: {
            duration: 0.3,
        },
    },
};

export const inputBarEmojiPicker = {
    exit: {
        opacity: 0,
        transition: {
            duration: 0.4,
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