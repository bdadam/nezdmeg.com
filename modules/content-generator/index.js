const { promisify } = require('util');
const { URL } = require('url');
const fs = require('fs-extra');
const glob = promisify(require('glob'));
const matter = require('gray-matter');
const marked = require('marked');
const speakingurl = require('speakingurl');
const moment = require('moment');
const consola = require('consola');

const renderer = new marked.Renderer();

renderer.codespan = code => {
    const matches = code.match(/[\s]*youtube:[\s]*([\S]+)[\s]*/);

    if (matches && matches[1]) {
        return `<div>${matches[1]}</div>`;
    }

    return `<code>${code}</code>`;
};

renderer.link = (href, title, text) => {
    const x = new URL(href, 'https://nezdmeg.com/');
    const internal = x.hostname === 'nezdmeg.com';

    if (internal) {
        return `<a href="${href}" title="${title}">${text}</a>`;
    }

    return `<a href="${href}" title="${title || ''}" target="_blank" rel="external noreferrer">${text}</a>`;
};

const convertContentToHtml = obj => {
    return { ...obj, content: marked(obj.content, { renderer }) };
};

const convertDate = obj => {
    moment.locale('hu');
    return { ...obj, date: moment(obj.date).toDate(), formattedDate: moment(obj.date).format('LL') };
};

const createSlug = (title, date) => {
    return `${speakingurl(title, { lang: 'hu' })}-${moment(date).format('YYYYMMDD')}`;
};

const ensureSlug = obj => {
    return { ...obj, slug: obj.slug || createSlug(obj.title, obj.date) };
};

const ensureCanonical = obj => {
    return {
        ...obj,
        // canonical: `https://nezdmeg.com/cikkek/${obj.slug}`,
        canonicalRelative: `/cikkek/${obj.slug}`,
    };
};

const writeArticleJson = async obj => {
    await fs.ensureDir('static/data/cikkek');
    return fs.writeFile(`static/data/cikkek/${obj.slug}.json`, JSON.stringify(obj, null, 4));
};

const clean = obj => {
    return { ...obj, date: obj.date.toJSON() };
};

module.exports = async () => {
    const articleFiles = await glob('articles/*.md');
    const fileContents = await Promise.all(articleFiles.map(f => fs.readFile(f, 'utf-8')));

    const articles = fileContents
        .map(matter)
        .map(obj => ({ ...obj.data, content: obj.content }))
        .map(convertDate)
        .map(convertContentToHtml)
        .map(ensureSlug)
        .map(ensureCanonical)
        .map(clean);

    await Promise.all(articles.map(writeArticleJson));
    consola.success('Content json files generated.');
};
