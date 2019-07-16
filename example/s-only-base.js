const skrfx = require("../lib").default

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
            [EVENT_SUBMIT]: STATE_LOADING,
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
            [EVENT_VIEW]: STATE_PROFILE,
            [EVENT_LOGOUT]: STATE_LOGIN_FORM,
        },
    },
    [STATE_ERROR]: {
        actions: {
            [EVENT_RETRY]: STATE_LOADING,
        }
    }
}

const e = skrfx(config, STATE_LOGIN_FORM)

console.log(e.Action(EVENT_RETRY).State())
console.log(e.Action(EVENT_SUBMIT).State())
console.log(e.Action(EVENT_SUBMIT).State())
console.log(e.Action(EVENT_FAILURE).State())
console.log(e.Action(EVENT_SUBMIT).State())
console.log(e.Action(EVENT_RETRY).State())
console.log(e.Action(EVENT_SUCCESS).State())
console.log(e.Action(EVENT_VIEW).State())
console.log(e.Action(EVENT_LOGOUT).State())
