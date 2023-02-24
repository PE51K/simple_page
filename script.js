//Game
{
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
}

//Game2
{
    const chosen_el = document.querySelectorAll(".choose_block_container > div")
    const counter_el = document.querySelector(".choose_block span")

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
}

//Blog
{
    const posts_block = document.querySelector(".post_block_container")
    const show_posts_button = document.querySelector(".show_posts_btn")

    function add_post(title, body) {
        const posts_title = document.createElement("h3")
        const posts_body = document.createElement("span")
        const post_item = document.createElement("p")

        posts_title.innerText = title
        posts_body.innerText = body

        posts_block.append(post_item)
        post_item.append(posts_title, posts_body)
    }

    function get_posts() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((res) => res.json())
            .then(data => {
                for (const el of data) {
                    add_post(el.title, el.body)
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    // function create_post(title, body, user_id) {
    //     fetch('https://jsonplaceholder.typicode.com/posts', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             title,
    //             body,
    //             user_id,
    //         }),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     })
    //         .then((res) => {
    //             console.log(res)
    //             return res.json()
    //         })
    //         .catch((err) => {
    //             console.log(err.message)
    //         })
    // }

    show_posts_button.onclick = () => {
        show_posts_button.className = "clicked_show_button"
        get_posts()
    }
}