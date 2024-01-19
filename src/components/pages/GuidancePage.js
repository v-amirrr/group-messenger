import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiHome } from "react-icons/hi";
import { BsGithub } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { TiArrowLeft } from "react-icons/ti";
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { featuresPageVariants, featuresContainerVariants, featuresIconVariants, featuresListVariants, featuresItemVariants, featuresSectionUpVariatns, featuresSectionDownVariatns } from '../../config/varitans';

const GuidancePage = () => {
    const featuresRef = useRef();
    const [content, setContent] = useState(localStorage.getItem("guidance") ? localStorage.getItem("guidance") : 1);
    const [down, setDown] = useState(true);
    const [onPhone, setOnPhone] = useState(document.documentElement.offsetWidth < 900);
    const [menu, setMenu] = useState(false);

    const changeSection = section => {
        if (section > content) {
            setDown(true);
        } else {
            setDown(false);
        }
        setTimeout(() => {
            setContent(section);
            setMenu(false);
            localStorage.setItem("guidance", section);
        }, 1);
    };

    return (
        <>
            <Guidance initial='hidden' animate='visible' exit='exit' variants={featuresPageVariants} content={content}>
                <motion.div className='container' variants={featuresContainerVariants}>
                    {
                        onPhone ?
                        <div className='menu-icon' onClick={() => setMenu(!menu)}>
                            <AnimatePresence>
                                {
                                    menu ?
                                    <motion.i key="back" className='back' initial='hidden' animate='visible' exit='exit' variants={featuresIconVariants}><TiArrowLeft /></motion.i> :
                                    <motion.i key="menu" className='menu' initial='hidden' animate='visible' exit='exit' variants={featuresIconVariants}><BiMenu /></motion.i>
                                }
                            </AnimatePresence>
                        </div>
                        : ""
                    }
                    <a href='https://github.com/v-amirrr' target='_blank' rel='noopener nereferrer'>
                        <i className='github'><BsGithub /></i>
                    </a>
                    <Link to={"/"} className='home'>
                        <i><TiArrowLeft /></i>
                        <p>Go Back Home</p>
                    </Link>
                    <AnimatePresence exitBeforeEnter>
                        {
                            !onPhone || menu ?
                            <motion.div key="list" className='list' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                <motion.ul className='items' initial='hidden' animate='visible' exit='exit' variants={featuresListVariants}>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(1)}>Sign Up</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(2)}>Login</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(3)}>Login via Google</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(4)}>Guest Mode</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(5)}>Logout</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(6)}>Reply</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(7)}>Select</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(8)}>Copy</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(9)}>Edit Text</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(10)}>Edit Reply</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(11)}>Delete and Move to Trash</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(12)}>Background Settings</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(13)}>Notification Settings</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(14)}>User Settings</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(15)}>Trash Settings</motion.li>
                                    <motion.li variants={featuresItemVariants} onClick={() => changeSection(16)}>Scroll Button</motion.li>
                                </motion.ul>
                            </motion.div>
                            : ""
                        }
                        {
                            !onPhone || !menu?
                            <>
                                <motion.div key="features" className='features' ref={featuresRef} initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                    <AnimatePresence exitBeforeEnter>
                                        {content == 1 ?
                                        <motion.div key={1} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Sign Up</h2>
                                            The first time you open this app, there are three options for you to enter the app.
                                            <br /><strong>Sign Up</strong>, <strong>Login</strong> and <strong>Guest Mode</strong>.
                                            {/* <img src={SectionPicture1} alt="section-image" /> */}
                                            <br /><br />In order to enter the app with full access you need to create an account. And to do that you'd have to click on the Sign Up box. Then you need to fill three inputs.
                                            {/* <img src={SectionPicture2} alt="section-image" /> */}
                                            <br /><br />First one is <strong>username</strong>. This could be whatever you want and you <strong>could change it</strong> later.
                                            <br />It's important to know that when you send a message your username is the only thing that will be shown in your message along with the text. Because of that <strong>everyone will see your username and know you by your username</strong>.
                                            <br /><br />The second input is <strong>email</strong>. Once you put the email there, we won't need it anymore, exept if you logout or wnat to login on another device or browser. But remember that you <strong>cannot change the email</strong> later on.
                                            <br /><br />The third and the last input is <strong>password</strong>. Everytime you want to login you will need it. You <strong>cannot change it</strong> later. By default when you type the password you won't be seeing the letters but if you click on the eye button on the right, you'll be able to see the letters.
                                            <br /><br /><span className='important'>
                                                After you clicked the OK button, first your account will be created in Firebase, second you'll be automatically logged in.
                                                <br />If you're on the same device and the same browser, once you're logged in <strong>you don't need to login again</strong>. Unless you hit the logout button or you delete you browsing data.
                                                <br />So if you close the tab or the browser, nothing will change, and you'll remain logged in.
                                            </span>
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)} disabled={content == 1}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled={content == 17}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 2 ?
                                        <motion.div key={2} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Login</h2>
                                            So as I said first time you open this app, there are three options for you to enter the app. <strong>Sign Up</strong>, <strong>Login</strong> and <strong>Guest Mode</strong>.
                                            {/* <img src={SectionPicture1} alt="section-image" /> */}
                                            <br /><br />If you've already created an account, and logged out or using a new device or deleted your browser cache, in order to enter the app you'd have to click on Login box. Then there are two inputs you need to fill.
                                            {/* <img src={SectionPicture3} alt="section-image" /> */}
                                            <br /><br />First one is <strong>email</strong>. This is the email that you put when you were creating your account.
                                            <br /><br />The second one is <strong>password</strong>. And again this is the same password you put when you created your account.
                                            <br /><br /><span className='important'>
                                                After you clicked the OK button, you'll be logged in.
                                                <br />If you're on the same device and the same browser, once you're logged in <strong>you don't need to login again</strong>. Unless you hit the logout button or you delete you browsing data.
                                                <br />So if you close the tab or the browser, nothing will change, and you'll remain logged in.
                                            </span>
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)} disabled={content == 1}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled={content == 17}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 3 ?
                                        <motion.div key={3} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Login via Google</h2>
                                            There's also another way for you to enter the app, and that is via Google.
                                            <br />You could easily login with Google without creating account and putting password.
                                            <br />In order to do that first you need to click on Login box.
                                            {/* <img src={SectionPicture1} alt="section-image" /> */}
                                            <br /><br />Then you will need to click on Google button.
                                            {/* <img src={SectionPicture3} alt="section-image" /> */}
                                            <br /><br />Then Google website will be shown to you on another window/tab. After that you need to either choose one of your Google account or if you haven't logged in on Google first you need to login.
                                            <br />Then you'll be automatically logged in without filling anything.
                                            <br />Your <strong>username</strong> will be your account's username.
                                            <br />And you son't be having a <strong>password</strong>.
                                            <br />If you ever need to login again, you'd have to go through the same process.
                                            <br /><br /><span className='important'>
                                                The account that you build with a certain email isn't the same account that you login with it via Google, even if their emails are the same.
                                                <br /><strong>So if you login with a Google email via Google, and you create a normal account with that exact email, those will be two different accounts.</strong>
                                                <br />If you've logged in via Google, you'll have to login with Google eveytime you need to login. You can't just put the email on login page and hit OK button. You have to click on Google button and through its process.
                                                <br /><br />If you're on the same device and the same browser, once you're logged in <strong>you don't need to login again</strong>. Unless you hit the logout button or you delete you browsing data.
                                                <br />So if you close the tab or the browser, nothing will change, and you'll remain logged in.
                                            </span>
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)} disabled={content == 1}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled={content == 17}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 4 ?
                                        <motion.div key={4} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Guest Mode</h2>
                                            There's also another way to enter the app and that is Guest Mode.
                                            <br />With guest mode you won't have to login or sign up in any way. You'll be entered as a guest and can only observe the messages.
                                            <br />In order to use this mode you have click on Guest Mode box.
                                            {/* <img src={SectionPicture1} alt="section-image" /> */}
                                            <br /><br />After that the chat page will be immediately shown to you.
                                            {/* <img src={SectionPicture4} alt="section-image" /> */}
                                            <br /><br /><span className='important'>
                                                Remember that in this mode you can <strong>only see the messages and change your background</strong>. All the <strong>other features will be disabled</strong> for you and in order to use them you need to first logout and then login with an account.
                                                <br />It's important to know that if you close the tab or window, everytime that you open the app you'll be automatically in guest mode.
                                            </span>
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)} disabled={content == 1}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled={content == 17}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 5 ?
                                        <motion.div key={5} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Logout</h2>
                                            If you're in guest mode and you want to login to use all the features, you need to first logout.
                                            <br />In order to do that you need to click on logout button in the menu.
                                            {/* <img src={SectionPicture5} alt="section-image" /> */}
                                            <br />To do that you have to open the menu. If you're <strong>not on a mobile device</strong> you just need to <strong>hover on the three dots icon</strong> on the top right of the chat page. And if you're on a <strong>mobile</strong> device you need to <strong>click on the three dots icon</strong> on the top right of the chat page.
                                            {/* <img src={SectionPicture6} alt="section-image" /> */}
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)} disabled={content == 1}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled={content == 17}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 6 ?
                                        <motion.div key={6} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Reply</h2>
                                            In order to reply a message, first you need to click on the message you want to reply to. And then message options will be opened. If the message you clicked on is one of your message, you'll be seeing 5 options and if it's somebody else's message, you'll be seeing 3 options. Either way when you're not on a mobile device you only see the icons and when you hover over the option the name of that option will be shown to you. And if you're on a mobile device then name is shown to you by default.
                                            <br />To reply to a message you have to click on the reply option which is the first button.
                                            {/* <img src={SectionPicture7} alt="section-image" /> */}
                                            <br />By clicking on the reply button, the message that you type and send will be a reply to the message which you clicked the reply button on. You can see that on top of messenger input in the bottom there's a reply section which shows the message you're replying. And also you can see a reply icon next to the message you clicked reply button on.
                                            {/* <img src={SectionPicture8} alt="section-image" /> */}
                                            <br />By hovering over on the reply icon next to the message, you'll see a close icon which by clicking on it you can remove the reply. You can also do this by clicking on the close button on the reply section on top of messenger input in bottom of the chat.
                                            {/* <img src={SectionPicture9} alt="section-image" /> */}
                                            <br /><br /><span className='important'>
                                                A faster way to reply a message is to <strong>double click</strong> on that message. This will work whether you're on a mobile device or you're not.
                                                <br /><br />Another important thing to notice is if you've clicked a message's reply button and then click on another message's reply button, the last reply would be removed and replaced with the new one.
                                            </span>
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)} disabled={content == 1}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled={content == 17}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 7 ?
                                        <motion.div key={7} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Select</h2>
                                            In order to select messages, first you need to click on the message you want to select. And then message options will be opened. If the message you clicked on is one of your message, you'll be seeing 5 options and if it's somebody else's message, you'll be seeing 3 options.
                                            <br />Either way when you're not on a mobile device you only see the icons and when you hover over the option the name of that option will be shown to you. And if you're on a mobile device then the name is shown to you by default.
                                            <br /><br />To select a message you have to click on the select option which is the second button.
                                            <br />By clicking on the select button, first the message will be selected, second the menu and input will be disappeared and third the select box will be shown to you at the bottom of the chat page.
                                            <br /><br />In the select box there's a counter, two buttons, and a close button.
                                            <br />The counter shows how many messages have you selected.
                                            <br />Aftef that you have a copy button and a delete button. With them you can either copy a bunch of messages at the same time or you can delete them all in once.
                                            <br />If you select a message which isn't yours, the delete button will be disabled because you cannot delete somebody else's messages.
                                            <br />And at the end, the close button will unselect all the selected messages, therefore the select box will disappear and input and menu will be shown again.
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)} disabled={content == 1}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled={content == 17}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 8 ?
                                        <motion.div key={8} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Copy</h2>
                                            In order to copy a message, first you need to click on the message you want to copy. And then message options will be opened. If the message you clicked on is one of your message, you'll be seeing 5 options and if it's somebody else's message, you'll be seeing 3 options.
                                            <br />Either way when you're not on a mobile device you only see the icons and when you hover over the option the name of that option will be shown to you. And if you're on a mobile device then the name is shown to you by default.
                                            <br /><br />To copy a message text you need to click on the copy option which is the third option.
                                            <br /><br />After that you should see a notification which says that the message was copied.
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)} disabled={content == 1}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled={content == 17}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 9 ?
                                        <motion.div key={9} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Edit Text</h2>
                                            In order to edit a message text, first you need to click on the message you want to edit. And then message options will be opened. If the message you clicked on is one of your message, you'll be seeing 5 options and if it's somebody else's message, you'll be seeing 3 options.
                                            <br />Either way when you're not on a mobile device you only see the icons and when you hover over the option the name of that option will be shown to you. And if you're on a mobile device then the name is shown to you by default.
                                            <br /><br />To edit a message text you need to click on the edit option which is the foruth option. Remember that you can only edit your own messages, therefore this option won't be shown if you click on someone else's message.
                                            <br /><br />After that you'll see popup showing up. In popup you can see the message text and you're allowed to change it.
                                            <br />When you're finished in order to save the changes you need to click on the edit button, or if you don't want to change the message text you could easily hit the cancel button and nothing will change.
                                            <br />If you click on any part of the page exept the popup, the popup will be closed and the changes won't be saved.
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)} disabled={content == 1}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled={content == 17}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 10 ?
                                        <motion.div key={10} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Edit Reply</h2>
                                            In order to edit a message reply or make a message a reply to another message, first you need to click on the message you want to edit. And then message options will be opened. If the message you clicked on is one of your message, you'll be seeing 5 options and if it's somebody else's message, you'll be seeing 3 options.
                                            <br />Either way when you're not on a mobile device you only see the icons and when you hover over the option the name of that option will be shown to you. And if you're on a mobile device then the name is shown to you by default.
                                            <br /><br />To edit a message reply you need to click on the edit option which is the foruth option. Remember that you can only edit your own messages reply, therefore this option won't be shown if you click on someone else's message.
                                            <br /><br />After that you'll see popup showing up. In popup you have to click on reply button to change or add the reply. If your message already is a reply, in reply button you see the message's text, if your message isn't a reply in reply button you see 'Add Reply'.
                                            <br />When you clicked on reply button you see the reply section gets opened. In reply section you see the message available for your message to be their reply which the messages that were sent before your message. Also you see two buttons, 'Cancel' and 'Edit Reply'. If you hit cancel the reply section will be closed and nothing will change and if you hit edit reply provided you changed the reply, the reply will change and the section gets closed.
                                            <br />In order to make you message a reply to a cetain message, you need to just click on the message you want. Then you see the reply icon next to that message and by hovering on the icon you see the close icon which by clicking on it you remove the reply.
                                            <br />If you click on any part of the page exept the popup, the popup will be closed and the changes won't be saved.
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)} disabled={content == 1}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled={content == 17}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 11 ?
                                        <motion.div key={11} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Delete and Move to Trash</h2>
                                            In order to delete a message (move to trash), first you need to click on the message you want to delete. And then message options will be opened. If the message you clicked on is one of your message, you'll be seeing 5 options and if it's somebody else's message, you'll be seeing 3 options.
                                            <br />Either way when you're not on a mobile device you only see the icons and when you hover over the option the name of that option will be shown to you. And if you're on a mobile device then the name is shown to you by default.
                                            <br /><br />To delete a message you need to click on the delete option which is the fifth option. Remember that you can only delete your own messages, therefore this option won't be shown if you click on someone else's message.
                                            <br />After that the message will disappear of the chat.
                                            <br /><br /><span className='important'>
                                                You can find the message in settings page trash section. In there you can either delete the message forever or restore it.
                                            </span>
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)} disabled={content == 1}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled={content == 17}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 12 ?
                                        <motion.div key={12} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Background Settings</h2>
                                            If you want to change your background, you need to go to the settings page.
                                            <br />In order to do that you need to click on settings button in the menu.
                                            <br />To do that you have to open the menu. If you're <strong>not on a mobile device</strong> you just need to <strong>hover on the three dots icon</strong> on the top right of the chat page. And if you're on a <strong>mobile</strong> device you need to <strong>click on the three dots icon</strong> on the top right of the chat page.
                                            <br /> After that you'll be transformed in settings page. In settings page there are four sections. To change the background you have to click on the first one which is named backgrounds.
                                            <br />Then the section gets opened and you see three images. The first image is the default selected background. To change that you just need to click on another image, then that image will be your background.
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)} disabled={content == 1}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled={content == 17}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 13 ?
                                        <motion.div key={13} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Notification Settings</h2>
                                            If you want to change your notification settings, you need to go to the settings page.
                                            <br />In order to do that you need to click on settings button in the menu.
                                            <br />To do that you have to open the menu. If you're <strong>not on a mobile device</strong> you just need to <strong>hover on the three dots icon</strong> on the top right of the chat page. And if you're on a <strong>mobile</strong> device you need to <strong>click on the three dots icon</strong> on the top right of the chat page.
                                            <br />After that you'll be transformed in settings page. In settings page there are four sections. To change the notification settings you have to click on the second one which is named notification.
                                            <br />Then the section gets opened and you see 8 toggles. You can turn them on or off.
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)} disabled={content == 1}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled={content == 17}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 14 ?
                                        <motion.div key={14} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>User Settings</h2>
                                            If you want to change your user settings, you need to go to the settings page.
                                            <br />In order to do that you need to click on settings button in the menu.
                                            <br />To do that you have to open the menu. If you're <strong>not on a mobile device</strong> you just need to <strong>hover on the three dots icon</strong> on the top right of the chat page. And if you're on a <strong>mobile</strong> device you need to <strong>click on the three dots icon</strong> on the top right of the chat page.
                                            <br /> After that you'll be transformed in settings page. In settings page there are four sections. To change the user settings you have to click on the third one which is named user.
                                            <br />Then the section gets opened and you see the username section which in it you can change your username and then hit the green check icon to savwe the new username.
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 15 ?
                                        <motion.div key={15} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Trash Settings</h2>
                                            If you want to change your notification settings, you need to go to the settings page.
                                            <br />In order to do that you need to click on settings button in the menu.
                                            <br />To do that you have to open the menu. If you're <strong>not on a mobile device</strong> you just need to <strong>hover on the three dots icon</strong> on the top right of the chat page. And if you're on a <strong>mobile</strong> device you need to <strong>click on the three dots icon</strong> on the top right of the chat page.
                                            <br /> After that you'll be transformed in settings page. In settings page there are four sections. To change the background you have to click on the first one which is named backgrounds.
                                            <br />Then the section gets opened. If you've ever deleted a message you see a select bar and the messages that you've deleted previously.
                                            <br />You can select the messages that you want and either restore them or delete them for good. There's also a counter and the select all button in select bar.
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)}>Next</button>
                                            </div>
                                        </motion.div>
                                        : content == 16 ?
                                        <motion.div key={16} className='section' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                            <h2>Scroll Button</h2>
                                            There a button with a arrow icon in it at the bottom left of the chat page. With this button you can scroll to the first or last message of the chat.
                                            <br /><br />If your at the top of the chat and you click on the button you'll be scrolled down to the last message.
                                            <br />If your at the bottom of the chat and you click on the button you'll be scrolled up to the first message.
                                            <br /><br />Also if you're scrolling to the top and click on the button you'll be scrolled up to the first message.
                                            <br />But if you're scrolling to the bottom and click on the button you'll be scrolled down to the last message.
                                            <div className='section-buttons'>
                                                <button className='previous' onClick={() => changeSection(content-1)}>Previous</button>
                                                <button className='next' onClick={() => changeSection(content+1)} disabled>Next</button>
                                            </div>
                                        </motion.div>
                                        : ""}
                                    </AnimatePresence>
                                </motion.div>
                                <motion.div key="features" className='counter' initial='hidden' animate='visible' exit='exit' variants={down ? featuresSectionDownVariatns : featuresSectionUpVariatns}>
                                    <div className='colored-dot'></div>
                                    <div className='dot' onClick={() => changeSection(1)}></div>
                                    <div className='dot' onClick={() => changeSection(2)}></div>
                                    <div className='dot' onClick={() => changeSection(3)}></div>
                                    <div className='dot' onClick={() => changeSection(4)}></div>
                                    <div className='dot' onClick={() => changeSection(5)}></div>
                                    <div className='dot' onClick={() => changeSection(6)}></div>
                                    <div className='dot' onClick={() => changeSection(7)}></div>
                                    <div className='dot' onClick={() => changeSection(8)}></div>
                                    <div className='dot' onClick={() => changeSection(9)}></div>
                                    <div className='dot' onClick={() => changeSection(10)}></div>
                                    <div className='dot' onClick={() => changeSection(11)}></div>
                                    <div className='dot' onClick={() => changeSection(12)}></div>
                                    <div className='dot' onClick={() => changeSection(13)}></div>
                                    <div className='dot' onClick={() => changeSection(14)}></div>
                                    <div className='dot' onClick={() => changeSection(15)}></div>
                                </motion.div>
                            </>
                            : ""
                        }
                    </AnimatePresence>
                </motion.div>
            </Guidance>
        </>
    );
};

const Guidance = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
        width: 65%;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: solid 2.5px #ffffff20;
        border-radius: 25px;
        background-color: #000000aa;
        overflow: hidden;
        position: relative;
        color: var(--normal-color);

        .menu-icon {
            cursor: pointer;
            position: absolute;
            top: 1rem;
            left: 1rem;
            display: none;
            backdrop-filter: var(--normal-glass);
            -webkit-backdrop-filter: var(--normal-glass);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.4rem;
            background-color: #ffffff10;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            z-index: 99;
            box-shadow: var(--normal-shadow);

            i {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .back {
                font-size: 2rem;
            }
        }

        .github {
            position: absolute;
            top: 1rem;
            right: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-size: 1.2rem;
            z-index: 10;
        }

        .home {
            position: absolute;
            top: 1rem;
            left: 1rem;
            padding: 0 .5rem 0 .2rem;
            backdrop-filter: var(--normal-glass);
            -webkit-backdrop-filter: var(--normal-glass);
            box-shadow: var(--normal-shadow);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            background-color: #ffffff10;
            border-radius: 25px;
            font-size: 1.2rem;
            z-index: 10;
            transition: background .2s;

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
            }

            p {
                font-size: .6rem;
            }

            &:hover {
                background-color: #ffffff20;
            }
        }

        .list {
            width: 25%;
            height: 100%;
            position: relative;
            border-right: solid 1.5px #ffffff14;

            ul {
                padding: 3.2rem 0 2rem 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-direction: column;
                overflow-y: scroll;

                ::-webkit-scrollbar {
                    width: 0;
                }

                li {
                    background-color: #ffffff08;
                    font-weight: 400;
                    border-radius: 50px;
                    width: 90%;
                    min-height: 1.8rem;
                    margin: .15rem 0;
                    padding: 0 .5rem 0 .8rem;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: .7rem;
                    cursor: pointer;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    letter-spacing: 0;
                    box-shadow: var(--normal-shadow);
                    transition: color .2s;

                    &:nth-child(1) {
                        color: ${props => props.content == 1 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(2) {
                        color: ${props => props.content == 2 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(3) {
                        color: ${props => props.content == 3 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(4) {
                        color: ${props => props.content == 4 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(5) {
                        color: ${props => props.content == 5 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(6) {
                        color: ${props => props.content == 6 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(7) {
                        color: ${props => props.content == 7 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(8) {
                        color: ${props => props.content == 8 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(9) {
                        color: ${props => props.content == 9 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(10) {
                        color: ${props => props.content == 10 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(11) {
                        color: ${props => props.content == 11 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(12) {
                        color: ${props => props.content == 12 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(13) {
                        color: ${props => props.content == 13 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(14) {
                        color: ${props => props.content == 14 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(15) {
                        color: ${props => props.content == 15 ? "var(--normal-color)" : "var(--pale-color)"};
                    }

                    &:nth-child(16) {
                        color: ${props => props.content == 16 ? "var(--normal-color)" : "var(--pale-color)"};
                    }
                }

            }
        }

        .features {
            width: 75%;
            height: 100%;
            position: relative;

            .section {
                width: 100%;
                height: 100%;
                padding: 3rem 3rem 3rem 3rem;
                overflow: hidden scroll;
                font-weight: 400;
                font-size: .8rem;
                line-height: 1.5;
                color: var(--pale-color);
                word-spacing: 1px;

                ::-webkit-scrollbar {
                    width: 0;
                }

                .section-buttons {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem 0;

                    button {
                        border-radius: 50px;
                        margin: 0 .2rem;
                        cursor: pointer;
                        font-size: .9rem;
                        background-color: #ffffff08;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 5.5rem;
                        height: 2.2rem;
                        transition: background .2s;

                        &:not(:disabled):hover {
                            background-color: #ffffff15;
                        }
                    }
                }

                h2 {
                    white-space: nowrap;
                    width: 100%;
                    margin: 2rem 0;
                    color: var(--normal-color);
                    font-size: 2rem;
                }

                strong {
                    color: var(--normal-color);
                    font-weight: 300;
                }

                .important {
                    border: solid 1.5px #ffffff14;
                    border-radius: 20px;
                    background-color: #ffffff04;
                    box-shadow: var(--shadow-second);
                    width: 100%;
                    display: block;
                    padding: 1.5rem;
                }
            }
        }

        .counter {
            position: absolute;
            right: 1rem;
            bottom: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            z-index: 10;

            .colored-dot {
                width: .3rem;
                height: .3rem;
                background-color: #fff;
                border-radius: 50%;
                margin: .1rem 0;
                position: absolute;
                top: ${props =>
                    props.content == 1 ? "0" :
                    props.content == 2 ? ".5rem" :
                    props.content == 3 ? "1rem" :
                    props.content == 4 ? "1.5rem" :
                    props.content == 5 ? "2rem" :
                    props.content == 6 ? "2.5rem" :
                    props.content == 7 ? "3rem" :
                    props.content == 8 ? "3.5rem" :
                    props.content == 9 ? "4rem" :
                    props.content == 10 ? "4.5rem" :
                    props.content == 11 ? "5rem" :
                    props.content == 12 ? "5.5rem" :
                    props.content == 13 ? "6rem" :
                    props.content == 14 ? "6.5rem" :
                    props.content == 15 ? "7rem" :
                    props.content == 16 ? "7.5rem" : "0"
                };
                transition: top .8s cubic-bezier(.53,0,0,.98);
            }

            .dot {
                width: .3rem;
                height: .3rem;
                background-color: #ffffff20;
                border-radius: 50%;
                margin: .1rem 0;
                transition: background .2s;

                &:hover {
                    background-color: #ffffff80;
                }
            }
        }
    }

    @media (max-width: 1400px) {
        .container {
            width: 80%;
        }
    }

    @media (max-width: 1100px) {
        .container {
            width: 95%;

            .home {
                top: 1.5rem;
                left: 4rem;
            }

            .list {
                width: 50%;
                border: none;

                header {
                    display: none;
                }
            }

            .features {
                width: 100%;
            }
        }
    }
`;

export default GuidancePage;