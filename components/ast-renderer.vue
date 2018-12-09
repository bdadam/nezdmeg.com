<script>
import VIdeo from './v-ideo';

const render = (h, node) => {
    if (node.type === 'text') {
        return node.value;
    }

    return h(
        node.tagName,
        {
            attrs: node.properties,
            props: node.properties,
        },
        node.children.map(n => render(h, n))
    );
};

export default {
    props: ['ast'],
    render(h) {
        return h('div', {}, this.ast.children.map(n => render(h, n)));
    },
    components: {
        'video-embed': VIdeo,
    },
};
</script>

