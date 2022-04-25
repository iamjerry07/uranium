let axios = require("axios");
const { get } = require("../routes/route");

//1.
let getDistrict = async function (req, res) {
    try{
        let district_id = req.query.district_id;
    let date = req.query.date;
    var option = {
        method: "get",
        url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`
    }
    let result = await axios(option)
    res.status(200).send({ msg: result.data });
}
catch(error){
    res.status(500).send({msg: error.message})
}

}

module.exports.getDistrict = getDistrict;