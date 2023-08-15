const emailMatch = /[^@\t\r\n]+@[^@\t\r\n]+\.[^@\t\r\n]+/;

const usernameMatch = /^[a-z0-9_-]{3,15}$/;

const passwordMatch = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const RegExHelper = {
    emailMatch,
    usernameMatch,
    passwordMatch
}