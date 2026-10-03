const nav = ["Neg2", "Neg1", "0", "Pos1", "Pos2"]
const nav_color = ["Green", "Red"]

function init(){
    const card_form = document.getElementById('card_form')
    card_form.addEventListener('input', (e) => {card_input(e)})

    // const test_card = new Card()
}

function make_top(){
    let top = make_div(document.body, "top")

    make_text(top, "XYZ", "airport_code")
    make_text(top, "Turnto", "airport_name")

    let module = make_div(top, "module")
    make_img(module, "Images/Modules/Oil_Truck.png", "module")
    make_img(module, "Images/Modules/Ice_Breaks.png", "module")
    make_img(module, "Images/Modules/Ability_1.png", "module")

    content_test(top)
}
function make_square(){
    let square = make_div(document.body, "square")

    content_test(square)
}
function make_bottom(){
    let bottom = make_div(document.body, "bottom")

    content_test(bottom)
}
function make_card(){
    make_top()
    for (let i = 0; i < 3; i++) {
        make_square()
    }
    make_bottom()
}
function clear_all(){
    document.querySelectorAll(".top").forEach(el => el.remove());
    document.querySelectorAll(".square").forEach(el => el.remove());
    document.querySelectorAll(".bottom").forEach(el => el.remove());
}
function make_img(parent, src, class_name){
    let img = document.createElement("img")
    img.src = src
    img.classList.add(class_name)
    parent.appendChild(img)
}
function make_div(parent, class_name){
    let div = document.createElement("div")
    div.classList.add(class_name)
    parent.appendChild(div)
    return div
}
function make_text(parent, text, class_name){
    let span = document.createElement("span")
    span.textContent = text
    span.classList.add(class_name)
    parent.appendChild(span)
}
function content_test(parent){
    let airplane_area = make_div(parent, "airplane")
    for (let i = 0; i < 3; i++) {
        make_img(airplane_area, "Images/Airplane_icon.png", "airplane")
    }

    make_img(parent, "Images/Navigation/Navigation_Background.png", "navigation")
    for (let i = 0; i < 5; i++) {
        make_img(parent, "Images/Navigation/Navigation_"+nav_color[i%2]+"_"+nav[i]+".png", "navigation")
    }

    let future_area = make_div(parent, "future")
    for (let i = 0; i < 3; i++) {
        make_img(future_area, "Images/Future_Plane.png", "future")
    }
}


function card_input(e){


    update_preview()
}

function update_preview(){

}

function save_card() {

}

class Card {
    constructor(airport_code = '', airport_name = '', length = 5){
        this.airport_code = airport_code
        this.airport_name = airport_name
        this.length = length
        this.squares = new Array(length).fill(new Square())
    }

    from_json(json){

        return this
    }
}

class Square {
    constructor(airplanes = 0, future_planes = 0, steering = [0, 0], alarms = 0, penguins = 0) {
        this.airplanes = airplanes
        this.penguins = penguins
        this.future_planes = future_planes
        this.steering = steering
        this.alarms = alarms
    }
}