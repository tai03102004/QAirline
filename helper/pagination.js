module.exports = (objectPagination, query, countProducts) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page); // Trang hiện tại
    }
    if (countProducts === 0) {
        objectPagination.currentPage = 1;
    }

    // Sản phẩm bạn bỏ qua
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    // Tổng sản phẩm
    objectPagination.totalPage = Math.ceil(countProducts / objectPagination.limitItems);

    return objectPagination;
}