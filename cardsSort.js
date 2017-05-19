const cards = [
    {
        from: 'Saint-Petesburg',
        to: 'Moscow',
        type: 'train',
        number: '78A',
        addInfo: {
        	'Seat': '45B'
        }
    },
    {
        from: 'Rostov',
        to: 'Krasnodar',
        type: 'flight',
        number: 'SK22',
        addInfo: {
        	'Gate': 22,
        	'Seat': '3A',
        	'Baggage': 'will be automatically transferred from your last leg.'
       	}

    },
    {
        from: 'Kaliningrad',
        to: 'Rostov',
        type: 'flight',
        number: 'SK445',
        addInfo: {
        	'Seat': '3A',
        	'Baggage': 'drop at ticket counter 344'
       	}
    },
    {
        from: 'Moscow',
        to: 'Kaliningrad',
        type: 'bus',
        number: '78A',
        addInfo: {
        	'': ' No seat assignment'
        }
    },
    {
        from: 'Krasnodar',
        to: 'Pushkin',
        type: 'bus',
        number: '78A',
        addInfo: {
        	'': ' No seat assignment'
        }
    },
    {
        from: 'Pskov',
        to: 'Kazan',
        type: 'bus',
        number: '78A',
        addInfo: {
        	'': ' No seat assignment'
        }
    },
    {
        from: 'Pushkin',
        to: 'Pskov',
        type: 'bus',
        number: '78A',
        addInfo: {
        	'': ' No seat assignment'
        }
    },

];

class RoudCards {

    constructor (cards) {
        const ticketBook = this.makeTicketsBook(cards);
        const pointA = this.findStartPoint(cards, ticketBook.toFields);


        this.description = '';
        this.sortTicketArray = this.sortTicket(pointA, ticketBook.store);
        
    }

    /**
     * Cоздать Книгу билетов, для прохода по маршруту и доступа к доп. инофрмации
     *
     * @param {Array} cards - массив блитов (посадочных карточек).
     * @returns
     * {
     *      store — объект маршрута  key - пункт отправление store[key] — исходная кароточка
     *      toFields — обьект с полями места назначение (обьект для послеующего определение начальной точки)
     * }
     */
    makeTicketsBook (cards) {
        return cards.reduce((ticketsBook, currentTicket) => {
            const from = currentTicket.from;
            const to = currentTicket.to;

            ticketsBook.store[from] = currentTicket;
            ticketsBook.toFields[to] = true;

            return ticketsBook;
        }, {
            store: {},
            toFields : {}
        });
    }

    /**
     * Поиск начальной точки
     *
     * @param {Array} cards — массив блитов (посадочных карточек).
     * @param {Object} toFileds — toFields — обьект с полями места назначение
     * @returns
     * {
     *   from: '<Место отправления>',
     *   to: '<Место назначение>'
     *  }
     */
    findStartPoint (cards, toFileds) {
        return cards.filter( item => {
            return !toFileds.hasOwnProperty(item.from);
        })[0];
    }

    /**
     * Сортировка посдочных карточек
     *
     * @param {Object} point — посадочная карточка для начального пункта.
     * @param {Object} store — объект маршрута  key - пункт отправление store[key] — исходная кароточка
     * @returns {Array} остортированный список посадочных карточек
     */
    sortTicket (startTicket, store) {
        // console.log('From -> ', point.from, ' To -> ', point.to);
        const sortTicketArray = [];
        let description = '';
        let currentTicket = startTicket;

        while (currentTicket) {
        	sortTicketArray.push(currentTicket);
        	description = description + this.makeTextDescription(currentTicket)+ '\n';
        	currentTicket = store[currentTicket.to];
        }
        this.description = description;
        return sortTicketArray;
    }
	/**
     * Шаблон для текстового описания посдочной карточеке
     *
     * @param {Object} ticket — посадочная карточка.
     * @returns {Stirng} — текстовое описание посадочной карточки
     */
    makeTextDescription (ticket) {
    	const makeAddInfo = (addInfo) => {
    		let str= '';
    		for( let key in addInfo) {
    			str = str + `${key} ${addInfo[key]}`
    		}
    		return str;
    	}
    	const addInfo = makeAddInfo(ticket.addInfo);

    	return `Take ${ticket.type} ${ticket.number} from ${ticket.from} to ${ticket.to}. ${addInfo}`
    }

}

const roudCards = new RoudCards(cards);

console.log(roudCards.sortTicketArray)
console.log(roudCards.description)