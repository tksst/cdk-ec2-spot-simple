const branch = process.env.GITHUB_REF_NAME;

const pluginsRelease = [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    "@semantic-release/git",
];

const plubinsPreRelease = [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github",
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
