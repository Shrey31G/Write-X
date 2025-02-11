import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";


export interface Post {
    "id": string,
    "title": string,
    "content": string,
    "author": {
        "name": string,
        "username": string
    }
}

export const usePost = ({ id }: { id: string }) => {

    const [post, setPost] = useState<Post>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {       
        axios.get(`${BACKEND_URL}api/v1/posts/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }}
        )
            .then(response => {
                setPost(response.data.post)
                setLoading(false)
            })
    }, [id])
    return {
        loading,
        post
    }
}

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${BACKEND_URL}api/v1/posts/feed`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setPosts(response.data.postAll)
                setLoading(false);
            })
    }, [])

    return {
        loading,
        posts
    }
}