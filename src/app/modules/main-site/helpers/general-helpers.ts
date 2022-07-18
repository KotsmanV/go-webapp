function generateRandomId() {
    return `$tinymce-editor-${Math.floor(Math.random() * 1000)}`;
}

export {
    generateRandomId
}