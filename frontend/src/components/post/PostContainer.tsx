import PostEntity from "../../entities/posts/PostEntity";

function PostContainer(props: PostEntity){

    
    return(
        <div className="card">
            <h1>Hi</h1>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
        </div>
    )
}

export default PostContainer;