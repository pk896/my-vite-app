class Cart {
    cartItem = undefined;
    loculStorageKey = undefined;

    constructor(loculStorageKey) {
        this.loculStorageKey = loculStorageKey;
        this.loadFromLoculStorage();
    }

    loadFromLoculStorage() {
        this.cartItem = JSON.parse(localStorage.getItem(this.loculStorageKey));
        if (!this.cartItem) {
            this.cartItem = [{
            fruidsId: '29374pd384-29456fh410-4544',
            quantity: 1,
            deliveryId: '1'
        }, {
            fruidsId: '52739er586-13456sj53-4933',
            quantity: 2,
            deliveryId: '2'
        }, {
            fruidsId: '15567kd765-89302ge421-3002',
            quantity: 1,
            deliveryId: '3'
        }]
        }
    }

    saveToLocalStorage() {
        localStorage.setItem(this.loculStorageKey, JSON.stringify(this.cartItem))
    }

    addToCart(fruidsId) {
        let matchingItem;

                this.cartItem.forEach((cartItem) => {
                    if (fruidsId === cartItem.fruidsId) {
                        matchingItem = cartItem;
                    }
                })

                if (matchingItem) {
                    matchingItem.quantity += 1;
                } else {
                    this.cartItem.push({
                        fruidsId: fruidsId,
                        quantity: 1,
                        deliveryId: '1'
                    })
                };

            this.saveToLocalStorage()
    }

    removeFromCart(fruidsId) {
        let newCart = [];

        this.cartItem.forEach((item) => {
            if (item.fruidsId !== fruidsId) {
                newCart.push(item);
            };
        });
        this.cartItem = newCart;
        this.saveToLocalStorage()
    }

    auditTheCart(fruidsId, selectedDeliveryOptionId) {
        let matchingItem;

                this.cartItem.forEach((cartItem) => {
                    if (fruidsId === cartItem.fruidsId) {
                        matchingItem = cartItem;
                    }
                });
                matchingItem.deliveryId = selectedDeliveryOptionId;
                this.saveToLocalStorage()
        
    }

    getcartQuantity() {
        let totalQuantity = 0;
        this.cartItem.forEach((item) => {
            totalQuantity += item.quantity;
        });
        return totalQuantity;

    }
}

const q = new Cart('q');
const q1 = new Cart('q1');
const pk = new Cart('pk')
console.log(q,q1,pk);
q.addToCart();
q1.addToCart();
q1.removeFromCart()

