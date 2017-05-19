class classListPolyfill {
	constructor (element) {	
		this.element = element;
		if (!('myClassList' in Element.prototype)) {
	        Object.defineProperty(Element.prototype, 'myClassList', {
	            get: function() {
	                return new classListPolyfill(this);
	            }
	        });
    	}
	}

	regExp (name) {
 		return new RegExp('(^| )'+ name +'( |$)');
	};

	forEach (list, fn, scope) {
        for (var i = 0; i < list.length; i++) {
            fn.call(scope, list[i]);
        }
    };

    add () {
        this.forEach(arguments, (name) => {
            if (!this.contains(name)) {
                this.element.className += ' '+ name;
            }
        }, this);
    };

    remove () {
	    forEach(arguments, (name) => {
	        this.element.className = this.element.className.replace(regExp(name), '');
	    }, this);
    };

    toggle (name) {
        return this.contains(name) ? (this.remove(name), false) : (this.add(name), true);
    };

    contains (name) {
        return this.regExp(name).test(this.element.className);
    };
}

new classListPolyfill();

