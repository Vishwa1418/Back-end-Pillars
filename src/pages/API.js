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

export const getUserdata = async () => {
    let token = sessionStorage.getItem('API_Key');
    token = JSON.parse(token);
    const { data } = await axios.get(`${url}/user?apikey=${token}`)
    
    return data;
  };

export const getEducators = async () => {
    let token = sessionStorage.getItem('API_Key');
    token = JSON.parse(token);
    console.log(`${url}/educators?apikey=${token}`)
    const { data } = await axios.get(`${url}/educators?apikey=${token}`)
    
    return data;
  };
  

export const getQuizzes = async () => {
    let token = sessionStorage.getItem('API_Key');
    token = JSON.parse(token);
    const {data} = await axios.get(`${url}/quiz?apikey=${token}`)

    return data
}

export const getQuiz = async (quiz_id) => {
    let token = sessionStorage.getItem('API_Key');
    token = JSON.parse(token);
    const {data} = await axios.get(`${url}/quiz/${quiz_id}?apikey=${token}`)

    return data
}

export const getSuccessstories = async (quiz_id) => {
    let token = sessionStorage.getItem('API_Key');
    token = JSON.parse(token);
    const {data} = await axios.get(`${url}/successstories?apikey=${token}`)

    return data
}