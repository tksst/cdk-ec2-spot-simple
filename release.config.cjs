const branch = process.env.GITHUB_REF_NAME;

const pluginsRelease = [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    ["@semantic-release/npm", { npmPublish: false }],
    "@semantic-release/github",
    "@semantic-release/git",
    // eslint-disable-next-line no-template-curly-in-string
    ["@semantic-release/exec", { publishCmd: "./scripts/release.sh ${nextRelease.version}" }],
];

// CHANGELOG.md should not be updated on pre-release because it will conflict with a future release.
const plubinsPreRelease = pluginsRelease.filter((it) => it !== "@semantic-release/changelog");

const config = {
    branches: ["main", { name: "alpha", prerelease: true }],
};

if (config.branches.some((it) => it === branch || (it.name === branch && !it.prerelease))) {
    config.plugins = pluginsRelease;
} else {
    config.plugins = plubinsPreRelease;
}

module.exports = config;
