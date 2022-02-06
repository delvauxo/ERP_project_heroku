class Product {

    // Attributes.
    id
    name

    // Constructor.
    constructor(object) {
        this.id = object.id
        this.Name = object.name 
        this.category = object.category 
        this.origin = object.origin 
        this.stock = object.stock 
        this.price_sell = object.price_sell 
        this.supplier = object.supplier 
        this.price_supplier = object.price_supplier
    }

    /**
     * @param {string} value - Name.
     */
    set Name(value) {
        if(typeof value !== 'string') throw new TypeError(`${value} is not string type.`)
        if(!isNaN(parseInt(value))) throw new TypeError(`${value} is not string type.2`)
        this.name = value
    }

    getInstance() {
        return new this
    }

} 
export default Product