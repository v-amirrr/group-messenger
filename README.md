# Group Messenger

In this messenger you can login either with a name or as a guest. You can send message and delete them or edit them later. You can reply to other's messages. And you can edit your replies later.
<br />
<a href="https://group-messenger.vercel.app">Check it out :)<a/>
<br />
<br />
<br />
<br />


## Features

- Login as a guest just to read messages.
- Logout from guest mode and login with name to send message.
- Change background and theme.
- Send message, read other's messages realtime.
- Delete any of your messages.
- Edit any of your messages.
- Reply to someone's message.
- Edit or add reply after you sent the message.
- include emojis in your message text.
- Copy any message text.
<br />
<br />
<br />
<br />


## How To Use It

First you have to choose a way to login. You can login as a guest or login with a name. 
In Guest mode login you won't be able to send any message but you can logout and login with name whenever you want.
For loggin out as a guest you just need to click on the three-dots menu at the top left of the page then click on of the options.
In login with name mode the name you choose should be uniuqe and it shouldn't be used before by someone else. 
Remeber you can't logout or change the name YET.
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

- Custom Hooks
<br />
This app has 5 custom hooks. One is for getting messages named useGetMessage, another one is for login named useLogin, another one is for messages options like delete and edit named useMessageOptions, another one is for sending messages named useSendMessage, and the last another one is for showing the warning page named useWarningPage.
<br />
<br />

- Redux Slices
<br />
We have 4 redux slices, one for storing the messages we get from Firebase Firestore, one is for popups status, one is the information about the message user is trying to send like errors and loading, and the last one is the information about the overall user status.
<br />
<br />

- Routes
<br />
We have four routes. One is the main route which shows everything include messages, input and menu. Another one for warning page that is shown everytime user opens the app. Another one is for login page which shows different login modes when user hasn't logged in and opens the app. Another on is for loggin in with name which is a nested route in the login route. And the last one is for settings page.
<br />
<br />
<br />
<br />
<br />


## The Story Behind It

This project first was a really simple project. I didn't have reply, delete, edit, guest mode and etc. In short you could just send message and read messages. But I decided to improve it and add features that I really wanted the messengers I'm using to have them. Like editing replies. So I added those features and still adding new features. The biggest challenge in this project was keeping the codes clean and readable. I'm still trying to do that.