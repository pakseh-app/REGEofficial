import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    doc,
    updateDoc,
    increment,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";

import { db } from "../services/firebase.js";

// =====================================
// COLLECTION
// =====================================

function commentsRef(postId) {

    return collection(

        db,

        "posts",

        postId,

        "comments"

    );

}

// =====================================
// GET COMMENTS
// =====================================

export async function getComments(postId) {

    const q = query(

        commentsRef(postId),

        orderBy("time", "asc")

    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(item => ({

        id: item.id,

        ...item.data()

    }));

}

// =====================================
// ADD COMMENT
// =====================================

export async function addComment(postId, comment) {

    await addDoc(

        commentsRef(postId),

        {

            uid: comment.uid,

            text: comment.text,

            time: comment.time,

            likes: 0,

            likedBy: [],

            replies: []

        }

    );

}

// =====================================
// LIKE COMMENT
// =====================================

export async function likeComment(

    postId,

    commentId,

    uid

) {

    await updateDoc(

        doc(

            db,

            "posts",

            postId,

            "comments",

            commentId

        ),

        {

            likes: increment(1),

            likedBy: arrayUnion(uid)

        }

    );

}

// =====================================
// UNLIKE COMMENT
// =====================================

export async function unlikeComment(

    postId,

    commentId,

    uid

) {

    await updateDoc(

        doc(

            db,

            "posts",

            postId,

            "comments",

            commentId

        ),

        {

            likes: increment(-1),

            likedBy: arrayRemove(uid)

        }

    );

}