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
const bent = require('bent');
const sharp = require('sharp');

const convertContentToHtml = obj => {
    const html = marked(obj.content.trim());

    const isEmbeddableVideo = node => {
        try {
            return (
                node.tagName === 'p' &&
                node.children[0].tagName === 'a' &&
                node.children[0].children[0].value === node.children[0].properties.href
            );
        } catch (ex) {
            return false;
        }
    };

    const embedVideos = node => {
        if (isEmbeddableVideo(node)) {
            const href = node.children[0].properties.href;
            return {
                type: node.type,
                tagName: 'video-embed',
                properties: {
                    video: href,
                    src: href.replace('watch?v=', 'embed/'),
                    image: `/video-images/hq/${encodeURIComponent(href).replace(
                        'https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D',
                        ''
                    )}.jpg`,
                },
                children: [],
            };
        }

        return { ...node, children: node.children ? node.children.map(embedVideos) : [] };
    };

    const cleanAst = node => {
        return { ...omit(node, 'position'), children: node.children && node.children.map(cleanAst) };
    };

    const processor = unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeMinify);

    const ast = processor.runSync(processor.parse(html));

    return { ...obj, ast: embedVideos(cleanAst(ast)) };
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
        url: `/cikkek/${obj.slug}`,
    };
};

const ensureTags = obj => {
    return {
        ...obj,
        tags: obj.tags || [],
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
    const shuffledArticles = sortBy(articles, () => Math.random() > 0.5).slice(0, 6);

    return {
        ...article,
        recommendations: shuffledArticles.map(a => pick(a, ['title', 'url', 'images'])),
    };
};

const analyzeVideo = require('./analyzeVideo');

const downloadImagesForVideo = async url => {
    const filename = encodeURIComponent(url).replace('https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D', '');

    const sqExists = fs.existsSync(`static/video-images/sq/${filename}.jpg`);
    const hqExists = fs.existsSync(`static/video-images/hq/${filename}.jpg`);

    if (sqExists && hqExists) {
        return;
    }

    const videoData = await analyzeVideo(url);

    if (!videoData) {
        return;
    }

    const download = bent('buffer');

    const img = await download(videoData.image);

    await fs.ensureDir('static/video-images/sq/');
    await fs.ensureDir('static/video-images/hq/');

    await sharp(img)
        .resize(1280, 720)
        .toFile(`static/video-images/hq/${filename}.jpg`);

    await sharp(img)
        .resize(480, 270)
        .toFile(`static/video-images/sq/${filename}.jpg`);
};

const Queue = require('a-promise-queue');
const queue = new Queue({ concurrency: 1 });

const ensureImages = async article => {
    const re = /https:\/\/www\.youtube\.com\/watch\?.*v=([^&]{11})/gi;

    var m;
    const videos = [];
    const videoIds = [];
    while ((m = re.exec(article.content))) {
        videos.push(m[0]);
        videoIds.push(m[1]);
        // videos.push(m[1]);
    }

    if (videos.length === 0) {
        return { ...article, images: {} };
    }

    await Promise.all(
        videos.map(url => {
            // console.log(url);
            // const x = await analyzeVideo(url);
            // console.log(url, x);
            return queue.add(() => downloadImagesForVideo(url));
        })
    );

    // console.log(videos);

    // 1. use local file if exists
    // 2. download from live site if exists
    // 3. download from video hoster
    // 4. save downloaded file path to `article`

    // const matches = re.exec(article.content);
    // if (!matches) {
    //     return article;
    // }

    // const videoUrl = `https://youtube.com/watch?v=${matches[1]}`;

    // fs.existsSync(`static/article-images/${encodeURIComponent(videoUrl)}-thumbnail.jpg`)

    // const video = await analyzeVideo(videoUrl);

    // console.log(video);

    const images = {
        // videoThumbnail: { url: `https://i.ytimg.com/vi/${videoIds[0]}/hqdefault.jpg`, width: 480, height: 360 },
        // video: { url: `https://i.ytimg.com/vi/${videoIds[0]}/hqdefault.jpg`, width: 480, height: 360 },

        videoThumbnail: {
            url: `/video-images/sq/${encodeURIComponent(videos[0]).replace(
                'https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D',
                ''
            )}.jpg`,
            width: 480,
            height: 270,
        },
        video: {
            url: `/video-images/hq/${encodeURIComponent(videos[0]).replace(
                'https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D',
                ''
            )}.jpg`,
            width: 1280,
            height: 720,
        },
    };

    return { ...article, images };
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
        .map(ensureTags);

    const articlesWithImages = await Promise.all(articles.map(ensureImages));

    const sortedArticles = sortBy(articlesWithImages, 'date').reverse();

    const index = {
        articles: sortedArticles.map(a => pick(a, ['title', 'teaser', 'formattedDate', 'url', 'images'])),
    };

    const articlesWithRecommendations = sortedArticles.map(a => recommend(a, articlesWithImages));
    const cleanedArticles = articlesWithRecommendations.map(clean);

    await Promise.all(cleanedArticles.map(writeArticleJson));

    await fs.writeFile('static/data/index.json', JSON.stringify(index));

    consola.success('Content json files generated.');
};
