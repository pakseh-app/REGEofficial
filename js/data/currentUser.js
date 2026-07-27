export let currentUser = {

    id: "",

    fullName: "",

    username: "",

    phone: "",

    avatar: "assets/default-avatar.png",

    bio: "Selamat datang di REGE Official 🚀",

    jabatan: "Anggota",

    role: "Member",

    hadir: 0,

    tidakHadir: 0,

    terlambat: 0

};

export function setCurrentUser(user){

    currentUser = {

        ...user

    };

}

export function saveCurrentUser(){

    localStorage.setItem(

        "currentUser",

        JSON.stringify(currentUser)

    );

}

export function loadCurrentUser(){

    const data = localStorage.getItem("currentUser");

    if(data){

        currentUser = JSON.parse(data);

    }

}