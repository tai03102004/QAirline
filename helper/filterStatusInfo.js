// Lọc trang thái hoạt động

module.exports = (query) => { // Không truyền query -> class của Tất cả sẽ active
    let filterStatus = [{
        name: "Tất cả",
        type: "",
        class: ""
    }, {
        name: "Khuyến mãi",
        type: "promotion",
        class: ""
    }, {
        name: "Thông báo",
        type: "announcement",
        class: ""
    }, {
        name: "Giới thiệu",
        type: "introduction",
        class: ""
    }, {
        name: "Tin tức",
        type: "news",
        class: ""
    }];
    if (query.type) {
        const index = filterStatus.findIndex(item => {
            return item.type === query.type;
        });

        filterStatus[index].class = "active" // Bôi đậm vào cái mk trỏ
    } else {
        const index = filterStatus.findIndex(item => {
            return item.type == "";
        });
        filterStatus[index].class = "active"
    }
    return filterStatus;
}