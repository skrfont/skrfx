const skrfx = require("../lib").default
import sleep from "./sleep"

const STATE_LOGIN_FORM = "login form"
const STATE_LOADING = "loading"
const STATE_PROFILE = "profile"
const STATE_ERROR = "error"

const EVENT_SUBMIT = "submit"
const EVENT_SUCCESS = "success"
const EVENT_FAILURE = "failure"
const EVENT_VIEW = "viewProfile"
const EVENT_LOGOUT = "logout"
const EVENT_RETRY = "tryAgain"

const config = {
    [STATE_LOGIN_FORM]: {
        actions: {
            [EVENT_SUBMIT]: (set) => {
                set(STATE_LOADING)
                setTimeout(() => {
                    set(Math.random() < 0.3 ? EVENT_SUCCESS : EVENT_FAILURE)
                }, 300)
            },
        },
    },
    [STATE_LOADING]: {
        actions: {
            [EVENT_SUCCESS]: STATE_PROFILE,
            [EVENT_FAILURE]: STATE_ERROR,
        },
    },
    [STATE_PROFILE]: {
        actions: {
            [EVENT_LOGOUT]: STATE_LOGIN_FORM,
        },
    },
    [STATE_ERROR]: {
        actions: {
            [EVENT_SUBMIT]: STATE_LOADING,
        }
    }
}

const e = skrfx(config, STATE_LOGIN_FORM)

console.log(e.Action(EVENT_SUBMIT).State())
console.log(e.Action(EVENT_SUBMIT).State())
await sleep(320)