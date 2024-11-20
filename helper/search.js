// Tách riêng hàm xử lý keyword
const processKeyword = (keyword) => {
    const processedKeyword = keyword?.replace(/\s+/g, ' ').trim().toLowerCase();
    return processedKeyword;
}

// Tách riêng hàm tạo regex từ keyword 
const generateRegex = (keyword) => {
    return new RegExp(keyword, 'i');
}

module.exports = (query) => {

    // Destructuring
    const {
        keyword
    } = query;

    // Xử lý keyword 
    const processedKeyword = processKeyword(keyword);

    // Tạo regex
    let regex = null;
    if (processedKeyword) {
        regex = generateRegex(processedKeyword);
    }

    return {
        keyword: processedKeyword,
        regex
    };

}