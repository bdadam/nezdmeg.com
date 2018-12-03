var links = [...document.querySelectorAll('a.article-item')]; //;.map(i => i.href.replace('http://nezdmeg.com/cikkek/', ''))

var datesTaken = new Set();

var x = links.map((link, idx) => {
    const slug = link.href.replace('http://nezdmeg.com/cikkek/', '');
    const title = link.querySelector('h2').innerText;
    const teaser = link.querySelector('.lead p').innerText;
    const dateStr = slug.substr(slug.length - 10, 8);
    const dateYaml = `${dateStr.substr(0, 4)}-${dateStr.substr(4, 2)}-${dateStr.substr(6, 2)}`;

    return {
        slug,
        title,
        filename: `${dateStr}-${slug.substr(0, slug.length - 11)}`,
        content: `---
title: ${title}
date: ${dateYaml} 12:${String(idx).padStart(2, '0')}
slug: ${slug}
teaser: ${teaser}
---

TODO_CONTENT`,
    };
});

console.log(JSON.stringify(x));
