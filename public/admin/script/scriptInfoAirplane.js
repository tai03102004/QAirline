// Filter type (Lọc trạng thái sản phẩm)

const buttonStatus = document.querySelectorAll('[button-status]');
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('button-status');
            // type : "" , active , inactive
            if (type != "") {
                url.searchParams.set("type", type);
                // ...!status = "active" ...
            } else {
                url.searchParams.delete("type");
            }
            window.location.href = url.href;
        })
    })
}

// End Filter type

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

const filterInfo = document.querySelector(".btn-toolbar");
console.log(filterInfo);