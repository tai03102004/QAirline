// Lọc trang thái hoạt động

module.exports = (query) => { // Không truyền query -> class của Tất cả sẽ active
    let filterStatus = [{
        name: "Tất cả",
        status: "",
        class: ""
    }, {
        name: "Hoạt động",
        status: "active",
        class: ""
    }, {
        name: "Dừng hoạt động",
        status: "inactive",
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