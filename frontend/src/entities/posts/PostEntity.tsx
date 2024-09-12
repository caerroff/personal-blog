interface PostEntity {
    id: number;
    title: string | null;
    content: string | null;
    created_at: Date | null;
    updated_at: Date | null;
} 

export default PostEntity;