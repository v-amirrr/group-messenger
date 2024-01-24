let onMobile = document.documentElement.offsetWidth < 600;

export const backgroundImageVariants = {
    hidden: { opacity: 0, scale: 1.08 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, scale: 1.08, transition: { duration: 0.3 } },
};

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
            duration: 0.6,
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
            duration: 0.8,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: {
        opacity: [1, 1, 1, 0],
        scale: 0.8,
        transition: {
            duration: 0.5,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
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
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: 0.2,
        },
    },
};

export const boxVariants = {
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

export const loginVariants = {
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

export const messengerVariants = onMobile
    ? {
          hidden: { opacity: 0 },
          visible: {
              opacity: 1,
              transition: {
                  duration: 0.2,
                  when: 'beforeChildren',
              },
          },
          exit: {
              opacity: 0,
              transition: { duration: 0.2, when: 'afterChildren' },
          },
      }
    : {
          hidden: { opacity: 0 },
          visible: {
              opacity: 1,
              transition: {
                  duration: 0.4,
                  when: 'beforeChildren',
              },
          },
          exit: {
              opacity: 0,
              scale: 0.9,
              transition: {
                  duration: 0.2,
              },
          },
      };

export const groupChatVariants = onMobile
    ? {
          hidden: { opacity: 0 },
          visible: {
              opacity: 1,
              transition: {
                  delay: 1,
                  duration: 0.2,
              },
          },
          exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
          hidden: { opacity: 0 },
          visible: {
              opacity: 1,
              transition: {
                  duration: 0.4,
                  when: 'beforeChildren',
              },
          },
          exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
      };

export const chatDateVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
};

export const messageVariants = onMobile
    ? {
          hidden: { opacity: 0 },
          visible: {
              opacity: 1,
              transition: {
                  duration: 0.4,
              },
          },
          exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4 } },
      }
    : {
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
              scale: 0.5,
              x: 120,
              transition: {
                  duration: 0.5,
                  ease: [0.53, 0, 0, 0.98],
                  time: [0.53, 0, 0, 0.98],
              },
          },
      };

export const messageLoaderVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.2 },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 },
    },
};

export const optionsVariants = onMobile
    ? {
          hidden: { opacity: 0, scale: 0.9, y: 30 },
          visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                  duration: 0.2,
                  staggerChildren: 0.02,
                  type: 'spring',
                  stiffness: 100,
              },
          },
          exit: {
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.2, when: 'beforeChildren' },
          },
      }
    : {
          hidden: { opacity: 0 },
          visible: {
              opacity: 1,
              transition: {
                  duration: 0.1,
                  staggerChildren: 0.008,
                  when: 'beforeChildren',
              },
          },
          exit: {
              opacity: 0,
              transition: {
                  duration: 0.1,
                  staggerChildren: 0.008,
                  when: 'afterChildren',
              },
          },
      };

export const optionLocalVariants = onMobile
    ? {
          hidden: { opacity: 0, y: 20 },
          visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.3 },
          },
          exit: {
              opacity: 0,
              y: 10,
              transition: { duration: 0.2, type: 'tween' },
          },
      }
    : {
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

export const optionNonLocalVariants = onMobile
    ? {
          hidden: { opacity: 0, y: 20 },
          visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.3 },
          },
          exit: {
              opacity: 0,
              y: 10,
              transition: { duration: 0.2, type: 'tween' },
          },
      }
    : {
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
    exit: { opacity: 0, x: 50, transition: { duration: 0.25 } },
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
    exit: { opacity: 0, x: -50, transition: { duration: 0.25 } },
};

export const InputVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

export const sendInputIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
};

export const replyVariants = {
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
        y: 50,
        transition: {
            duration: 0.8,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
};

export const emojiPickerVariatns = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
        },
    },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

export const menuVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
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
            duration: 0.6,
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

export const selectBarVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

export const checkButtonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.2 } },
};

export const settingsPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.1, when: 'afterChildren' } },
};

export const settingsContainerVariants = {
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

export const backgroundsSettingsVariants = {
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
            delay: 0.2,
            duration: 0.4,
        },
    },
};

export const trashSettingsVariants = {
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

export const trashSelectbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
        },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export const scrollButtonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

export const scrollButtonIconsVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
};

export const profileVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
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
