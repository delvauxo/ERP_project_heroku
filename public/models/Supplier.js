class Supplier {

    // Attributes.
    id
    name

    // Constructor.
    constructor(object) {
        this.id = object.id
        this.Name = object.name
        this.city = object.city
        this.product_id = object.product_id
        this.total_purchases = object.total_purchases
    }

    /**
    * @param {string} value - Name.
    */
    set Name(value) {
        if(typeof value !== 'string') throw new TypeError(`${value} is not string type.`)
        if(!isNaN(parseInt(value))) throw new TypeError(`${value} is not string type.2`)
        this.name = value
    }
}

export default Supplier