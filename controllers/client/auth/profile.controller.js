const Account = require('../../../models/account.model'); 
const updateProfile = async (req, res) => {
    try {
        const { name, email, gender, dob, nationality, address, province, city, phone, passport } = req.body;

        const userId = req.user.id; // Example: req.user could be set after authentication (e.g., via JWT)

        const account = await Account.findById(userId);

        if (!account) {
            return res.status(404).json({ message: 'Tài khoản không tồn tại!' });
        }

        if (email && !/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: 'Địa chỉ email không hợp lệ!' });
        }

        // Update data
        account.name = name || account.name;
        account.email = email || account.email;
        account.gender = gender || account.gender;
        account.dob = dob || account.dob;
        account.nationality = nationality || account.nationality;
        account.address = address || account.address;
        account.province = province || account.province;
        account.city = city || account.city;
        account.phone = phone || account.phone;
        account.passport = passport || account.passport;

        // Save 
        await account.save();

        res.status(200).json({ message: 'Cập nhật thông tin thành công!' });
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin.' });
    }
};

module.exports = {
    updateProfile,
};
