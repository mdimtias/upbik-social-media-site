export const ImgUpload = async (image)=>{
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`;
    const response = await fetch(url, {
        method:"POST",
        body: image
    })
    const json =await response.json()
    const data = await json.data.display_url
    return data;
}

