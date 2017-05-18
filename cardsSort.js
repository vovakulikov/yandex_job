const cards = [
    {
        from: 'Saint-Petesburg',
        to: 'Moscow'
    },
    {
        from: 'Rostov',
        to: 'Krasnodar'
    },
    {
        from: 'Kaliningrad',
        to: 'Rostov'
    },
    {
        from: 'Moscow',
        to: 'Kaliningrad'
    },
    {
        from: 'Krasnodar',
        to: 'Pushkin'
    },
    {
        from: 'Pskov',
        to: 'Kazan'
    },
    {
        from: 'Pushkin',
        to: 'Pskov'
    },

];

class RoudCards {

    constructor (cards) {
        const ticketBook = this.makeTicketsBook(cards);
        const pointA = this.findStartPoint(cards, ticketBook.toFields);

        this.sortTicket(pointA, ticketBook.store);
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
     * Поиск начальной точки
     *
     * @param {Object} point — посадочная карточка для начального пункта.
     * @param {Object} store — объект маршрута  key - пункт отправление store[key] — исходная кароточка
     * @returns {Array} остортированный список посадочных карточек
     */
    sortTicket (point, store) {
        console.log('From -> ', point.from, ' To -> ', point.to);

        if (store.hasOwnProperty(point.to))
            this.sortTicket(store[point.to], store);
    }
}

const roudCards = new RoudCards(cards);

