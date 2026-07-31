const CLOUD_NAME = "kq4mpbfn";
const UPLOAD_PRESET = "rege_upload";

export async function uploadImage(file) {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(

        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

        {
            method: "POST",
            body: formData
        }

    );

    const data = await response.json();

    console.log("Cloudinary Response:", data);

    if (!response.ok) {

        throw new Error(
            data.error?.message || "Upload Cloudinary gagal."
        );

    }

    return data.secure_url;

}