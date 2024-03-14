
const errPages = {
    PAGE_NOT_FOUND: {
        icon: "bx bx-error-alt",
        color: "#DC3545",
        main_mess: "404-Page not found",
        second_mess: "Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable"
    },
    INVALID_INVITE: {
        icon: "bx bx-link",
        color: "#FFFF",
        main_mess: "Invalid Invite",
        second_mess: "The invitation appears to have expired or you do not have permission to join"
    },
    INVITE_SUCCESS: {
        icon: 'bx bx-check',
        color: '#28A745',
        main_mess: "Invite success",
        second_mess: "Now that you have access to the timetable, go back to the home page to access it"
    },
    SERVER_ERROR: {
        icon: "bx bx-error-alt",
        color: "#DC3545",
        main_mess: "500-Sorry, it's me, not you.",
        second_mess: "Let me try again!"
    }
}

module.exports = errPages;