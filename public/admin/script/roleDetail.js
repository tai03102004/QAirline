// Hiển thị cái mình đã tick

const dataRecords = document.querySelector("[data-records]");


if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records")); // chuyển về mảng các obj

    const tablePermissions = document.querySelector("[table-permissions]");
    tablePermissions.onclick = function (event) {
        event.preventDefault(); // Ngăn chặn sự kiện mặc định như nhấp chuột
    }

    // records.forEach((record,index) =>{
    const permissions = records.permissions; // các cái mình đã tick
    // console.log(record.title);
    console.log(permissions);
    console.log(tablePermissions);
    // các giá trị mà mình tick
    permissions.forEach(permission => {
        const row = tablePermissions.querySelector(`tr[data-name="${permission}"]`);
        console.log(row);
        const input = row.querySelectorAll("input")[0];
        // giá trị của ô input mà bạn tick
        input.checked = true;
    });
}

// End Permissions Data Default