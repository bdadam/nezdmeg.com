const fs = require('fs-extra');

const items = require('./home-content.json');

// console.log(content);

items.forEach(async item => {
    const filename = `articles/${item.filename}.md`;

    if (fs.existsSync(filename)) {
        return;
    }

    fs.writeFile(filename, item.content);

    console.log('Create file', item.filename);
});
