const Account = require('../../../models/account.model');

const getProfile = (req, res) => {
    res.render('client/pages/auth/update_info.pug');
};

const updateProfile = async (req, res) => {
    try {

        const {
            name,
            email,
            gender,
            dob,
            nationality,
            address,
            province,
            city,
            phone,
            passport
        } = req.body;

        const account = await Account.findOne({
            email: req.body.email,
            deleted: false,
        });

        if (!account) {
            return res.status(404).json({
                message: 'Tài khoản không tồn tại!'
            });
        }

        if (email && email !== account.email) {
            const existingEmail = await Account.findOne({
                email
            });
            if (existingEmail) {
                return res.status(400).json({
                    message: 'Email đã tồn tại trong hệ thống!'
                });
            }
        }

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

        await account.save();

        res.status(200).json({
            success: true,
            message: 'Cập nhật thông tin thành công!'
        });

    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        res.status(500).json({
            message: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin.'
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
};