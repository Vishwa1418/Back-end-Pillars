import axios from "axios"

const url = process.env.REACT_APP_HOST

export const Post = async(endpoint,input) => {
    const {data} = await axios.post( url+endpoint, input)

    return data
}

export const Get = async(input) => {
    const {data} = await axios.get(`${url}/login`,input)

    return data
}
