// make base64 image
export function base64_img(image) {
    return 'data:' + image.type + ';base64,' + image.file;
}