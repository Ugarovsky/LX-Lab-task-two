var currentOrderId;
var shipName = document.getElementById("name");
var shipStreet = document.getElementById("street");
var shipCode = document.getElementById("code");
var shipCity = document.getElementById("city");
var shipCountry = document.getElementById("county");
var shipRegion = document.getElementById("region");

//add list objects      
function GetOrderList() {
    for (var count = 0; count < Orders.length; count++) {
        var orderID = document.createTextNode("Order " + Orders[count].id);
        var createdAt = document.createTextNode(Orders[count].OrderInfo.createdAt);
        var customer = document.createTextNode(Orders[count].OrderInfo.customer);
        var orderStatus = document.createTextNode(Orders[count].OrderInfo.status);
        var shippedAt = document.createTextNode("Shipped:" + Orders[count].OrderInfo.shippedAt);

        var newOrderBox = document.createElement("li");
        newOrderBox.className = "order-box"
        var numberInfo = document.createElement("article");
        numberInfo.className = "number-info";

        var IDInfo = document.createElement("h2");
        var customerInfo = document.createElement("p");
        var createdInfo = document.createElement("p");
        var timeInfo = document.createElement("time");
        var statusInfo = document.createElement("p");

        var a = document.getElementById("order-list");
        a.appendChild(newOrderBox);
        newOrderBox.id = count + 1;
        newOrderBox.setAttribute('onClick', 'reply_click(this.id)');

        newOrderBox.appendChild(numberInfo);
        numberInfo.appendChild(IDInfo);
        IDInfo.appendChild(orderID);
        numberInfo.appendChild(customerInfo);
        numberInfo.appendChild(createdInfo);
        customerInfo.appendChild(customer);
        createdInfo.appendChild(shippedAt);

        var orderState = document.createElement("article");
        orderState.className = "order-status";

        orderState.appendChild(timeInfo);
        orderState.appendChild(statusInfo);
        timeInfo.appendChild(createdAt);
        statusInfo.appendChild(orderStatus);
        newOrderBox.appendChild(orderState);

        getStatusColor(statusInfo);
    };
    getOrderCount(count);
};

function getStatusColor(statusInfo){
if(statusInfo.textContent == 'Accepted'){
    statusInfo.className = "accepted";
}
else{
    statusInfo.className = "pending";
}
}

window.onload = GetOrderList();

//renew data
function reply_click(nowId) {
    switchView();

    currentOrderId = nowId;
    var currentOrder = Orders[currentOrderId - 1];
    var orderTittle = document.getElementById("order-title");
    var orderCustomer = document.getElementById("order-customer");
    var orderedDate = document.getElementById("ordered-date");
    var orderShipped = document.getElementById("shipped-date");

    var currentOrder = currentOrder;
    updateProductsTableView(currentOrder.products, true);

    orderTittle.innerHTML = "Order: " + currentOrder.id;
    orderCustomer.innerHTML = "Customer:" + currentOrder.OrderInfo.customer;
    orderedDate.innerHTML = "Created:" + currentOrder.OrderInfo.createdAt;
    orderShipped.innerHTML = "Shipped:" + currentOrder.OrderInfo.shippedAt;

    //active list element
    var newOrderBox = document.body.getElementsByClassName("order-box");
    for (var i = 0; i < newOrderBox.length; i++) {
        if (newOrderBox[i].id == nowId) {
            newOrderBox[i].className = "order-box active-list";
        }
        else {
            newOrderBox[i].className = "order-box no-active";
        }
    }
    
    getCustomerInfo();
    getFullPrice(currentOrder);

};
function getHumanInfo() {
    var currentOrder = Orders[currentOrderId - 1];
    var Car = document.querySelector("#car");
    var Human = document.querySelector("#human");
    Car.className = "no-active";
    Human.className = "active";
    shipName.innerHTML = "First Name: " + currentOrder.CustomerInfo.firstName;
    shipStreet.innerHTML = "Last Name: " + currentOrder.CustomerInfo.lastName;
    shipCode.innerHTML = "Region: " + currentOrder.CustomerInfo.address;
    shipCity.innerHTML = "Phone: " + currentOrder.CustomerInfo.phone;
    shipCountry.innerHTML = "Email: " + currentOrder.CustomerInfo.email;
}

function getCustomerInfo() {
    var currentOrder = Orders[currentOrderId - 1];
    var Car = document.querySelector("#car");
    var Human = document.querySelector("#human");
    Car.className = "active";
    Human.className = "no-active";
    shipName.innerHTML = "Name: " + currentOrder.ShipTo.name;
    shipStreet.innerHTML = "Street: " + currentOrder.ShipTo.Address;
    shipCode.innerHTML = "Zip Code: " + currentOrder.ShipTo.ZIP;
    shipCity.innerHTML = "Region: " + currentOrder.ShipTo.Region;
    shipCountry.innerHTML = "County: " + currentOrder.ShipTo.Country;
}

//order count
function getOrderCount(count) {
    var order = document.createTextNode("order(" + count + ")");
    var orderCount = document.getElementById("order-count");
    orderCount.textContent = "";
    orderCount.appendChild(order);
}

//search
function startSearch() {
    var count = 0;
    var ClearList = document.getElementById("order-list");
    var fc = ClearList.firstChild;

    while (fc) {
        ClearList.removeChild(fc);
        fc = ClearList.firstChild;
    }
    for (i = 0; i < Orders.length; i++) {
        var myInput = document.querySelector(".order-search");
        var term = myInput.value;
        var FullOrderBoxInfo = "Order " + Orders[i].id + " " + Orders[i].OrderInfo.customer + " Shipped:" + Orders[i].OrderInfo.shippedAt + " " + Orders[i].OrderInfo.status.toLocaleLowerCase();
        if (FullOrderBoxInfo.toLocaleLowerCase().indexOf(term.toLowerCase()) != -1) {
            count++;
            orderBoxIsValid(i);
        }
    }

    checkForNoSearchResult(count);
    getOrderCount(count);
};

function orderBoxIsValid(i) {
    var orderID = document.createTextNode("Order " + Orders[i].id);
    var createdAt = document.createTextNode(Orders[i].OrderInfo.createdAt);
    var customer = document.createTextNode(Orders[i].OrderInfo.customer);
    var orderStatus = document.createTextNode(Orders[i].OrderInfo.status);
    var shippedAt = document.createTextNode("Shipped:" + Orders[i].OrderInfo.shippedAt);

    var newOrderBox = document.createElement("li");
    newOrderBox.className = "order-box";
    var numberInfo = document.createElement("article");
    numberInfo.className = "number-info";

    var IDInfo = document.createElement("h2");
    var customerInfo = document.createElement("p");
    var createdInfo = document.createElement("p");
    var timeInfo = document.createElement("time");
    var statusInfo = document.createElement("p");

    var a = document.getElementById("order-list");
    a.appendChild(newOrderBox);
    newOrderBox.id = i + 1;
    newOrderBox.setAttribute('onClick', 'reply_click(this.id)');

    newOrderBox.appendChild(numberInfo);
    numberInfo.appendChild(IDInfo);
    IDInfo.appendChild(orderID);
    numberInfo.appendChild(customerInfo);
    numberInfo.appendChild(createdInfo);
    customerInfo.appendChild(customer);
    createdInfo.appendChild(shippedAt);

    var orderState = document.createElement("article");
    orderState.className = "order-status";

    orderState.appendChild(timeInfo);
    orderState.appendChild(statusInfo);
    timeInfo.appendChild(createdAt);
    statusInfo.appendChild(orderStatus);
    newOrderBox.appendChild(orderState);

    getStatusColor(statusInfo);
}

function refreshSearch() {
    var ClearList = document.getElementById("order-list");
    var fc = ClearList.firstChild;

    while (fc) {
        ClearList.removeChild(fc);
        fc = ClearList.firstChild;
    }

    var myInput = document.querySelector(".order-search");
    myInput.value = "";
    var orders = document.body.getElementsByClassName("order-box");
    Array.from(orders).forEach(function(newOrderBox) {
        count++;
        newOrderBox.style.display = "flex";
    });

    checkForNoSearchResult(Orders.length);
    GetOrderList();
}

function getFullPrice(currentOrder) {
    var fullPrice = 0;
    var totalPrice = document.getElementById("price-tittle");
    for (var i = 0; i < currentOrder.products.length; i++) {
        fullPrice += +currentOrder.products[i].totalPrice;
    }
    totalPrice.innerHTML = fullPrice;
}

function switchView() {
    document.getElementById('empty-content').className = 'hidden';
    document.getElementById('content').className = '';
}

function checkForNoSearchResult(count) {
    var className = '';

    if (count == 0) {
        className = 'no-orders';
    }
    
    document.getElementById('order-list').className = className;
}

var sortFields = [];
function sortProducts(fieldName, currenOrderId) {
    var currentOrder = Orders[currenOrderId - 1];
    var allProducts = currentOrder.products.slice();
    
    updateSortFieldsArray(fieldName);

    var products = sortFields.length == 0
        ? allProducts
        : allProducts
        .sort(ordersSortFunction);

    updateProductsTableView(products);
}

function updateSortFieldsArray(fieldName) {
    var fieldIndex = sortFields.findIndex(function(field) { return field.name == fieldName });
    var field = sortFields[fieldIndex];

    if (field) {
        if (field.isDescending) {
            sortFields.splice(fieldIndex, 1);
        }
        else {
            field.isDescending = true;
        }
    }
    else {
        sortFields.push({
            name: fieldName,
            isDescending: false
        });
    }
}

function updateProductsTableView(products, cleanSortFields) {
    if (cleanSortFields) {
        sortFields = [];
    }

    renderProductsTableTitle(products);
    updateProductsTableHeadView();
    updateProductsTableBodyView(products);
}

function updateProductsTableHeadView() {
    displayOrders = sortFields.map(function(field) { 
        return {
            name: field.name, 
            viewOrder: field.isDescending ? '↓' : '↑'};
    })

    var productsViewOrder = displayOrders.find(function(field) { return field.name == 'name' });
    var unitPriceViewOrder = displayOrders.find(function(field) { return field.name ==  'price' });
    var quantityViewOrder = displayOrders.find(function(field) { return field.name ==  'quantity' });
    var totalViewOrder = displayOrders.find(function(field) { return field.name ==  'totalPrice' });

    var element = document.getElementById('products-table-head');

    element.innerHTML = `
        <tr>
            <td class="header-item" onClick="sortProducts('name', currentOrderId)">
                Product ${(productsViewOrder ? productsViewOrder.viewOrder : '')}
            </td>
            <td class="header-item" onClick="sortProducts('price', currentOrderId)">
                Unit Price ${(unitPriceViewOrder ? unitPriceViewOrder.viewOrder : '')}
            </td>
            <td class="header-item" onClick="sortProducts('quantity', currentOrderId)">
                Quantity ${(quantityViewOrder ? quantityViewOrder.viewOrder : '')}
            </td>
            <td class="header-item" onClick="sortProducts('totalPrice', currentOrderId)">
                Total ${(totalViewOrder ? totalViewOrder.viewOrder : '')}
            </td>
        </tr>
    `;
}

function updateProductsTableBodyView(products) {
    var element = document.getElementById('products-table-body');
    element.innerHTML = '';

    products.forEach(function(product) {
        element.innerHTML += "<td><strong>" +product.name + "</strong><p>" +product.id + " <td> <strong> " + product.price + "</strong> " + product.currency + "<td> <strong> " + product.quantity +"</strong><td><strong>" + product.totalPrice + "</strong> " + product.currency; 
    });
  
}

function renderProductsTableTitle(products) {
    var element = document.getElementById('products-header-title');
    element.innerHTML = "Line Items " + products.length;
}

function valuesAreNumbers(values) {
    var regex = RegExp('^[\\d\\.]+$');
    var result = true;
    
    values.forEach(function(value) {
        result = result && regex.test(value);
    });

    return result;
}

function ordersSortFunction(firstProduct, secondProduct) {
    var result = [];
    
    sortFields.forEach(function(field) {
        var sortFunction = function(a, b) { 
            if (valuesAreNumbers([a, b])) {
                return b - a > 0;
            }
            return a < b 
        };
        
        if (field.isDescending) {
            sortFunction = function(a, b) {
                if (valuesAreNumbers([a, b])) {
                    return a - b > 0;
                }
                return a > b;
            };
        }

        if (sortFunction(firstProduct[field.name], secondProduct[field.name])) {
            result.push(1);
        }
        else {
            result.push(-1);
        }
    });

    return result.reduce(function(accumulator, currentValue) { return accumulator + currentValue });
}

function searchForProduct() {
    var userInput = document.getElementById('products-search-area').value.toLowerCase();

    if (userInput) {
        var products = Orders[currentOrderId - 1].products;

        var filteredProducts = userInput == '' 
            ? products
            : products.filter(function(product) {
                var result = false;
                var keys = Object.keys(product);
                
                keys.forEach(function(key) {
                    return result = result || product[key].toLowerCase().indexOf(userInput) >= 0
                });

                return result;
            });

        updateProductsTableView(filteredProducts);
    }
    else {
        refreshProductSearch();
    }
}

function refreshProductSearch() {
    document.getElementById('products-search-area').value = '';

    var products = Orders[currentOrderId - 1].products;

    updateProductsTableView(products);
}