import { useEffect, useState } from "react";
import PostEntity from "../../entities/posts/PostEntity";
import PostContainer from "../../components/post/PostContainer";

function Posts(){
    const [posts, setPosts] = useState<PostEntity[]>([]);

    const fetchPosts = async () => {
        const retrievedPosts = await fetch('http://localhost:8000/post');
        return await retrievedPosts.json();
    }

    useEffect(function(){
        fetchPosts().then((data) => {
            console.log(data);
            data.entity.forEach((post: PostEntity) => {
                // posts.push(post);
                setPosts(posts.concat(post))
            })
        })
    }, []);
    return (
        <>
            <h1>Posts</h1>
            <div className="flex">
                {posts.map(post => <PostContainer key={post.id} id={0} title={null} content={null} created_at={null} updated_at={null}/>)}
            </div>
        </>
    )
}

export default Posts;