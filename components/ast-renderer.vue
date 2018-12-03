<script>
import VIdeo from './v-ideo';

const isEmbeddableVideo = node => {
    try {
        return (
            // node.tagName === 'a' && node.children[0].value === node.properties.href
            node.tagName === 'p' &&
            node.children[0].tagName === 'a' &&
            node.children[0].children[0].value === node.children[0].properties.href
        );
    } catch (ex) {
        return false;
    }
};

const render = (h, node) => {
    if (node.type === 'element') {
        if (isEmbeddableVideo(node)) {
            return h('v-ideo', { props: { video: node.children[0].properties.href } });
        }

        return h(node.tagName, { attrs: node.properties }, node.children.map(n => render(h, n)));
    }

    if (node.type === 'text') {
        return node.value;
    }

    return null;
};
export default {
    props: ['ast'],
    render(h) {
        const node = this.ast;
        return h('div', {}, node.children.map(n => render(h, n)));
    },
    components: { VIdeo },
};
</script>

