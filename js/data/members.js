const defaultMembers = [

    {

        id: "RG001",

        fullName: "Pakseh",

        username: "pakseh",

        phone: "081234567890",

        password: "123456",

        avatar: "assets/default-avatar.png",

        bio: "Ketua Karang Taruna",

        jabatan: "Ketua",

        role: "Admin",

        hadir: 0,

        tidakHadir: 0,

        terlambat: 0,

        posting: 0,

        approved: true

    }

];

export const members =

    JSON.parse(

        localStorage.getItem("rege_members")

    ) ||

    defaultMembers;

saveMembers();

export function saveMembers(){

    localStorage.setItem(

        "rege_members",

        JSON.stringify(members)

    );

}

export function addMember(member){

    members.push(member);

    saveMembers();

}

export function updateMember(id,data){

    const member = members.find(

        m=>m.id===id

    );

    if(!member) return;

    Object.assign(member,data);

    saveMembers();

}

export function deleteMember(id){

    const index = members.findIndex(

        m=>m.id===id

    );

    if(index===-1) return;

    members.splice(index,1);

    saveMembers();

}

export function getMemberById(id){

    return members.find(

        m=>m.id===id

    );

}

export function getMemberByUsername(username){

    return members.find(

        m=>m.username===username

    );

}

export function getCurrentMember(){

    const current = JSON.parse(

        localStorage.getItem("currentUser")

    );

    if(!current) return null;

    return members.find(

        m=>m.id===current.id

    );

}