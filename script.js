// alert('Hello!')

// confirm('Вы учите JS')

// let a = 5
// a = 7
// const b = 12

//const skill = document.getElementById("skill")
//const is_love = document.getElementById("is_love")
//const string = document.getElementById("string")

// console.log(skill)
// console.log(skill.innerText)

// const skill_text = prompt("Какой язык вы учите?", "Пока не в курсе")
// const is_love_value = confirm("Любите ли вы этот язык?")

// skill.innerText = skill_text
// is_love.innerText = is_love_value

//string.innerHTML = "str


//STRING
// const str1 = 'Greeting'
// const str2 = 'Text'
// const str3 = `I'm Say:\n ${str1}`
// console.log(str1)
// console.log(str2)
// console.log(str3)

//NUMBER
// const num1 = 75
// const num2 = 79*9
// const rem = 7 + 8 + '5'
// console.log(rem)
// alert(num1 + 15)
// alert(num2)

//BIGINT
//const bigint = 1124242n

//BOOLEAN
// const bool = 10 > 5
// console.log(bool)

//NULL
// let empty = null
// console.log(typeof empty)

// //UNDEFINED
// let box = undefined
// console.log(box, typeof box)

//SYMBOL
// const uniq = Symbol('id')
// console.log(uniq)

//OBJECT
// const object = {
//     name : "Gregory",
//     age : 19,
//     is_happy : true,
// }
// console.log(object.name)

// const username = prompt('Who are you?', 'Anon')
// if (username == 'Admin') {
//     alert('Hello, master!')
// } else if (!username || username === 'Anon') {
//     alert('I dont know you...')
// } else {
//     alert(`Hello, ${username}`)
// }

// const counts = prompt("how much do you want to calc?")
// let i = 0
// do {
//     console.log(i++)
// } while (i <= counts)

// const arr = []
// for (let i = 1; i <= 50; i++) {
//     arr.push(i)
// }
//
// const new_arr = []
// let elem
// for (elem of arr) {
//     if (!(elem % 4)) {
//         new_arr.push(elem)
//     }
// }
// console.log(new_arr)

// const obj = {
//     name: 'Gregory',
//     age: 19,
//     city: 'Moscow'
// }
//
// let key
// for (key in obj) {
//     console.log(key)
//     console.log(obj[key])
// }


//FUNCTION
//declaration
// function scream() {
//     alert("AAAAAAAAAAA")
// }
// //expression
// const wow = function () {
//     alert("WOOOOW")
//     return 0
// }
// //arrow
// const arrow = () => {
//     alert("arrow!!")
// }


//Game
const game_elements = document.getElementById("my_game").children
const title = game_elements[0]
const user_task = game_elements[1]
const user_answer = game_elements[2]
const button_game = game_elements[3]

const game_state = {
    task_in_process: false,
    right_answer: null
}

const get_random_num_in_range = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(0)
}

const get_task = () => {
    const symbol = (get_random_num_in_range(0, 1) > 0.5 ? "+" : "-")
    const task = `${get_random_num_in_range(0, 100)} ${symbol} ${get_random_num_in_range(0, 100)}`
    game_state.right_answer = eval(task)
    return task
}

const start_game_funk = () => {
    if (!game_state.task_in_process) {
        user_answer.value = null
        title.innerText = "The game is started!"
        user_task.innerText = get_task()
        user_answer.hidden = false
        button_game.innerText = "Check"
        game_state.task_in_process = true
    } else {
        const is_right = game_state.right_answer === +user_answer.value
        user_task.innerText = user_task.innerText + " = " + game_state.right_answer
        title.innerText = (is_right ? "You won!" : "You lose!")
        button_game.innerText = "Play again?"
        game_state.task_in_process = false
    }
}
button_game.addEventListener("click", start_game_funk)
user_answer.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        start_game_funk()
    } else if (e.key === "Escape") {
        user_answer.blur()
    }
})
//Game(end)

//Game2
const chosen_el = document.querySelectorAll(".choose_block_container > div")
const counter_el = document.querySelector(".choose_block span")

// const chosen_state = {
//     count_el: 0,
// }
// const change_counter = (value) => {
//     chosen_state.count_el += value
//     counter_el.innerText = chosen_state.count_el
// }

const chosen_state = {
    count_el: 0,
    change_counter(value) {
        this.count_el += value
        counter_el.innerText = this.count_el
    }
}

const event_funk = (e) => {
    if (e.target.className === "") {
        e.target.className = 'chosen_element'
        chosen_state.change_counter(1)
    } else {
        e.target.className = ''
        chosen_state.change_counter(-1)
    }
}

for (let i = 0; i < chosen_el.length; i++) {
    chosen_el[i].addEventListener("click", event_funk)
}