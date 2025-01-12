const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select"); // selecting both dropdowns
const btn = document.querySelector("form > input"); // selecting input submit button

// Creating <option> elements in both dropdowns for each currency.
for (let select of dropdowns) {
    for (let currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerHTML = currencyCode;
        newOption.value = currencyCode;
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currencyCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption); // appending the created <option> element
    }

    // Adding event listener which is trigerred when a currency is selected by the user from the dropdown
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

// function to update the flag based on the selected currency
function updateFlag(element) {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // creating the flag API link
    element.parentElement.querySelector("img").src = newSrc; // Adding flag API link to the image's src attribute
}

// Updating the exchange value based on the amount that the user has entered
async function updateExchangeRate() {
    let amount = document.querySelector(".amount > input").value; // getting the amount the user has entered
    // if user entered nothing or -ve value then set the amount as 1
    if (amount === "" || amount < 1) {
        amount = 1;
        document.querySelector(".amount > input").value = "1";
    }

    // Creating base url of the currency API
    const fromCurrency = document.querySelector(".from select").value;
    const toCurrency = document.querySelector(".to select").value;
    const url = `${BASE_URL}/${fromCurrency.toLowerCase()}.json`;

    // Getting the exchange rate value
    let response = await fetch(url); // fetching response from the API
    let data = await response.json(); // converting the json into Javascript object
    let exchangeValue =
        data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];

    // Showing the exchange value based on the amount the user has entered
    const msgElement = document.querySelector("form > .msg");
    msgElement.innerHTML = `${amount} ${fromCurrency} = ${
        exchangeValue * amount
    } ${toCurrency}`;
}

// Adding event listener to the submit button
btn.addEventListener("click", (event) => {
    event.preventDefault(); // prevent default behaviour of form submission
    updateExchangeRate(); // updating the exchange value when submit button is click
});

// Updating the exchange rate value when browser window is loaded
window.addEventListener("load", async () => {
    updateExchangeRate();
});
