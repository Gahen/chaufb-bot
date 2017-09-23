declare var process: any;
import * as login from 'facebook-chat-api'
import { messages } from './messages'
import * as http from 'http'

const email = process.env.FB_EMAIL
const password = process.env.FB_PASS

const alreadyNotified = [];
const timeBetweenAttempts = 5000 // 5 seconds
const maxAttempts = 100

// Create simple echo bot
const doLogin = (attempt) => {
	login({ email: email, password: password }, function (err, api) {
		if (err) {
			console.error(err);
			if (attempt < maxAttempts) {
				console.log('attempting relogin #'+attempt)
				setTimeout(function() {
					// doLogin(attempt+1)
				}, timeBetweenAttempts)
				console.log('couldn\'t login =(, I\'ll just die')
				process.exit(5);
				return false
			} else {
				console.log('too many attempts, I\'ll just die.')
				process.exit(5);
			}
		}

		api.setOptions({
			forceLogin: true,
			selfListen: true
		})

		const stop = api.listen((err, message) => {
			if (!alreadyNotified[message.senderID]) {
				api.sendMessage(messages.es, message.threadID);
				alreadyNotified[message.senderID] = true;
			}
		});

		// Below here is only to avoid now.sh errors and to have an even easier way to kill the server
		const port = Math.ceil(Math.random()*63535) + 2000 // Avoid privileged ports, and some more (?)

		const requestHandler = (request, response) => {
			stop()
			response.end('Oh no! I\'m dead.')
		}
		const server = http.createServer(requestHandler)
		server.listen(port, (err) => {
			if (err) {
				return console.log('something bad happened', err)
			}
		  console.log(`server is listening on ${port}`)
		})
	});
}

doLogin(1);
