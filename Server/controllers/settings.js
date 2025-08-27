
const Settings = require("../models/Settings");
const { StatusCodes } = require("http-status-codes");
const getCurrentSettings = async (req, res) => {
    let settings = await Settings.findOne();
    if(!settings) settings = await Settings.create({});
    res.json(settings);
};

const updateSettings = async (req, res) => {
    const {open} = req.body;
    const settings = await Settings.findOneAndUpdate({}, { reservationsOpen: open }, { new: true } );
    if (!settings) return res.status(StatusCodes.NOT_FOUND).json({ message: "Settings not found" });
    res.json(settings);
};

module.exports = {
    getCurrentSettings,
    updateSettings
};
