export const usernameValidator = username => {
    const usernameRegex = /^(?=.*?[0-9])[^\s@]+@[^\s@]+$/;
    return usernameRegex.test(username)
}

export const passwordValidator = password => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;
    return passwordRegex.test(password)
}