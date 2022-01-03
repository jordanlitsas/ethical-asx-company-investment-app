const axios = require('axios');
const header = async(asxCode) => {
    let data = axios.get(`https://asx.api.markitdigital.com/asx-research/1.0/companies/${asxCode}/header`);
    return data;
}

const keyStats = async(asxCode) => {
    let data = axios.get(`https://asx.api.markitdigital.com/asx-research/1.0/companies/${asxCode}/key-statistics`);
    return data;
}

const descriptive = async(asxCode) => {
    let data = axios.get(`https://asx.api.markitdigital.com/asx-research/1.0/companies/${asxCode}/about`);
    return data;
}

const annonucements = async (asxCode) => {
    let data = axios.get(`https://asx.api.markitdigital.com/asx-research/1.0/companies/${asxCode}/announcements`);
    return data;
}

const shareTimeData = async (asxCode) => {
    let data = axios.get(`https://www.asx.com.au/asx/1/share/${asxCode}`);
    return data;
}

module.exports = {header, keyStats, descriptive, annonucements, shareTimeData}
