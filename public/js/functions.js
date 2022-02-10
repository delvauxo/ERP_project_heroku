// 
// Global Variables.
// 
const domainName = 'http://lhttps://erp-project-heroku.herokuapp.com'

/**
 * ASYNC Function - Fetch data.
 * @param {String} url - URL of the API to fetch.
 * @returns Object with datas.
 */
 async function fetchData(url) {
    return fetch(url)
    .then(res => res.json())
}

/**
 * ASYNC Function - Get a specific item.
 * @param {Number} id - ID of the item.
 * @param {string} apiPath - Path of the api item.
 */
const getItem = async function(id, apiPath) {
    const response = await fetch(domainName + apiPath + '/' + id)
    const item = await response.json()
    return item
}

/**
* ASYNC Function - Get all items.
 * @param {string} apiPath - Path of the API to fetch.
*/
const getItems = async function(apiPath) {
    const response = await fetch(domainName + apiPath)
    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        console.error('Error : ', response.status)
    }
}

/**
 * ASYNC Function - Insert new product datas in API database.
 * @param {object} objectData - Object of datas.
 * @param {string} apiPath - Path of the API to fetch.
 */
const insertItem = async function(objectData, apiPath) {
    const currentModal = document.querySelector('#btn-add').dataset.bsTarget
    const method = document.querySelector(currentModal + ' form[data-method]').dataset.method
    const response = await fetch(domainName + apiPath, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectData)
    })
    if (!response.ok) {
        console.error('Error : ' + response.status)
    }
    // Fetch new datas after form reset.
    const items  = await getItems(apiPath)
    // Reload listing with new data inserted after getting new listing with new item.
    createTable(items, document.querySelector('#listing'))
}

/**
 * ASYNC Function - Delete listing item.
 * @param {Number} id - ID of the item to delete.
 */
const deleteItem = async function(id) {
    const page = document.querySelector('#btn-add').dataset.path
    await fetch(domainName + '/' + page + '/' + id, {method: 'DELETE'})
    // Fetch new items without last item deleted.
    const items  = await getItems('/' + page)
    // Reload listing with new data inserted after getting new listing with new product.
    createTable(items, document.querySelector('#listing'))
}

/**
 * ASYNC Function - Edit listing item.
* @param {Number} id - ID of the item to edit.
*/
const editItem = async function(objectData, apiPath, id) {

    const currentModal = document.querySelector('#btn-add').dataset.bsTarget
    const method = document.querySelector(currentModal + ' form[data-method]').dataset.method

    const response = await fetch(domainName + apiPath + '/' + id, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectData)
    })
    if (!response.ok) {
        console.error('Error : ' + response.status)
    }
    // Fetch new datas after form reset.
    const items  = await getItems(apiPath)
    // Reload listing with new data inserted after getting new listing with new item.
    createTable(items, document.querySelector('#listing'))
}

/**
 * Function - Create HTML table with datas and insert it into DOM HTML element.
 * @param {Array} datas - Array of datas.
 * @param {html} htmlElem - DOM HTML element.
 */
const createTable = function(datas, htmlElem) {
    let html = ''
    // If at least 1 data exists.
    if(datas.length > 0) {
        html += `<div class="table-responsive">`
        html += `<table class="table table-dark table-hover">`
        html += `<thead>`
        for (const key of Object.keys(datas[0])) {
            html += `<th>${key}</th>`
        }
        html += `<th>Actions</th>`
        html += `</thead>`
        for (const data of datas) {
            html += `<tr>` 
            for (const value of Object.values(data)) {
                html += `<td>${value}</td>` 
            }
            html += `<td class="listing-item-actions">`
            html += `<input class="btn btn-warning btn-sm" type="button" value="Edit" data-index="${data.id}">`
            html += `<input class="btn btn-danger btn-sm" type="button" value="Delete" data-index="${data.id}">`
            html += `</td>`
            html += `</tr>`
        }
        html += `</table>`
        html += `</div>`
        
        htmlElem.innerHTML = html
    } else {
        // No product in API database.
        html = '<span>There is no product.</span>'
        htmlElem.innerHTML = html
    }
    // Set modal attributes on edit action buttons.
    setModalAttr(document.querySelectorAll('#listing .listing-item-actions .btn-warning'), document.querySelector('input[data-page]'))
    // Set edit event on action buttons.
    setActionBtnEvent(document.querySelectorAll('#listing .listing-item-actions .btn-warning'), editItem)
    // Set delete event on action buttons.
    setActionBtnEvent(document.querySelectorAll('#listing .listing-item-actions .btn-danger'), deleteItem)
}

/**
 * Function - Set events for the action button.
 * @param {array} arrayBtns - Buttons to set action events.
 * @param {function} btnFunction - Function to use for the action.
 */
const setActionBtnEvent = function(arrayBtns, btnFunction) {
    // Set function action buttons events.
    for (const btn of arrayBtns) {
        // On action button click.
        btn.addEventListener('click', function() {
            // Get ID of current item.
            const id = this.dataset.index
            // If editItem function.
            if (btnFunction === editItem) {
                const path = document.querySelector('#btn-add').dataset.path
                const page = document.querySelector('#btn-add').dataset.page
                const form = document.querySelector('#' + page + 'Modal' + ' form')
                // Reset form.
                form.reset()
                // Set method attribute to form.
                form.setAttribute('data-method', 'PUT')
                // Set selected ID as attribute.
                form.setAttribute('data-item-id', id)
                // Set modal title for edit.
                document.querySelector('#' + page + 'ModalLabel').innerHTML = 'Edit ' + page
                // jQuery modal selector.
                const $modal = $(this.dataset.bsTarget)
                const inputs = document.querySelectorAll(this.dataset.bsTarget + ' form *[name]')
                // When modal is shown jQuery.
                $modal.one('shown.bs.modal', async function() {
                    const item = await getItem(id, '/' + path)
                    // If page is PRODUCT.
                    if (document.querySelector('#btn-add').dataset.page === 'product') {
                        // Fetch new items with last edited item.
                        const suppliers  = await getItems('/suppliers')
                        // Add suppliers to new product select form.
                        createSelectOptions(suppliers, document.querySelector('#product-supplier'))
                        // Load countries datas from API and insert them in select.
                        loadCountries(document.querySelector("#product-country"))
                        .then(async function() {
                            // Fill country with existing value once coutries list is loaded.
                            document.querySelector("#product-country").value = item.origin
                        })
                    }
                    // Fill form with existing values.
                    for (const input of inputs) {
                        input.value = item[input.name]
                    }
                })
            } else if (btnFunction === deleteItem) {
                // delete item.
                deleteItem(id)
            }
        })
    }
}

/**
 * Function - Set modal attributes on action
 * @param {array} arrayBtns - Buttons to set modal attributes.
 * @param {node} page - node who has page attribute.
 */
const setModalAttr = function(arrayBtns, page) {
    for (const btn of arrayBtns) {
        btn.setAttribute('data-bs-toggle', 'modal')
        btn.setAttribute('data-bs-target', '#' + page.dataset.page + 'Modal')
    }
}

/**
 * ASYNC Function - Create Listing of datas from API.
 * @param {html} listing - HTML listing element having [data-listing] attribute.
 */
const createListing = async function(listing) {
    // Hide Hero section.
    hideHtmlElem(document.querySelector('#hero'))
    // Add listing title.
    document.querySelector('#listing-title').innerHTML = capitalizeFirstLetter(listing.dataset.path)
    // Fetch new items with last edited item.
    const items  = await getItems('/' + listing.dataset.path)
    // Display add button of current listing.
    showListingAddBtn(listing)
    // Create HTML products listing table.
    createTable(items, document.querySelector('#listing'))
}

/**
 * Function - Link and update add button with listing.
 * @param {Object} listing - Listing to link with add button.
 */
const showListingAddBtn = function(listing) {
    const inputSubmit = document.querySelector('#btn-add')
    // Display add button.
    inputSubmit.classList.remove('d-none')
    // Set attributes to add button.
    inputSubmit.setAttribute('value', 'Add a ' + capitalizeFirstLetter(listing.dataset.listing))
    inputSubmit.setAttribute('data-page', listing.dataset.listing)
    inputSubmit.setAttribute('data-path', listing.dataset.path)
    inputSubmit.setAttribute('data-bs-target', '#' + listing.dataset.listing + 'Modal')
    // On add button click.
    inputSubmit.addEventListener('click', async function(e) {
        // Stop propagation if click on multiples menu btns before add item.
        e.stopImmediatePropagation()
        // Selectors.
        const page = this.dataset.page
        const form = document.querySelector('#' + page + 'Modal' + ' form')
        // Reset form.
        form.reset()
        // Set method attribute to form.
        form.setAttribute('data-method', 'POST')
        // Set modal title with ADD.
        document.querySelector('#' + page + 'ModalLabel').innerHTML = 'Add a new ' + page
        // If page is PRODUCT.
        if (this.dataset.page === 'product') {
            // Fetch new items with last edited item.
            const suppliers  = await getItems('/suppliers')
            // Add suppliers to new product select form.
            createSelectOptions(suppliers, document.querySelector('#product-supplier'))
            // Load countries datas from API and insert them in select.
            loadCountries(document.querySelector("#product-country"))
        }
    })    
}

/**
 * Function - Create countries name options for HTML select.
 * @param {html} selectElem - HTML select to insert countries options.
 */
const loadCountries = async function(selectElem) {
    const response = await fetch("https://restcountries.com/v3.1/all")
    if(response.ok){
        const countries = await response.json()
        // // Sort objects in an array alphabetically on one property of the array.
        let countriesSort = countries.sort(function(a, b) {
            var textA = a.name.common
            var textB = b.name.common
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
        })
        let html = ''
        for (const country of countriesSort) {
            html += `<option>${country.name.common}</option>`
        }
        if(selectElem) {
            selectElem.innerHTML = html
        }
    }
}

/**
 * Function - Create select options with datas and insert it into HTML DOM element.
 * @param {Array} datas - Array of datas.
 * @param {html} htmlElem - DOM HTML element.
 */
const createSelectOptions = function(datas, htmlElem) {
    let html = ''
    for (const data of datas) {
        html += `<option>${data.name}</option>`
    }
    if(htmlElem) {
        htmlElem.innerHTML = html
    }
}

/**
 * Function - On form submit, insert new item in API database.
 * @param {html} htmlForm - Form to be submited.
 * @param {class} className - Class object.
 * @param {function} insertFunction - The appropriate function item to insert.
 * @param {function} getFunction - The appropriate function item to get.
 * @param {string} idModal - HTML id value of the modal to be shown.
 * @param {string} apiPath - Path of the API to fetch.
 */
const formSubmit = function(htmlForm, className, apiPath, idModal) {
    // On form Submit.
    htmlForm.addEventListener('submit', (e) => {
        // Prevent default behavior.
        e.preventDefault()
        // Retrieve datas from form.
        const formData = new FormData(e.target)
        const datas = Object.fromEntries(formData)
        // Instanciate new class Object with form datas.
        const item = Object.assign(datas, className)
        // Get fetch method.
        const method = document.querySelector(idModal + ' form[data-method]').dataset.method
        // Get ID for edit fetch method.
        let id = null
        if (document.querySelector(idModal + ' form')) {
            id = document.querySelector(idModal + ' form').dataset.itemId
        }
        // Fetch Methods.
        if (method === 'POST') {
            // Insert new item in API database.
            insertItem(item, apiPath, method)
            .then(async function() {
                // Hide modal after datas sent (jQuery).
                $(idModal).modal('hide')
                // Reset form after modal is hidden.
                htmlForm.reset()
            })
        } else if (method === 'PUT') {
            // Update new item in API database.
            editItem(item, apiPath, id)
            .then(async function() {
                // Hide modal after datas sent (jQuery).
                $(idModal).modal('hide')
                // Reset form after modal is hidden.
                htmlForm.reset()
            })
        }
    })
}

/**
 * Function - Hide HTML element with Bootstrap class d-none.
 * @param {Node} element - HTML element node to hide.
 */
const hideHtmlElem = function (element) {
    // Hide HTML element.
    element.classList.add('d-none')
}

/**
 * Function - Capitalize first letter.
 * @param {String} string - String to capitalize first letter.
 * @returns Given string with first letter capitalized.
 */
const capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}