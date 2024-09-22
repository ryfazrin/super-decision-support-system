// src/components/SomeComponent.jsx
import { useQuery } from 'react-query';
import axiosInstance from '../lib/axiosInstance';

const fetchPosts = async () => {
    const { data } = await axiosInstance.get('/posts');
    return data;
};

function PostsComponent() {
    const { data, error, isLoading } = useQuery('posts', fetchPosts);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <div>
            {data.map(post => (
                <p key={post.id}>{post.title}</p>
            ))}
        </div>
    );
}

export default PostsComponent;
