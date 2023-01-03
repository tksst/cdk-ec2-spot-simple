const branch = process.env.GITHUB_REF_NAME;

const pluginsRelease = [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    ["@semantic-release/npm", { npmPublish: false }],
    "@semantic-release/github",
    // jsii-pacmak reads our version from package.json, so semantic-release should update package.json.
    "@semantic-release/git",
    ["@semantic-release/exec", { publishCmd: "pnpm exec publib dist-jsii" }],
];

// CHANGELOG.md should not be updated on pre-release because it will conflict with a future release.
const plubinsPreRelease = pluginsRelease.filter((it) => it !== "@semantic-release/changelog");

const config = {
    branches: ["master", { name: "alpha", prerelease: true }],
};

if (config.branches.some((it) => it === branch || (it.name === branch && !it.prerelease))) {
    config.plugins = pluginsRelease;
} else {
    config.plugins = plubinsPreRelease;
}

module.exports = config;
