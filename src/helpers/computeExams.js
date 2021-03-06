export default function exams(edges) {
    return edges.map(({ node }) => {
        if (Object.entries(node).length) {
            node.questions =
                typeof node.questions === 'string'
                    ? node.questions
                    : node.questions &&
                      node.questions.asset &&
                      node.questions.asset.url;
            node.answers =
                typeof node.answers === 'string'
                    ? node.answers
                    : node.answers &&
                      node.answers.asset &&
                      node.answers.asset.url;
        }

        return node;
    });
}
