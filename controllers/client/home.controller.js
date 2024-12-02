// [GET] /

module.exports.index = async (req, res) => {
    res.render('client/pages/flightinfo/index.pug', {
        pageTitle: "Home",
    })
}