import axios from "axios"

const url = process.env.REACT_APP_HOST

export const Post = async(endpoint,input) => {
    const {data} = await axios.post( url+endpoint, input)

    return data
}

export const Login = async(input) => {
    const {data} = await axios.post(`${url}/login`,input)

    return data
}

export const SignUp = async(input) => {
    const {data} = await axios.post(`${url}/register`,input)

    return data
}

export const getEducators = async () => {
    const {data} = await axios.get(`${url}/educators`)

    return data
}

export const getQuizzes = async () => {
    const {data} = await axios.get(`${url}/quiz`)

    return data
}

export const getQuiz = async (quiz_id) => {
    const {data} = await axios.get(`${url}/quiz/${quiz_id}`)

    return data
}