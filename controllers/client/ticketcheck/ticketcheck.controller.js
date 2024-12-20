const Booking = require('../../../models/booking.model')
const Flight = require('../../../models/Flights');
const Airport = require('../../../models/airport.model')

module.exports.find = async (req, res) => {
    const { ticketId } = req.params;
    try {
        const booking = await Booking.findOne({ 
            ticketId: ticketId,
            status: { $not: { $eq: "Canceled" } }
        });
        if (!booking) {
            return res.status(404).json({ message: 'Không tìm thấy vé!' });
        }
        const departAirport = await Airport.findOne({
            code: booking.departureLocation
        })

        const arriveAirport = await Airport.findOne({
            code: booking.arrivalLocation
        })
        const response = {
            booking,
            departAirport,
            arriveAirport
        }
        res.status(200).json(response);
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
        const result = await Booking.updateOne(
            { ticketId: ticketId },
            { $set: { status: 'Canceled' } }
        );

        if (!result) {
            return res.status(404).json({ success: false, message: 'Vé không tồn tại' });
        }

        const booking = await Booking.findOne({ 
            ticketId: ticketId,
            status: "Canceled"
        });
        if (!booking) {
            return res.status(404).json({ message: 'Vé không tồn tại!' });
        } else {
            let flightUpdate
            if (booking.seatClass === 'Economy') {
                flightUpdate = await Flight.updateOne(
                    { _id: booking.flightId },
                    { $inc: { "economySeats.available": 1 } }
                )
            } else {
                flightUpdate = await Flight.updateOne(
                    { _id: booking.flightId },
                    { $inc: { "businessSeats.available": 1 } }
                )
            }
            if (!flightUpdate) {
                res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi hủy vé' });
            }
        }

        res.json({ success: true, message: 'Hủy chuyến bay thành công', ticket: result });
    } catch (error) {
        console.error('Lỗi khi xóa vé:', error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi hủy vé' });
    }
}