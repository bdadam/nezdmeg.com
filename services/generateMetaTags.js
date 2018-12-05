export default ({ title, description, canonical, image }) => {
    const img =
        image && image.url
            ? [
                  { property: 'og:image', content: image.url },
                  { property: 'og:image:width', content: image.width },
                  { property: 'og:image:height', content: image.height },
              ]
            : [];

    return {
        title: `${title} | NezdMeg.com`,
        link: [{ rel: 'canonical', href: canonical }],
        meta: [
            { property: 'og:title', content: title },
            { property: 'og:description', name: 'description', content: description },
            { property: 'og:url', content: canonical },
            { property: 'og:site_name', content: 'Nézd meg!' },
            { property: 'og:locale', content: 'hu_HU' },
            { name: 'twitter:card', content: 'summary' },
            // { name: 'twitter:site', content: '@ TODO' },

            ...img,
        ],
    };
};
