// Filter Status (Lọc trạng thái sản phẩm)

const buttonStatus = document.querySelectorAll('[button-status]');
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener('click', () => {
            const status = button.getAttribute('button-status');
            // status : "" , active , inactive
            if (status != "") {
                url.searchParams.set("status", status);
                // ...!status = "active" ...
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        })
    })
}

// End Filter Status 

// Filter setClass

const buttonSeatClass = document.querySelectorAll('[button-seatClass]');
if (buttonSeatClass.length > 0) {
    let url = new URL(window.location.href);
    buttonSeatClass.forEach(button => {
        button.addEventListener('click', () => {
            const seatClass = button.getAttribute('button-seatClass');
            // status : "" , active , inactive
            if (seatClass != "") {
                url.searchParams.set("seatClass", seatClass);
                // ...!status = "active" ...
            } else {
                url.searchParams.delete("seatClass");
            }
            window.location.href = url.href;
        })
    })
}

// End filter setClass


// Form Search : Tìm kiếm sản phẩm

const formSearch = document.querySelector("#form-search");

if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        // e.target.elements.keyword.value : trong ô input
        const value = e.target.elements.keyword.value;
        if (value != "") {
            url.searchParams.set("keyword", value);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}

// End Form Search


// Pagination : Phân trang

const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination.length > 0) {
    let url = new URL(window.location.href);

    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    })

}

// End Pagination

// Change Status (Delete)

const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path"); // admin/products/delete
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const confirmDelete = confirm("Bạn có chắc muốn xóa bản ghi này?");
            if (confirmDelete) {
                const id = button.getAttribute("data-id");
                const action = path + `/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        });
    });
}

// End Change Status (Delete)


// Change Status (Thay đổi trang thái 1 sản phẩm)

const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            const statusChange = statusCurrent == "active" ? "inactive" : "active";
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            // formChangeStatus.setAttribute("action", action);
            formChangeStatus.submit(); // gửi yêu cầu đến http và action sẽ được gán theo yêu cầu
        })
    })
}

// End Change Status

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        if (e.target.files.length) {
            const image = URL.createObjectURL(e.target.files[0]);

            uploadImagePreview.src = image;
        }
    });
}
// End Upload Image

// Sort

const sort = document.querySelector(".sort");
if (sort) {
    let url = new URL(window.location.href);
    const sortSelect = sort.querySelector("[sort-select]");
    sortSelect.addEventListener("change", (e) => {
        e.preventDefault();
        const value = e.target.value; // positon-desc
        const [sortKey, sortValue] = value.split("-");

        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

        window.location.href = url.href;
    })
    // Click vào clear để xoá sắp xếp : Xoá href ?sortKey=position&sortValue=asc
    const sortClear = sort.querySelector("[sort-clear]");
    if (sortClear) {
        sortClear.addEventListener("click", (e) => {
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");
            window.location.href = url.href;
        })
    }
    // Khi lựa chọn thì nó sẽ không bị load lại cái mặc định
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if (sortKey && sortValue) {
        const stringSort = `${sortKey}-${sortValue}`;
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
        optionSelected.selected = true;
    }
}

// End Sort