const nav = ["Neg2", "Neg1", "0", "Pos1", "Pos2"]
const top_color = ["green", "yellow", "red", "black"]
const modules = ["A", "B", "C", "D",
                        "5000", "Mute", "Rules", "Alarm", "Oil_Truck", "Headwind", "Tailwind", "Oil_Leak", "Real_Time", "Ice_Breaks", "Intern",
                        "Ability_1", "Ability_2"]
const squares = []
const cards = []
let html
const default_size = 16 // px

function init(){
    html = document.getElementsByTagName("html")[0]
    html.style.fontSize = default_size + "px"
}
function make_card(){
    cards.push(new Card())
}
function clear_all(){
    while(cards.length > 0){
        cards.pop().delete()
    }
}

function print_mode(){
    document.querySelectorAll('button, div.input_right, div.input_left, div.mod')
        .forEach(el => {el.style.display = 'none';})
    document.getElementsByTagName('html')[0].style.fontSize = '4mm'
    window.print()
    // window.addEventListener('focus', function() {
    //     // Add a slight delay to ensure the print process finishes
    //     setTimeout(function() {
    //         window.close();
    //     }, 500);
    // }, { once: true })
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
function make_label(parent, class_name, text){
    let label = document.createElement("label")
    if(class_name !== "") label.classList.add(class_name)
    label.textContent = text
    parent.appendChild(label)
    return label
}
function make_break(parent){
    parent.appendChild(document.createElement("br"))
}

class Card{
    constructor(size = 3) {
        this.squares = []
        this.card_area = make_div(document.body, "card")

        this.add_button =
            make_button(this.card_area, "", "Add Square!", () =>
                this.add_square())
        this.delete_button =
            make_button(this.card_area, "", "Delete Card!", () =>
            this.delete())

        this.print_button =
            make_button(this.card_area, "", "Print!", () =>
            this.print_mode())

        this.squares.push(new Top(this.card_area))
        for (let i = 1; i < size+1; i++) {
            this.squares.push(new Square(this.card_area, i))
        }
        this.squares.push(new Bottom(this.card_area))

        this.resizer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                this.resize(entry.contentRect)
            }
        });
        this.resizer.observe(this.card_area);
    }
    add_square(){
        let position = Number(this.card_area.lastElementChild.previousElementSibling.style.order) + 2
        let square = new Square(this.card_area, position)
        for (let i = 1; i < position; i++) {
            square.move_up()
        }
        this.squares.push(square)
    }
    delete(){
        this.card_area.remove()
    }
    print_mode(){
        document.querySelectorAll('button, div.input_right, div.input_left, div.mod')
            .forEach(el => {el.style.visibility = 'hidden';})
        document.getElementsByTagName('html')[0].style.fontSize = '5.2mm'
        setTimeout(() => window.print(), 100)
        this.resizer.unobserve(this.card_area);
        setTimeout(() => document.addEventListener('click', () => {this.design_mode()}, { once: true }), 500)


    }
    design_mode(){
        document.querySelectorAll('button, div.input_right, div.input_left, div.mod')
            .forEach(el => {el.style.visibility = 'visible';})
        this.resizer.observe(this.card_area);
    }
    resize(rect){
        let screen_height = window.innerHeight
        let screen_width = window.innerWidth
        let height_ratio = screen_height / rect.height
        let width_ratio = screen_width / rect.width
        console.log("screen width", screen_width, "width", rect.width)
        console.log("w:"+width_ratio +" h:"+height_ratio)
        let fontSize = Math.floor(parseFloat(html.style.fontSize) * Math.min(height_ratio, width_ratio))
        html.style.fontSize = fontSize+"px"
    }
}
class Square{
    constructor(parent, position){
        this.body = parent;
        this.main_area = make_div(this.body, "block")
        this.main_area.style.order = position
        this.square = make_div(this.main_area, "square")
        this.input_right = make_div(this.main_area, "input_right")
        this.form_right_inputs = make_div(this.input_right, "inputs")
        this.form_right_labels = make_div(this.input_right, "labels")
        this.form_right_steering = make_div(this.input_right, "steering")
        this.input_left = make_div(this.main_area, "input_left")

        this.content_setup(this.square)

        make_label(this.form_right_labels, "", "Airplane")
        this.input_airplane =
            make_input_number(this.form_right_inputs, "number", 0, 0, 6, () =>
                    this.update_number(this.airplane_area, this.input_airplane.value, "Images/Airplane.png", "airplane"))
        make_label(this.form_right_labels, "", "Penguin")
        this.input_penguins =
            make_input_number(this.form_right_inputs, "number", 0, 0, 6, () =>
                this.update_number(this.airplane_area, this.input_penguins.value, "Images/Penguin.png", "penguin"))
        make_label(this.form_right_labels, "", "Future")
        this.input_future =
            make_input_number(this.form_right_inputs, "number", 0, 0, 3, () =>
                this.update_number(this.future_area, this.input_future.value, "Images/Future_Plane.png", "future"))
        make_label(this.form_right_labels, "", "Alarm")
        this.input_alarm =
            make_input_number(this.form_right_inputs, "number", 0, 0, 2, () =>
                this.update_number(this.alarm_area, this.input_alarm.value, "Images/Alarm_Icon.png", "alarm"))
        make_label(this.form_right_steering, "", "Steering")
        make_break(this.form_right_steering)
        this.input_nav = new Array(5)
        for (let i = 0; i < 5; i++) {
            this.input_nav[i] = make_input_checkbox(this.form_right_steering, "navigation", false, () =>
            this.update_nav(this.input_nav[i].checked, this.nav_good[i], this.nav_bad[i]))
        }
        this.up_button =
            make_button(this.input_left, "left_button", "↑", () =>
                this.move_up())
        this.delete_button =
            make_button(this.input_left, "left_button", "x", () =>
                this.delete())
        this.down_button =
            make_button(this.input_left, "left_button", "↓", () =>
                this.move_down())
        squares.push(this)
    }
    update_number(parent, value, src, class_name){
        let items = parent.getElementsByClassName(class_name);
        for (let i = items.length; i < value; i++) {
            make_img(parent, src, class_name)
        }
        for (let i = items.length; i > value; i--) {
            items[0].remove()
        }
        parent.style.visibility = parent.childElementCount > 0 ? "visible" : "hidden"
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
        if(this.body.lastElementChild.previousElementSibling !== null){
            let position = Number(this.body.lastElementChild.previousElementSibling.style.order)
            for (let i = this.main_area.style.order; i < position; i++) {
                this.move_down()
            }
        }
        this.main_area.remove()
        squares.splice(squares.indexOf(this), 1)
    }
    move_up(){
        if(this.main_area.previousElementSibling === null) return
        this.main_area.previousElementSibling.style.order = String(Number(this.main_area.previousElementSibling.style.order) + 1)
        this.main_area.style.order = String(Number(this.main_area.style.order) - 1)
        this.main_area.previousElementSibling.before(this.main_area)
    }
    move_down(){
        if(this.main_area.nextElementSibling === null) return
        this.main_area.nextElementSibling.style.order = String(Number(this.main_area.nextElementSibling.style.order) - 1)
        this.main_area.style.order = String(Number(this.main_area.style.order) + 1)
        this.main_area.nextElementSibling.after(this.main_area)
    }
}
class Top extends Square{
    constructor(parent) {
        super(parent, 0);
        this.square.classList.replace("square", "top")
        this.square.classList.add(top_color[0])
        // this.form_right_etc = make_div(this.input_right, "etc")
        this.mod = make_div(this.main_area, "mod")
        this.form_right_color = make_div(this.input_right, "color")
        this.form_right_text = make_div(this.input_right, "text")
        this.extra_content_setup(this.square)

        this.input_code =
            make_input_text(this.form_right_text, "text", "Airport Code", () =>
                this.update_text(this.airport_code, this.input_code.value, "XXX"))
        this.input_name =
            make_input_text(this.form_right_text, "text", "Airport Name", () =>
                this.update_text(this.airport_name, this.input_name.value, "xxxxx"))
        this.input_color = new Array(4)
        for (let i = 0; i < 4; i++) {
            this.input_color[i] = make_input_radio(this.form_right_color, "color", top_color[i], "color", i === 0, () =>
                this.update_color(top_color[i], this.input_color[i].checked))
            this.input_color[i].style.borderColor = top_color[i]
            this.input_color[i].style.color = top_color[i]
        }
        this.input_module = new Array(modules.length)
        for (let i = 0; i < modules.length; i++) {
            this.input_module[i] = make_input_checkbox(this.mod, "module", false, () =>
            this.update_module(this.module[i], this.input_module[i].checked))
            this.input_module[i].style.backgroundImage = "url('" + "Images/Modules/"+modules[i]+".png" + "')"
        }
        this.input_module[4].style.width = "4rem"
        this.delete_button.style.visibility = "hidden"
        this.up_button.style.visibility = "hidden"
        this.down_button.style.visibility = "hidden"
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
    constructor(parent) {
        super(parent, 999);
        this.square.classList.replace("square", "bottom")
        this.delete_button.style.visibility = "hidden"
        this.up_button.style.visibility = "hidden"
        this.down_button.style.visibility = "hidden"
    }
}