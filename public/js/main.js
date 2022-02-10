import includeHTMLs from "./includes.js"
import Supplier from "../models/Supplier.js"
import Product from "../models/Product.js"
import Customer from "../models/Customer.js"

// Make HTML includes.
await includeHTMLs(document.querySelectorAll('[include-html]'))

// Create listings.
for (const listing of document.querySelectorAll('[data-listing]')) {
    listing.addEventListener('click', function(e) {
        // Cancel default behavior.
        e.preventDefault()
        // Create listing.
        createListing(listing)
    })
}

// On form Submits new form datas are sent to API database.
formSubmit(document.querySelector('#form-product'), Product, '/products', '#productModal')
formSubmit(document.querySelector('#form-supplier'), Supplier, '/suppliers', '#supplierModal')
formSubmit(document.querySelector('#form-customer'), Customer, '/customers', '#customerModal')
