const branch = process.env.GITHUB_REF_NAME;

const pluginsRelease = [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    ["@semantic-release/npm", { npmPublish: false }],
    "@semantic-release/github",
    "@semantic-release/git",
    ["@semantic-release/exec", { publishCmd: "pnpm exec publib dist-jsii" }],
];

const plubinsPreRelease = [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/npm", { npmPublish: false }],
    "@semantic-release/github",
    ["@semantic-release/exec", { publishCmd: "pnpm exec publib dist-jsii" }],
];

const config = {
    branches: ["master", { name: "alpha", prerelease: true }],
};

if (config.branches.some((it) => it === branch || (it.name === branch && !it.prerelease))) {
    config.plugins = pluginsRelease;
} else {
    config.plugins = plubinsPreRelease;
}

module.exports = config;
