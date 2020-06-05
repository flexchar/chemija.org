export default function exams(edges) {
    return edges.map(({ node }) => {
        if (Object.entries(node).length) {
            node.questions = node.questions.asset.url;
            node.answers =
                node.answers && node.answers.asset && node.answers.asset.url;
        }

        return node;
    });
}
