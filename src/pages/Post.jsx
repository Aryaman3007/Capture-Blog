import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configure";
import Button from "../components/Button";
import Container from "../components/container/Container";
import parse from "html-react-parser";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    {/**const userData = useSelector((state) => state.auth.userData);**/}

    {/**const isAuthor = post && userData ? post.$id == userData.userId : false;**/}

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.image);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2 h-80 border-0">
                    <img
                        src={appwriteService.getFilePreview(post.image)}
                        alt={post.title}
                        className="rounded-xl w-90"
                    />


                    <div className="absolute">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>


                </div>
                <div className="w-full mb-6 justify-center items-center flex px-40 text-slate-900">
                    <h1 className="text-4xl font-bold">{post.title}</h1>
                </div>
                <div className="text-lg font-semibold font-poppins browser-css justify-center items-center flex px-40 text-slate-900">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}