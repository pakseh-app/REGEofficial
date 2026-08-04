import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    arrayUnion,
    arrayRemove,
    increment
} from "firebase/firestore";

import { db } from "../services/firebase.js";

// =====================================
// COLLECTION
// =====================================

const postsRef = collection(db, "posts");

// =====================================
// GET POSTS
// =====================================

export async function getPosts() {

    const q = query(

        postsRef,

        orderBy("time", "desc")

    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(item => ({

        id: item.id,

        ...item.data()

    }));

}

// =====================================
// GET POST
// =====================================

export async function getPost(id) {

    const snapshot = await getDoc(

        doc(db, "posts", id)

    );

    if (!snapshot.exists()) {

        return null;

    }

    return {

        id: snapshot.id,

        ...snapshot.data()

    };

}

// =====================================
// ADD POST
// =====================================

export async function addPost(post) {

    if (!post.uid) {

        throw new Error("UID kosong saat membuat posting.");

    }

    const docRef = await addDoc(

        postsRef,

        {

            uid: post.uid,

            name: post.name,

            avatar: post.avatar,

            caption: post.caption,

            image: post.image,

            createdAt: Date.now(),

            time: Date.now(),

            likes: 0,

            likedBy: [],

            comments: []

        }

    );

    return docRef.id;

}

// =====================================
// UPDATE POST
// =====================================

export async function updatePost(id, data) {

    await updateDoc(

        doc(db, "posts", id),

        data

    );

}

// =====================================
// DELETE POST
// =====================================

export async function deletePost(id) {

    await deleteDoc(

        doc(db, "posts", id)

    );

}

// =====================================
// LIKE
// =====================================

export async function likePost(postId, uid) {

    await updateDoc(

        doc(db, "posts", postId),

        {

            likes: increment(1),

            likedBy: arrayUnion(uid)

        }

    );

}

// =====================================
// UNLIKE
// =====================================

export async function unlikePost(postId, uid) {

    await updateDoc(

        doc(db, "posts", postId),

        {

            likes: increment(-1),

            likedBy: arrayRemove(uid)

        }

    );

}

// =====================================
// COMMENT
// =====================================

export async function addComment(postId, comment) {

    const newComment = {

        id: crypto.randomUUID(),

        uid: comment.uid,

        text: comment.text,

        time: comment.time,

        likes: 0,

        likedBy: [],

        replies: []

    };

    await updateDoc(

        doc(db, "posts", postId),

        {

            comments: arrayUnion(newComment)

        }

    );

}

// =====================================
// UPDATE SEMUA POST MILIK USER
// =====================================

export async function updateUserPosts(uid, data) {

    const snapshot = await getDocs(postsRef);

    const jobs = [];

    snapshot.forEach((item) => {

        const post = item.data();

        if (post.uid === uid) {

            jobs.push(

                updateDoc(

                    doc(db, "posts", item.id),

                    data

                )

            );

        }

    });

    await Promise.all(jobs);

}