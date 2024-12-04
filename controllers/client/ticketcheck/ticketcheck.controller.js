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