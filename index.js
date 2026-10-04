const nav = ["Neg2", "Neg1", "0", "Pos1", "Pos2"]
const top_color = ["green", "yellow", "red", "black"]
const modules = ["A", "B", "C", "D", "5000", "Mute", "Rules", "Alarm", "Headwind", "Tailwind", "Oil_Leak", "Intern", "Real_Time", "Oil_Truck", "Ice_Breaks", "Ability_1", "Ability_2"]
const squares = []

function init(){

}
function make_square(){
    let position = Number(document.body.lastElementChild.previousElementSibling.style.order) + 2
    let square = new Square(position)
    for (let i = 0; i < position; i++) {
        square.move_up()
    }
    squares.push(square)
}
function make_card(){
    squares.push(new Top())
    for (let i = 0; i < 3; i++) {
        squares.push(new Square(i))
    }
    squares.push(new Bottom())
}
function clear_all(){
    while(squares.length > 0){
        squares[0].delete()
    }
}
function save_card(){

}

function make_img(parent, src, class_name){
    let img = document.createElement("img")
    img.src = src
    if(class_name !== "") img.classList.add(class_name)
    parent.appendChild(img)
    return img
}
function make_div(parent, class_name){
    let div = document.createElement("div")
    if(class_name !== "") div.classList.add(class_name)
    parent.appendChild(div)
    return div
}
function make_text(parent, text, class_name){
    let span = document.createElement("span")
    span.textContent = text
    if(class_name !== "") span.classList.add(class_name)
    parent.appendChild(span)
    return span
}
function make_input_number(parent, class_name, value, min, max, onInput){
    let input = document.createElement("input")
    if(class_name !== "") input.classList.add(class_name)
    input.type = "number"
    input.value = String(value)
    input.min = String(min)
    input.max = String(max)
    input.addEventListener("input", (e) => {onInput()})
    parent.appendChild(input)
    return input
}
function make_input_text(parent, class_name, placeholder, onInput){
    let input = document.createElement("input")
    if(class_name !== "") input.classList.add(class_name)
    input.type = "text"
    input.placeholder = placeholder
    input.addEventListener("input", (e) => {onInput()})
    parent.appendChild(input)
    return input
}
function make_input_checkbox(parent, class_name, checked, onInput){
    let input = document.createElement("input")
    if(class_name !== "") input.classList.add(class_name)
    input.type = "checkbox"
    input.checked = checked
    input.addEventListener("input", (e) => {onInput()})
    parent.appendChild(input)
    return input
}
function make_input_radio(parent, class_name, value, name, checked, onInput){
    let input = document.createElement("input")
    if(class_name !== "") input.classList.add(class_name)
    input.type = "radio"
    input.value = value
    input.name = name
    input.checked = checked
    input.addEventListener("input", (e) => {onInput()})
    parent.appendChild(input)
    return input
}
function make_button(parent, class_name, text, onClick){
    let button = document.createElement("button")
    if(class_name !== "") button.classList.add(class_name)
    button.textContent = text
    button.addEventListener("click", (e) => {onClick()})
    parent.appendChild(button)
    return button
}

class Square{
    constructor(position){
        this.main_area = make_div(document.body, "block")
        this.main_area.style.order = position
        this.square = make_div(this.main_area, "square")
        this.form = make_div(this.main_area)

        this.content_setup(this.square)

        this.input_airplane =
            make_input_number(this.form, "", 0, 0, 6, () =>
                    this.update_number(this.airplane_area, this.input_airplane.value, "Images/Airplane.png", "airplane"))
        this.input_future =
            make_input_number(this.form, "", 0, 0, 3, () =>
                this.update_number(this.future_area, this.input_future.value, "Images/Future_Plane.png", "future"))
        this.input_alarm =
            make_input_number(this.form, "", 0, 0, 2, () =>
                this.update_number(this.alarm_area, this.input_alarm.value, "Images/Alarm_Icon.png", "alarm"))
        this.input_nav = new Array(5)
        for (let i = 0; i < 5; i++) {
            this.input_nav[i] = make_input_checkbox(this.form, "", false, () =>
            this.update_nav(this.input_nav[i].checked, this.nav_good[i], this.nav_bad[i]))
        }
        this.delete_button =
            make_button(this.form, "", "Delete", () =>
                this.delete())
        this.up_button =
            make_button(this.form, "", "Up", () =>
                this.move_up())
        this.down_button =
            make_button(this.form, "", "Down", () =>
                this.move_down())
        squares.push(this)
    }
    update_number(parent, value, src, class_name){
        for (let i = parent.childElementCount; i < value; i++) {
            make_img(parent, src, class_name)
        }
        for (let i = parent.childElementCount; i > value; i--) {
            parent.lastElementChild.remove()
        }
        parent.style.visibility = value > 0 ? "visible" : "hidden"
    }
    update_nav(value, yes, no){
        if (value === false){
            yes.style.visibility = "visible"
            no.style.visibility = "hidden"
        }
        else{
            yes.style.visibility = "hidden"
            no.style.visibility = "visible"
        }
        this.update_nav_background()
    }
    update_nav_background(){
        let visible = false;
        for (let i = 0; i < 5; i++) {
            if(this.input_nav[i].checked){
                this.nav_background.style.visibility = "visible"
                visible = true;
                break;
            }
        }
        if (visible === false){
            this.nav_background.style.visibility = "hidden"
            for (let i = 0; i < 5; i++) {
                this.nav_good[i].style.visibility = "hidden"
                this.nav_bad[i].style.visibility = "hidden"
            }
        }
        if (visible === true){
            for (let i = 0; i < 5; i++) {
                if(this.nav_good[i].style.visibility !== "visible" && this.nav_bad[i].style.visibility !== "visible"){
                    this.nav_good[i].style.visibility = "visible"
                }
            }
        }
    }
    content_setup(parent){
        this.airplane_area = make_div(parent, "airplane")
        this.alarm_area = make_div(parent, "alarm")
        this.future_area = make_div(parent, "future")

        this.nav_background = make_img(parent, "Images/Navigation/Navigation_Background.png", "navigation")
        this.nav_good = new Array(5)
        this.nav_bad = new Array(5)
        for (let i = 0; i < 5; i++) {
            this.nav_good[i] = make_img(parent, "Images/Navigation/Navigation_Green_"+nav[i]+".png", "navigation")
            this.nav_bad[i] = make_img(parent, "Images/Navigation/Navigation_Red_"+nav[i]+".png", "navigation")
        }
    }
    delete(){
        this.main_area.remove()
        squares.splice(squares.indexOf(this), 1)
    }
    move_up(){
        this.main_area.previousElementSibling.style.order = String(Number(this.main_area.previousElementSibling.style.order) + 1)
        this.main_area.style.order = String(Number(this.main_area.style.order) - 1)
        this.main_area.previousElementSibling.before(this.main_area)
        // this.update_buttons()
    }
    move_down(){
        this.main_area.nextElementSibling.style.order = String(Number(this.main_area.nextElementSibling.style.order) - 1)
        this.main_area.style.order = String(Number(this.main_area.style.order) + 1)
        this.main_area.nextElementSibling.after(this.main_area)
        // this.update_buttons()
    }
    update_buttons(){
        this.up_button.style.visibility = this.main_area.previousElementSibling.classList.contains("top") ? "hidden" : "visible"
        this.down_button.style.visibility = this.main_area.nextElementSibling.classList.contains("bottom") ? "hidden" : "visible"
    }
}
class Top extends Square{
    constructor() {
        super(-1);
        this.square.classList.replace("square", "top")
        this.square.classList.add(top_color[0])
        //     make_img(module, "Images/Modules/"+modules[Math.floor(Math.random()*modules.length)]+".png", "module")
        this.extra_content_setup(this.square)

        this.input_code =
            make_input_text(this.form, "", "Airport Code", () =>
                this.update_text(this.airport_code, this.input_code.value, "XXX"))
        this.input_name =
            make_input_text(this.form, "", "Airport Name", () =>
                this.update_text(this.airport_name, this.input_name.value, "xxxxx"))
        this.input_color = new Array(4)
        for (let i = 0; i < 4; i++) {
            this.input_color[i] = make_input_radio(this.form, "", top_color[i], "color", i === 0, () =>
                this.update_color(top_color[i], this.input_color[i].checked))
        }
        this.input_module = new Array(modules.length)
        for (let i = 0; i < modules.length; i++) {
            this.input_module[i] = make_input_checkbox(this.form, "", false, () =>
            this.update_module(this.module[i], this.input_module[i].checked))
        }
        this.delete_button.remove()
        this.up_button.remove()
        this.down_button.remove()
    }
    update_text(text, value, placeholder){
        text.textContent = value ? value : placeholder
    }
    update_module(module, value){
        module.style.display = value ? "block" : "none";
    }
    update_color(color, value){
        if (value){
            for (let i = 0; i < 4; i++) {
                this.square.classList.remove(top_color[i])
            }
            this.square.classList.add(color)
        }
    }
    extra_content_setup(parent){
        this.airport_code = make_text(parent, "XXX", "airport_code")
        this.airport_name = make_text(parent, "xxxxx", "airport_name")
        this.module_area = make_div(parent, "module")

        this.module = new Array(modules.length)
        for (let i = 0; i < modules.length; i++) {
            this.module[i] = make_img(this.module_area, "Images/Modules/"+modules[i]+".png", "module")
        }
    }
}
class Bottom extends Square{
    constructor() {
        super(999);
        this.square.classList.replace("square", "bottom")
        this.delete_button.remove()
        this.up_button.remove()
        this.down_button.remove()
    }
}