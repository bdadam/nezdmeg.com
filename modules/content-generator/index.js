const { promisify } = require('util');
const { URL } = require('url');
const fs = require('fs-extra');
const glob = promisify(require('glob'));
const matter = require('gray-matter');
const marked = require('marked');
const speakingurl = require('speakingurl');
const moment = require('moment');
const consola = require('consola');
const pick = require('lodash/pick');
const omit = require('lodash/omit');

const renderer = new marked.Renderer();

// renderer.codespan = code => {
//     const matches = code.match(/[\s]*youtube:[\s]*([\S]+)[\s]*/);

//     if (matches && matches[1]) {
//         return `<div>${matches[1]}</div>`;
//     }

//     return `<code>${code}</code>`;
// };

// renderer.link = (href, title, text) => {
//     const x = new URL(href, 'https://nezdmeg.com/');
//     const internal = x.hostname === 'nezdmeg.com';

//     if (internal) {
//         return `<a href="${href}" title="${title}">${text}</a>`;
//     }

//     return `<a href="${href}" title="${title || ''}" target="_blank" rel="external noreferrer">${text}</a>`;
// };

const convertContentToHtml = obj => {
    const remark = require('remark');
    // const md = require('remark-parse');
    // const frontmatter = require('remark-frontmatter');
    // const parseFrontmatter = require('remark-parse-yaml');
    const unified = require('unified');
    // const parse = require('remark-parse');

    // const processor = unified()
    //     .use(md)
    //     .use(frontmatter)
    //     .use(parseFrontmatter);

    const html = require('remark-html');
    const processor = remark().use(html);
    // .use(frontmatter)
    // .use(parseFrontmatter);

    const ast = processor.runSync(processor.parse(obj.content));

    const x = node => {
        return { ...omit(node, 'position'), children: node.children && node.children.map(x) };
    };

    // console.log(JSON.stringify(ast, null, 4));
    // console.log(JSON.stringify(x(ast), null, 4));

    const ht = marked(obj.content, { renderer });

    const parse = require('rehype-parse');
    const format = require('rehype-format');
    const minify = require('rehype-preset-minify');

    const processor2 = unified()
        .use(parse, { fragment: true })
        // .use(format)
        .use(minify);

    const qwe = processor2.runSync(processor2.parse(ht));
    return { ...obj, content: marked(obj.content, { renderer }), ast: x(ast), ast2: x(qwe) };
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
    return {
        ...article,
        recommendations: [
            {
                title: 'Incididunt irure minim nisi aute Lorem do est aliqua nostrud laborum',
                url: '/',
                image: 'https://i.ytimg.com/vi/R2NzN1ew9j0/hqdefault.jpg',
            },
            {
                title: 'Eu consectetur est irure mollit velit consectetur duis amet',
                url: '/',
                image: 'https://i.ytimg.com/vi/R2NzN1ew9j0/hqdefault.jpg',
            },
            {
                title: 'Qui exercitation eiusmod anim dolore consectetur ullamco ullamco enim excepteur',
                url: '/',
                image: 'https://i.ytimg.com/vi/R2NzN1ew9j0/hqdefault.jpg',
            },
        ],
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

    articles.sort((a, b) => {
        if (a.date > b.date) {
            return -1;
        }
        return 1;
    });

    const index = {
        articles: articles.map(a => pick(a, ['title', 'teaser', 'formattedDate', 'canonicalRelative'])),
    };

    const articlesWithRecommendations = articles.map(a => recommend(a, articles));
    const cleanedArticles = articlesWithRecommendations.map(clean);

    await Promise.all(cleanedArticles.map(writeArticleJson));

    await fs.writeFile('static/data/index.json', JSON.stringify(index));

    consola.success('Content json files generated.');
};
