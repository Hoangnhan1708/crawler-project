import Business from "./business.js";
import UI from "./ui.js";

const business = new Business()
const ui = new UI()
const searchInput = document.querySelector("#search__input")

ui.loadAllConferences(business)
searchInput.oninput =  () => {
    ui.loadAllSearchedConferences(business,searchInput.value)
    if(searchInput.value == ""){
        ui.loadAllConferences(business)
    }
}



