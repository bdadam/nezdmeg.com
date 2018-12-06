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
            { hid: 'og:title', property: 'og:title', content: title },
            { hid: 'og:description', property: 'og:description', name: 'description', content: description },
            { hid: 'og:url', property: 'og:url', content: canonical },
            { hid: 'og:site_name', property: 'og:site_name', content: 'Nézd meg!' },
            { hid: 'og:locale', property: 'og:locale', content: 'hu_HU' },
            { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
            // { hid: 'twitter:site', name: 'twitter:site', content: '@ TODO' },

            ...img,
        ],
    };
};
