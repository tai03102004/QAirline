module.exports = (query) => {
    // Lọc theo trạng thái vé
    let filterSeatClass = [{
            name: "Phổ thông",
            seatClass: "Economy",
            class: ""
        },
        {
            name: "Thương gia",
            seatClass: "Business",
            class: ""
        }
    ];

    let index;

    if (query.filterSeatClass) {
        index = filterSeatClass.findIndex(item => item.seatClass === query.filterSeatClass);
    } else {
        index = filterSeatClass.findIndex(item => item.seatClass === "Economy");
    }

    if (index !== -1) {
        filterSeatClass[index].class = "active";
    }


    return {
        filterSeatClass
    };
};