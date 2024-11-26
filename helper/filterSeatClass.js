// Lọc trang thái hoạt động

module.exports = (query) => { // Không truyền query -> class của Tất cả sẽ active
    let filterStatus = [{
        name: "Tất cả",
        status: "",
        class: ""
    }, {
        name: "Hạng thường",
        status: "Business",
        class: ""
    }, {
        name: "Hạng thương gia",
        status: "Economy",
        class: ""
    }];
    if (query.status) {
        const index = filterStatus.findIndex(item => {
            return item.status === query.status;
        });

        filterStatus[index].class = "active" // Bôi đậm vào cái mk trỏ
    } else {
        const index = filterStatus.findIndex(item => {
            return item.status == "";
        });
        filterStatus[index].class = "active"
    }
    return filterStatus;
}