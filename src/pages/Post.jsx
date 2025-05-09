import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Container, Button } from '../components/import.js';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

const Post = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState();
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? userData.$id === post.userid : false;

    useEffect(() => {
        if (slug) {
            // console.log(slug);

            service.getPost(slug).then((fetchedPost) => {
                // console.log(fetchedPost);

                if (fetchedPost) {
                    setPost(fetchedPost);
                    if (fetchedPost.featuredImg) {
                        // console.log(fetchedPost.featuredImg);

                        service.getFilePreview(fetchedPost.featuredImg).then((urlObj) => {

                            setImageUrl(urlObj);
                            // console.log("Fetched url in single post:", urlObj);
                        });

                    }
                } else {
                    navigate('/');
                }
                setLoading(false);
            });
        } else {
            navigate('/');
        }


    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImg);
                navigate('/');
            }
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="rounded-xl"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gray-500 flex justify-center items-center">
                            <span className="text-white">No Image Available</span>
                        </div>
                    )}

                    {isAuthor && (
                        <div className="right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button className="bg-cyan-300 text-white px-6 py-2 hover:shadow-md m-2 cursor-pointer">
                                    Edit
                                </button>
                            </Link>
                            <button
                                className="bg-cyan-300 text-white px-6 py-2 hover:shadow-md m-2 cursor-pointer"
                                onClick={deletePost}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
};

export default Post;
