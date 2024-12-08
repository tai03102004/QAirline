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

// Form Search : Tìm kiếm sản phẩm

const formSearch = document.querySelector("#form-search");

if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        const fromRaw = e.target.elements.from.value;
        const toRaw = e.target.elements.to.value;
        const departureDateRaw = e.target.elements.departureDate.value;

        const fromValue = fromRaw.toLowerCase().replace(/\s+/g, ' ').trim();
        const toValue = toRaw.toLowerCase().replace(/\s+/g, ' ').trim();
        const departureDateValue = departureDateRaw.toLowerCase().replace(/\s+/g, ' ').trim();

        if (fromValue !== "") {
            url.searchParams.set("from", fromValue);
        } else {
            url.searchParams.delete("from");
        }

        if (toValue !== "") {
            url.searchParams.set("to", toValue);
        } else {
            url.searchParams.delete("to");
        }

        if (departureDateValue !== "") {
            url.searchParams.set("departureDate", departureDateValue);
        } else {
            url.searchParams.delete("departureDate");
        }

        window.location.href = url.href;
    })
}


// End Form Search

document.addEventListener('DOMContentLoaded', () => {
    const seatClassSelect = document.getElementById('seatClass');

    if (seatClassSelect) {
        seatClassSelect.addEventListener('change', () => {
            // Gửi form filterSeat để áp dụng thay đổi
            document.getElementById('filterSeat').submit();
        });
    }
});