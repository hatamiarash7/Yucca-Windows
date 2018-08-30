const DEFAULT_TIME = 3000;
export class NotificationEntry {
	constructor(title, description, timeout) {
		this.title = title;
		this.description = description;
		this.timeout = timeout;
	}
}
class Notification {
	/**
	 * 	Display an info notification in the screen.
	 * @param {String} title Title of the notification to display.
	 * @param {String} description Description of the notification to display.
	 * @param {Number} timout Time before destroying the notification.
	 */
	Info(title, description = '', timeout = DEFAULT_TIME) {
		this.Notify(new NotificationEntry(title, description, timeout), 'primary white--text');
	}

	/**
	 * 	Display an error notification in the screen.
	 * @param {String} title Title of the notification to display.
	 * @param {String} description Description of the notification to display.
	 * @param {Number} timout Time before destroying the notification.
	 */
	Error(title, description = '', timeout = DEFAULT_TIME) {
		this.Notify(new NotificationEntry(title, description, timeout), 'error white--text');
		throw new Error(`${title} ${description}`);
	}


	/**
	 * 	Display an error notification in the screen.
	 * @param {String} title Title of the notification to display.
	 * @param {String} description Description of the notification to display.
	 * @param {Number} timout Time before destroying the notification.
	 */
	Warning(title, description = '', timeout = DEFAULT_TIME) {
		this.Notify(new NotificationEntry(title, description, timeout), 'warning white--text');
	}


	/**
	 * 	Display an error notification in the screen.
	 * @param {String} title Title of the notification to display.
	 * @param {String} description Description of the notification to display.
	 * @param {Number} timout Time before destroying the notification.
	 */
	Success(title, description = '', timeout = DEFAULT_TIME) {
		this.Notify(new NotificationEntry(title, description, timeout), 'success white--text');
	}


	/**
	 * Setup the notification system. 
	 * @param {NotificationEntry} entry Contains the info about the notification.
	 * @param {String} color Color of the div displaying the notification.
	 */
	Notify(entry, color) {
		const nElement = document.createElement('div');
		const left = window.innerWidth - 260;

		// When a new notification is added, make sure to move all the other.
		const nots = document.getElementsByClassName('notification-card');
		for (let i = 0; i < nots.length; i++) {
			const item = nots.item(i);
			const rect = item.getBoundingClientRect();

			let moveTop = 0;
			const moveId = setInterval(() => {
				moveTop += 6;
				item.style.top = rect.top - moveTop + 'px';
				if (moveTop >= 110) {
					item.style.top = rect.top - 110 + 'px';
					clearInterval(moveId);
				}
			})
		}

		// Basic customization 
		nElement.className = color + ' notification-card';
		nElement.style.position = 'fixed';
		nElement.style.width = '250px';
		nElement.style.height = '100px';
		nElement.style.left = left + 'px';

		// Entering animation.
		let enterTop = 0;
		const enterId = setInterval(() => {
			enterTop += 6;
			nElement.style.top = window.innerHeight - enterTop + 'px';
			if (enterTop >= 110) {
				nElement.style.top = window.innerHeight - 110 + 'px';
				clearInterval(enterId);
			}
		})
		nElement.style.top = window.innerHeight - 110 + 'px';
		document.querySelector('body').appendChild(nElement);

		// Exiting animation.
		setTimeout(() => {
			let outLeft = left;
			const outId = setInterval(() => {
				outLeft += 6;
				nElement.style.left = outLeft + 'px';
				if (outLeft > window.innerWidth) {
					document.querySelector('body').removeChild(nElement);
					clearInterval(outId);
				}
			})

		}, entry.timeout ? entry.timeout : DEFAULT_TIME);

		// Populating the notification its info.
		const eTitle = document.createElement('div');
		eTitle.className = 'v-card__title title pa-2';
		eTitle.innerHTML = entry.title;

		const eDesc = document.createElement('div');
		eDesc.className = 'v-card__text subheading px-2';
		eDesc.innerHTML = (entry.description) ? entry.description : '';
		nElement.appendChild(eTitle);
		nElement.appendChild(eDesc);
	}
}


export const Notifications = new Notification();