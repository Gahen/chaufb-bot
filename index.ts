declare var process: any;
import * as login from 'facebook-chat-api'
import { messages } from './messages'

const email = process.env.FB_EMAIL
const password = process.env.FB_PASS

const alreadyNotified = [];

// Create simple echo bot
login({ email, password }, { forceLogin: true }, (err, api) => {
		console.error(err);

		api.setOptions({
			forceLogin: true,
			selfListen: true
		})

		api.listen((err, message) => {
			if (!alreadyNotified[message.senderID]) {
				api.sendMessage(messages.es, message.threadID);
				alreadyNotified[message.senderID] = true;
			}
	});
});
