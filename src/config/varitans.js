let onMobile = document.documentElement.offsetWidth < 600;

export const backgroundImageVariants = {
    hidden: { opacity: 0, scale: 1.08 },
    visible: {
        opacity: 1,
        y: 0,
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
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};

export const errorBoxVariants = {
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
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};

export const notificationContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const notificationVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
        },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

export const enterPageVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
            staggerChildren: 0.05,
            when: 'beforeChildren',
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.4,
            staggerChildren: 0.05,
            when: 'afterChildren',
        },
    },
};

export const boxVariants = {
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
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};

export const authVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
};

export const authItemVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        transition: {
            duration: 0.6,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export const loaderVariants = onMobile
    ? {
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
          exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
      }
    : {
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
          exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
      };

export const messengerVariants = onMobile
    ? {
          hidden: { opacity: 0 },
          visible: {
              opacity: 1,
              transition: {
                  duration: 0.4,
              },
          },
          exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
      }
    : {
          hidden: { opacity: 0 },
          visible: {
              opacity: 1,
              transition: {
                  duration: 0.4,
              },
          },
          exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
      };

export const groupChatVariants = onMobile
    ? {
          hidden: { opacity: 0 },
          visible: {
              opacity: 1,
              transition: { duration: 0.4 },
          },
          exit: { opacity: 0, transition: { duration: 0.4 } },
      }
    : {
          hidden: { opacity: 0 },
          visible: {
              opacity: 1,
              transition: {
                  duration: 0.4,
                  staggerChildren: 1,
                  when: 'beforeChildren',
              },
          },
          exit: {
              opacity: 0,
              transition: {
                  duration: 0.1,
                  staggerChildren: 0.02,
                  when: 'afterChildren',
              },
          },
      };

export const chatDateVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.4 },
    },
};

export const messageLocalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
};

export const messageNonLocalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
};

export const messageLoaderVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, type: 'tween' },
    },
    exit: {
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.4, type: 'tween' },
    },
};

export const optionsVariants = onMobile
    ? {
          hidden: { opacity: 0 },
          visible: {
              opacity: 1,
              transition: {
                  duration: 0.1,
                  staggerChildren: 0.05,
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
      }
    : {
          hidden: { opacity: 0 },
          visible: {
              opacity: 1,
              transition: {
                  duration: 0.1,
                  staggerChildren: 0.04,
                  when: 'beforeChildren',
              },
          },
          exit: {
              opacity: 0,
              transition: {
                  duration: 0.1,
                  staggerChildren: 0.02,
                  when: 'afterChildren',
              },
          },
      };

export const optionLocalVariants = onMobile
    ? {
          hidden: { opacity: 0, x: 80, y: 80, scale: 1.08 },
          visible: {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              transition: {
                  duration: 0.8,
                  ease: [0.53, 0, 0, 0.98],
                  time: [0.53, 0, 0, 0.98],
                  type: 'tween',
              },
          },
          exit: {
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.2, type: 'tween' },
          },
      }
    : {
          hidden: { opacity: 0, x: 20, scale: 0.8 },
          visible: {
              opacity: 1,
              x: [20, -20, 0],
              scale: 1,
              transition: { duration: 0.4, type: 'tween' },
          },
          exit: {
              opacity: 0,
              x: 150,
              transition: { duration: 0.4, type: 'tween' },
          },
      };

export const optionNonLocalVariants = onMobile
    ? {
          hidden: { opacity: 0, x: -80, y: 80, scale: 1.08 },
          visible: {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              transition: {
                  duration: 0.8,
                  ease: [0.53, 0, 0, 0.98],
                  time: [0.53, 0, 0, 0.98],
                  type: 'tween',
              },
          },
          exit: {
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.2, type: 'tween' },
          },
      }
    : {
          hidden: { opacity: 0, x: -20, scale: 0.8 },
          visible: {
              opacity: 1,
              x: [-20, 20, 0],
              scale: 1,
              transition: { duration: 0.4, type: 'tween' },
          },
          exit: {
              opacity: 0,
              x: -150,
              transition: { duration: 0.4, type: 'tween' },
          },
      };

export const timeVariants = onMobile
    ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.4 } },
          exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
          hidden: { opacity: 0, y: 20, scaleY: 0.8 },
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
      };

export const replyIconLocalVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.5 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, x: 50, scale: 0.5, transition: { duration: 0.3 } },
};

export const replyIconNonLocalVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.5 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, x: -50, scale: 0.5, transition: { duration: 0.3 } },
};

export const selectCheckVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, x: 40, transition: { duration: 0.2, type: 'tween' } },
};

export const messengerInputVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        transition: {
            delay: 0.4,
            duration: 0.8,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};

export const sendInputIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
};

export const replyVariants = {
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
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};

export const emojiPickerContainerVariatns = {
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
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};

export const menuVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        transition: {
            delay: 0.4,
            duration: 0.8,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};

export const menuIconVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, delay: 0.2 },
    },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
};

export const menuItemVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.8 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, x: 50, scale: 0.8, transition: { duration: 0.2 } },
};

export const popupPageVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            when: 'beforeChildren',
        },
    },
    exit: { opacity: 0, transition: { duration: 0.2, when: 'afterChildren' } },
};

export const popupContainerVariants = {
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
    exit: { opacity: 0, y: 20, transition: { duration: 0.4 } },
};

export const replyAddSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.4,
            duration: 0.4,
        },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export const replyButtonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, delay: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const selectBarVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        transition: {
            delay: 0.2,
            duration: 0.8,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};

export const checkButtonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: 20, scale: 0, transition: { duration: 0.2 } },
};

export const settingsPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2, when: 'afterChildren' } },
};

export const settingsContainerVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.9 },
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
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};

export const backgroundsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

export const notificationSettingsVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, y: 200, scale: 0.8, transition: { duration: 0.3 } },
};

export const userVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, y: 200, scale: 0.8, transition: { duration: 0.3 } },
};

export const trashVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
        },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
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
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        transition: {
            delay: 0.4,
            duration: 0.8,
            ease: [0.53, 0, 0, 0.98],
            time: [0.53, 0, 0, 0.98],
        },
    },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};
