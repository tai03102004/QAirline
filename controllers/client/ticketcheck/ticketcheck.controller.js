const Booking = require('../../../models/booking.model')

module.exports.find = async (req, res) => {
    const { ticketId } = req.params;
    try {
        const booking = await Booking.findOne({ 
            ticketId: ticketId 
        });
        if (!booking) {
            return res.status(404).json({ message: 'Không tìm thấy vé!' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
}

module.exports.index = (req, res) => {
    res.render('client/pages/ticketcheck/index.pug', {
        pageTitle: "Tim kiem"
    });
}

module.exports.deleteticket = async (req, res) => {
    const { ticketId } = req.params;

    try {
        // Tìm và xóa ticket theo ticketId
        const result = await Booking.findOneAndDelete({ ticketId: ticketId });

        if (!result) {
            return res.status(404).json({ success: false, message: 'Vé không tồn tại' });
        }

        res.json({ success: true, message: 'Vé đã được xóa thành công', ticket: result });
    } catch (error) {
        console.error('Lỗi khi xóa vé:', error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi xóa vé' });
    }
}