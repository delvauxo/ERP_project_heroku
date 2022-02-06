import includeHTMLs from "./includes.js"
import Supplier from "../models/Supplier.js"
import Product from "../models/Product.js"
import Customer from "../models/Customer.js"

// Make HTML includes.
await includeHTMLs(document.querySelectorAll('[include-html]'))

// Create links listings.
createListingDatas(document.querySelectorAll('[data-listing]'), document.querySelector('#btn-add'))

// On form Submits new form datas are sent to API database.
formSubmit(document.querySelector('#form-product'), Product, insertProduct, getProducts, '#productModal')
formSubmit(document.querySelector('#form-supplier'), Supplier, insertSupplier, getSuppliers, '#supplierModal')
formSubmit(document.querySelector('#form-customer'), Customer, insertCustomer, getCustomers, '#customerModal')
