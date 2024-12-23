import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import {v2 as cloudinary} from 'cloudinary';


export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!text && !img) {
            return res.status(404).json({ error: "Post must have text or image" });
        }
        if(img){
            const uploadResult = await cloudinary.uploader.upload(img);
            img = uploadResult.secure_url;
        }
        const newPost = new Post({
            user: userId,
            text,
            img,
            createdAt: new Date()
        });

        await newPost.save();
        return res.status(201).json(newPost);
    } catch (error) {
         console.log("Error in createPost controller", error);
         res.status(500).json({ error: "Internal server error" });
    }
}

export const deletePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if(post.user.toString() !== req.user._id.toString()){
            return res.status(401).json({ error: "Unauthorized, you can only delete your own posts" });
        }
        if(post.img){
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log("Error in deletePost controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
}