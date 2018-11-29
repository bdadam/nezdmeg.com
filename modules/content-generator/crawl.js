const moment = require('moment');
const { JSDOM } = require('jsdom');

const analyzeVideo = async url => {
    const dom = await JSDOM.fromURL(url);
    const query = selector => dom.window.document.querySelector(selector);
    // const queryAll = (selector) => dom.window.document.querySelectorAll(selector);

    return {
        canonical: query('link[rel="canonical"]').href,
        title: query('[property="og:title"]').content,
        // description: query('[property="og:description"]').content,
        duration: moment.duration(query('[itemprop="duration"').content).asMilliseconds() / 1000,
        image: query('[property="og:image"]').content,
        video: query('[property="og:video:url"').content,
        videoWidth: query('[property="og:video:width"').content,
        videoHeight: query('[property="og:video:height"').content,
    };
};

module.exports = analyzeVideo;
