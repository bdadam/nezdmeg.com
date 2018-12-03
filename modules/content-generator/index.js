const { promisify } = require('util');
const fs = require('fs-extra');
const glob = promisify(require('glob'));
const matter = require('gray-matter');
const marked = require('marked');
const speakingurl = require('speakingurl');
const moment = require('moment');
const consola = require('consola');
const unified = require('unified');
const rehypeParse = require('rehype-parse');
const rehypeMinify = require('rehype-preset-minify');
const pick = require('lodash/pick');
const omit = require('lodash/omit');
const sortBy = require('lodash/sortBy');

const convertContentToHtml = obj => {
    const html = marked(obj.content);

    const cleanAst = node => {
        return { ...omit(node, 'position'), children: node.children && node.children.map(cleanAst) };
    };

    const processor = unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeMinify);

    const ast = processor.runSync(processor.parse(html));

    return { ...obj, ast: cleanAst(ast) };
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

const recommend = (article, articles) => {
    const shuffledArticles = sortBy(articles, () => Math.random() > 0.5);

    return {
        ...article,
        recommendations: shuffledArticles
            .filter((a, idx) => idx < 10)
            .map(a => ({
                title: a.title,
                url: a.canonicalRelative,
                image: 'https://i.ytimg.com/vi/R2NzN1ew9j0/hqdefault.jpg',
            })),
    };
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
        .map(ensureCanonical);

    const sortedArticles = sortBy(articles, 'date').reverse();

    const index = {
        articles: sortedArticles.map(a => pick(a, ['title', 'teaser', 'formattedDate', 'canonicalRelative'])),
    };

    const articlesWithRecommendations = sortedArticles.map(a => recommend(a, articles));
    const cleanedArticles = articlesWithRecommendations.map(clean);

    await Promise.all(cleanedArticles.map(writeArticleJson));

    await fs.writeFile('static/data/index.json', JSON.stringify(index));

    consola.success('Content json files generated.');
};
