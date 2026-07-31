import {
    collection,
    doc,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    increment,
    query,
    orderBy,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../services/firebase.js";

// ======================================
// COLLECTION
// ======================================

const postsRef = collection(db, "posts");

// ======================================
// GET ALL POSTS
// ======================================

export async function getPosts() {

    const q = query(
        postsRef,
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}

// ======================================
// GET POST
// ======================================

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

// ======================================
// ADD POST
// ======================================

export async function addPost(post) {

    if (!post.uid) {

        throw new Error("UID posting kosong.");

    }

    const docRef = await addDoc(

        postsRef,

        {

            uid: post.uid,

            memberId: post.memberId,

            name: post.name,

            avatar: post.avatar,

            caption: post.caption,

            image: post.image,

            likes: 0,

            likedBy: [],

            comments: [],

            isMe: true,

            createdAt: serverTimestamp()

        }

    );

    return docRef.id;

}

// ======================================
// UPDATE POST
// ======================================

export async function updatePost(id, data) {

    await updateDoc(

        doc(db, "posts", id),

        data

    );

}

// ======================================
// DELETE POST
// ======================================

export async function deletePost(id) {

    await deleteDoc(

        doc(db, "posts", id)

    );

}

// ======================================
// LIKE
// ======================================

export async function likePost(postId, uid) {

    await updateDoc(

        doc(db, "posts", postId),

        {

            likes: increment(1),

            likedBy: arrayUnion(uid)

        }

    );

}

// ======================================
// UNLIKE
// ======================================

export async function unlikePost(postId, uid) {

    await updateDoc(

        doc(db, "posts", postId),

        {

            likes: increment(-1),

            likedBy: arrayRemove(uid)

        }

    );

}

// ======================================
// COMMENT
// ======================================

export async function addComment(postId, comment) {

    await updateDoc(

        doc(db, "posts", postId),

        {

            comments: arrayUnion(comment)

        }

    );

}