let onMobile = document.documentElement.offsetWidth < 600;

export const warningPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2, when: 'afterChildren' } },
};

export const warningContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export const errorBoxVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export const notificationSlowVariants = {
    hidden: { y: -80 },
    visible: {
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: {
        opacity: 0,
        scale: 0.2,
        y: 15,
        transition: {
            duration: 0.8,
        },
    },
};

export const notificationFastVariants = {
    hidden: { y: -80 },
    visible: {
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: {
        y: -80,
        transition: {
            duration: 0.7,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
};

export const loginVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
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

export const loaderVariants = {
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
            duration: 0.4,
        },
    },
};

export const messengerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export const chatDateVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
};

export const messageVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
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

export const optionsVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1,
            staggerChildren: 0.01,
            when: 'beforeChildren',
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.1,
        },
    },
};

export const optionLocalVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.2, type: 'spring', stiffness: 100 },
    },
    exit: {
        opacity: 0,
        x: 10,
        transition: { duration: 0.3 },
    },
};

export const optionNonLocalVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.2, type: 'spring', stiffness: 100 },
    },
    exit: {
        opacity: 0,
        x: -10,
        transition: { duration: 0.3 },
    },
};

export const timeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4 } },
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

export const selectCheckLocalVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, x: 50, transition: { duration: 0.2 } },
};

export const selectCheckNonLocalVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

export const menuVariants = {
    hidden: { opacity: 0, filter: 'blur(5px)' },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, filter: 'blur(5px)', transition: { duration: 0.4 } },
};

export const popupPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2, when: 'afterChildren' } },
};

export const popupContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export const replyAddSectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.25,
            duration: 0.4,
            when: 'beforeChildren',
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export const replyButtonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const checkButtonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.2 } },
};

export const settingsContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
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

export const scrollButtonVariants = {
    hidden: { opacity: 0, filter: 'blur(5px)' },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, filter: 'blur(5px)', transition: { duration: 0.4 } },
};

export const scrollButtonIconsVariants = {
    hidden: { opacity: 0, filter: 'blur(5px)' },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, filter: 'blur(5px)', transition: { duration: 0.4 } },
};

export const profileVariants = {
    hidden: { opacity: 0, filter: 'blur(5px)' },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, filter: 'blur(5px)', transition: { duration: 0.4 } },
};

export const featuresPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.1, when: 'afterChildren' } },
};

export const featuresContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
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

export const selectBarVariants = {
    hidden: { y: 80 },
    visible: {
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: {
        opacity: 0,
        scale: 0.2,
        y: -15,
        transition: {
            duration: 0.8,
        },
    },
};

export const inputBarVariants = {
    hidden: { y: 80 },
    visible: {
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: {
        opacity: 0,
        scale: 0.2,
        y: -15,
        transition: {
            duration: 0.8,
        },
    },
};

export const sendInputIconVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 40 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, scale: 0.8, x: 40, transition: { duration: 0.25 } },
};

export const inputBarReplyToVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            duration: 0.8,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: {
        opacity: 0,
        y: 70,
        transition: {
            duration: 0.6,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
};

export const inputBarEmojiPickerVariatns = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const trashPageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export const trashSelectBarVariants = {
    hidden: { y: 80 },
    visible: {
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: {
        y: 80,
        transition: {
            duration: 0.7,
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