const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

const readAndCreateCid = () => {
    try {
        const cid = localStorage.getItem('cid') || uuidv4();
        localStorage.setItem('cid', cid);

        return cid;
    } catch (ex) {
        return 'unknown';
    }
};

const convertToQs = params => {
    let ret = '';

    for (const key in params) {
        ret += `&${key}=${encodeURIComponent(params[key])}`;
    }

    return ret;
};

export const pageview = () => {
    const params = {
        v: 1,
        t: 'pageview',
        tid: 'UA-49233936-4',
        aip: 1,
        ds: 'web',
        cid: readAndCreateCid(),
        dr: document.referrer,
        sr: `${window.screen.availWidth}x${window.screen.availHeight}`,
        vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
        sd: `${screen.colorDepth}-bit`,
        de: 'UTF-8',
        dl: document.location.origin + document.location.pathname + document.location.search,
        dt: document.title,
        ul: navigator.language || navigator.userLanguage,
        z: (Math.random() * 1e9) | 0,
    };

    fetch(`https://www.google-analytics.com/r/collect?${convertToQs(params)}`, {
        credentials: 'omit',
        method: 'GET',
        mode: 'no-cors',
    });
};
