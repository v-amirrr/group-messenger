# Group Messenger

In this project you can login with email or with Google. You can send message, delete or edit them later.
<br />
<a href="https://group-messenger.vercel.app">Check it out :)<a/>
<br />
<br />
<br />
<br />


## Features

- Create an account, Login with it in other devices, Logout whenever you want.
- Login directly with Google.
- Login as a guest to just read the messages without anything.
- Send message, read other's messages realtime.
- Delete any of your messages.
- Edit any of your messages.
- Reply to someone's message.
- Edit or add reply after you sent your message.
- Include emojis in your message text.
- Copy anyone's message text.
- Change background and theme.
<br />
<br />
<br />
<br />


## How To Use It

First you have to choose a way to login. You can login with by creating an account with an email or login directly with Google account. You also just can login as a guest. 
In Guest mode login you won't be able to send any message but you can logout and login with an account later.
<br />
<br />
After you logged in you easily send any message you want. To see message options you ust need to click on a message. Based on the message you'll see a bunch of options. If it's one of your messages you'll see reply, copy, edit and delete icon. If it's someone else's message you'll only see reply and copy icon and if you're in guest mode you'll just see copy icon.
<br />
<br />
When you click on the delete icon, you see a popup which want you to confirm that you want to delete the message.
When you click on the edit icon, you see another popup which in that popup there's textarea where you can edit you message text. In popup there's also a reply icon where you can edit the replies.
<br />
When you click on the edit reply icon, you'll the all the messages that were sent before the message you're editing. You can choose one of those messages for your message to be its reply.
<br />
<br />
<br />
<br />


## How It Works

<strong>Custom Hooks</strong>
<br />
This app has 7 custom hooks. One is for getting messages named useGetMessage, another one is for login, signup, logout, login as a guest and login with Google named useAuth, another one is for messages options like delete and edit named useMessageOptions, another one is for sending messages named useSendMessage, and another one is for showing the warning page named useWarningPage, and another one is for rediction when user go to url where they're not sppusoed to be like going to the login page when you're already logged in named useRediction, and the last one if for change the theme and the background named useChangeTheme.
<br />
<br />

<strong>Redux Slices</strong>
<br />
We have 4 redux slices, one for storing the messages we get from Firebase Firestore, one is for popups status, one is the information about the message user is trying to send like errors and loading, and the last one is the information about the overall user status and data.
<br />
<br />

<strong>Routes</strong>
<br />
We have 6 routes. One is the main route which shows everything include messages, input and menu. Another one for warning page that is shown everytime user opens the app. Another one is for entering to the app page which shows different login modes when user hasn't logged in and opens the app. Another on is for login, Another one if for signup. And the last one is for settings page.

<strong>Components</strong>
<br />
We have 5 components to show a message box. Message.js for the message box, MessageLoader.js for showing the loader instead of time when the user sends a message, MessageOptions.js for showing options like delete, edit, copy, and reply, MessageReply.js for showing that the message is a reply to another message, and finally MessageTime.js for showing the time that message was sent.
<br />
We've got 4 components. Delete and edit popups. Popup.js is for the popup page, and inside it, we render different components depending on what the user wants. If the user clicks on the delete icon, we render DeletePopup.js, and if the user clicks on the edit icon, we render EditPopup.js. But the overall style and structure for both popups are defined in Popup.js. We also have EditReply.js, which is a component that we render inside EditPopup.js, and it's for changing what message the user wants their message to be replied to.
<br />
We have 2 components for the settings page. One is Settings.js, which is the settings page itself. Another one is SettingsBackgrounds.js. We yet only have one option in settings, which is to change backgrounds, and that's what this component does.
<br />
The whole authentication process has 4 components. EnterModes.js is for showing different modes of entering the app, like login or signup. Login.js is for the login page. Signup.js is for the signup page. We also have AuthError.js, which is for showing the possible errors that we get while logging in or signing up.
<br />
We have the ChatDate.js component to show the date inside the chat. Before the first message that is sent into the chat, we show the new day date to spread each day in the chat.
<br />
We have the Emoji.js component, which is used to show the emoji picker. We've used it both in MessengerInput.js and EditPopup.js.
<br />
We have a component named ErrorBox.js for showing the potential errors that we get while loading the message.
<br />
We have a component named Loader.js to show a loader while messages are loading.
<br />
We have the GroupChat.js component. It's in this component that we map through those messages and pass data to the Message.js component. Also, MessengerMenu.js and MessengerInput.js are both rendered inside this component.
<br />
Messenger.js is the component that we pass inside the main root. Inside this component, we have 3 components, and based on the data in the message slice, we decide which to render. We have Loader.js, which is shown when messages are loading. We have GroupChat.js, which is shown when all the messages are ready. And at the end, we have ErrorBox.js, which is shown when we have an error and when messages are not ready. We render these components based on two object values. With the useSelector hook, we get loading errors from messagesStore. And we decide which one to render by using ternary operators.
<br />
We have MessengerInput.js. We use this component to render an input where the user can write and send their message.
<br />
We have MessengerBackground.js to render the background of the app, and the user can choose it inside the settings page.
<br />
We have MessengerMenu.js. It's a simple component, and it shows two buttons: one for going into the settings page, and the other for logging out.
<br />
We have WarningPage.js. This component renders inside its own route, and that user automatically gets redirected to that route every time they open the app. Unless they checked the never show again checkbox in that way redirection never happens.
<br />
<br />
<br />
<br />


## The Story Behind It

This project first was a really simple project. I didn't have reply, delete, edit, guest mode and etc. In short you could just send message and read messages. But I decided to improve it and add features that I really wanted the messengers I'm using to have them. Like editing replies. So I added those features and still adding new features. The biggest challenge in this project was keeping the codes clean and readable. I'm still trying to do that.