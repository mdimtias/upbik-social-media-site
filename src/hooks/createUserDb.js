export const createUserDb = async (email, data)=>{
    
    const response =await fetch(`https://social-media-site-server.vercel.app/users/${email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const json = await response.json();
    return json;
}