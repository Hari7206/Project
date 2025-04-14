
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdown = document.querySelectorAll(".drop-down select")
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");




for (let select of dropdown) {
    for ( Currcode in countryList) {
        let newOption = document.createElement("option"); //
        newOption.innerText = Currcode;
        newOption.value = Currcode;

        if (select.name === "from" && Currcode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && Currcode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption)
    
    }
    select.addEventListener("change" , (evt) => {
            updateflag(evt.target);
    });
}

const updateExchangerate = async () => {
    let amount = document.querySelector(".amount input")
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }
    const URL  = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await  fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amtval * rate;
    msg.innerText = `${amtval}  ${fromCurr.value}  = ${finalAmount} ${toCurr.value}`
};
   

const updateflag = (element) => {
    let Currcode = element.value;
    let countryCode = countryList[Currcode];  
    let newSrc =  `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click" ,  (evt) => {
    evt.preventDefault();
    updateExchangerate();
});
window.addEventListener("load" , () => {
    updateExchangerate();
});
