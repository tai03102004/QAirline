module.exports = (query) => {
    // Lọc theo trạng thái vé
    let filterStatus = [{
        name: "Tất cả",
        status: "",
        class: ""
    }, {
        name: "Đã xác nhận",
        status: "Confirmed",
        class: ""
    }, {
        name: "Chờ xử lý",
        status: "Pending",
        class: ""
    }, {
        name: "Đã huỷ",
        status: "Canceled",
        class: ""
    }];

    if (query.status) {
        const index = filterStatus.findIndex(item => {
            return item.status === query.status;
        });

        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(item => {
            return item.status == "";
        });
        filterStatus[index].class = "active";
    }


    return {
        filterStatus
    };
};