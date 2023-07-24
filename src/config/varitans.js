export const backgroundImageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, transition: { duration: 0.4, type: 'tween' } }
};

export const warningModalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, when: "beforeChildren", staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.2, when: "afterChildren" } }
};

export const warningModalItemsVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

export const errorBoxVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

export const loaderVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};




export const notificationVariants = {
    hidden: { opacity: 0, y: -50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.2 } }
};

export const enterPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.05, when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.4, staggerChildren: 0.05, when: "afterChildren" } }
};

export const boxVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

export const loginVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, when: "beforeChildren", staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.4, when: "afterChildren", staggerChildren: 0.05 } }
};

export const loginItemVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

export const signupVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, when: "beforeChildren", staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.4, when: "afterChildren", staggerChildren: 0.05 } }
};

export const signupItemVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};





export const messengerVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

export const groupChatVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
};

export const chatDateVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

export const messageLoaderVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4, type: 'tween' } }
};

export const menuMobileUserVariants = {
    hidden: { opacity: 0, y: 30, scaleY: 0.9 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.3 } }
};

export const menuMobileGuestVariants = {
    hidden: { opacity: 0, y: 30, scaleY: 0.9 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.3 } }
};

export const menuMobileVariants = {
    hidden: { opacity: 0, y: 30, scaleY: 0.9 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.3 } }
};

export const menuMobileItemVariants = {
    // hidden: { scale: 0 },
    // visible: { scale: 1, transition: { duration: 0.6, type: 'tween' } },
    // exit: { opacity: 0, transition: { duration: 0.6, type: 'tween' } }
};

export const menuDesktopVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1, staggerChildren: 0.04, when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.1, staggerChildren: 0.02, when: "afterChildren" } }
};

export const menuItemUserDesktopVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.8 },
    visible: { opacity: 1, x: [20, -20, 0], scale: 1, transition: { duration: 0.45, type: 'tween' } },
    exit: { opacity: 0, x: 80, transition: { duration: 0.35, type: 'tween' } },
};

export const menuItemDesktopVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: { opacity: 1, x: [-20, 20, 0], scale: 1, transition: { duration: 0.45, type: 'tween' } },
    exit: { opacity: 0, x: -80, transition: { duration: 0.35, type: 'tween' } }
};

export const timeVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
};

export const selectCheckVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, x: 40, transition: { duration: 0.2, type: 'tween' } }
};





export const messengerInputVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

export const sendInputIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } }
};

export const replyVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

export const emojiPickerContainerVariatns = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};





export const menuVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

export const backIconVariants = {
    hidden: { opacity: 0, scale: 0.5, x: 50 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.5, x: 50, transition: { duration: 0.4 } }
};

export const menuIconVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, delay: 0.5 } },
    exit: { opacity: 0, x: 60, scale: 0, transition: { duration: 0.4 } }
};

export const menuListVariants = {
    hidden: { opacity: 0, scale: 0.5, x: 50 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scale: 0.5, x: 50, transition: { duration: 0.4, type: 'tween' } }
};





export const popupPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.2, when: "afterChildren" } }
};

export const popupPageContainer = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.6, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

export const replyAddSectionVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.2, delay: 0.2 } }
};

export const replyButtonVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.5 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.01 } }
};





export const selectBarVariants = {
    hidden: { opacity: 0, y: -30, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
};

export const checkButtonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: 20, scale: 0, transition: { duration: 0.2 } }
};





export const settingsPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.4, when: "afterChildren" } }
};

export const settingsContainerVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

export const backgroundsVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.5 } },
    exit: { opacity: 0, scaleY: 0, transition: { duration: 0.6, when: "beforeChildren" } }
};

export const backgroundVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4 } }
};

export const trashVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, scaleY: 0, transition: { duration: 0.6 } }
};

export const userVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, scaleY: 0, transition: { duration: 0.6 } }
};

export const notificationSettingsVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 100, scaleY: 0.8, transition: { duration: 0.4 } }
};