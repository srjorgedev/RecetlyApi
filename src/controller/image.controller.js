import ImageKit from "imagekit"

var imagekit = new ImageKit({
    privateKey: "private_AOgu21GUBXcCpjYFgbnmJi8DwR8=",
    publicKey: "public_n9XP7e+6IRMZYTJIgJXFtXVtwKM=",
    urlEndpoint: "https://ik.imagekit.io/uv3u01crv"
})

export async function uploadSingleImage(img) {
    try {
        return new Promise((resolve, reject) => {
            imagekit.upload(
                {
                    file: img.buffer,
                    fileName: img.originalname
                }
            ).then(response => {
                console.log(response.url)
                resolve(response.url)
            }).catch(error => {
                console.log(error)
                reject(error)
            })

        })
    } catch (error) {
        console.log('Error general al subir la imagen: ' + error)
    }
}

export async function uploadImageWithoutBuffer(buffer, fileName) {
    try {
        return new Promise((resolve, reject) => {
            imagekit.upload(
                {
                    file: buffer,
                    fileName: fileName
                }
            ).then(response => {
                console.log(response.url)
                resolve(response.url)
            }).catch(error => {
                console.log(error)
                reject(error)
            })

        })
    } catch (error) {
        console.log('Error general al subir la imagen: ' + error)
    }
}