import { useParams } from "react-router-dom"
import { usePost } from "../hooks";
import { FullPost } from "../components/FullPost";


export const SinglePost = () => {
    const { id } = useParams();
    const { loading, post } = usePost({
        id: id || ""
    })
    return (
        <>
            <FullPost post={post} loading={loading} />
        </>
    )
}