class Customer {

    // Attributes.
    id
    first_name
    
    // Constructor.
    constructor(object) {
        this.id = object.id
        this.FirstName = object.first_name
        this.last_name = object.last_name
        this.age = object.age
        this.email = object.email
        this.phone = object.phone
        this.city = object.city
        this.total_pay = object.total_pay
    }

    /**
    * @param {string} value - Name.
    */
    set FirstName(value) {
        if(typeof value !== 'string') throw new TypeError(`${value} is not string type.`)
        if(!isNaN(parseInt(value))) throw new TypeError(`${value} is not string type.2`)
        this.first_name = value
    }
}

export default Customer