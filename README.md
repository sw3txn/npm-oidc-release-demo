# npm-oidc-release-demo

**Demo of automated npm releases with OIDC authentication and semantic-release.**

This repository demonstrates a complete setup for secure, automated npm publishing without static tokens.

## What This Demo Shows

### Automated Release Pipeline
- **Zero-touch releases** - Merge to `main` automatically publishes to npm
- **Semantic versioning** - Commit messages determine version bumps
- **Generated changelogs** - Release notes created automatically
- **Git tags and GitHub releases** - Created for every version

### Security-First Publishing
- **OIDC authentication** - No npm tokens stored in repository secrets
- **SLSA provenance** - Cryptographic proof of package origin
- **Multi-Node testing** - Releases blocked if tests fail on Node 20, 22, or 24

### Developer Experience
- **Conventional commits** - Enforced via git hooks (commitlint)
- **Automated validation** - Commit format checked before push

## How It Works

1. **Commit with conventional format**: `feat: add new feature`
2. **Merge PR to `main` branch**
3. **[Release workflow](.github/workflows/release.yml) runs automatically**:
   - Runs tests on all Node LTS versions
   - semantic-release analyzes commits
   - Determines version bump (major/minor/patch)
   - Updates CHANGELOG.md and package.json
   - Publishes to npm with OIDC + provenance
   - Creates GitHub release and git tag

See [RELEASE.md](RELEASE.md) for detailed release workflow and commit message guidelines.

## Key Configuration Files

- **[.releaserc.json](.releaserc.json)** - semantic-release configuration ([Semantic Release Docs](https://semantic-release.gitbook.io/semantic-release/usage/configuration))
- **[.commitlintrc.json](.commitlintrc.json)** - Conventional commit validation rules ([Commitlint Docs](https://commitlint.js.org/reference/configuration.html))
- **[.husky/commit-msg](.husky/commit-msg)** - Git hook that enforces commit message format ([Husky Docs](https://typicode.github.io/husky/get-started.html))
- **[.github/workflows/release.yml](.github/workflows/release.yml)** - Automated release workflow with OIDC publishing ([npm provenance](https://docs.npmjs.com/generating-provenance-statements))
- **[.github/workflows/test.yml](.github/workflows/test.yml)** - Multi-Node test matrix ([GitHub Actions Docs](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs))


## Development

### Prerequisites

- Node.js >= 20
- npm >= 9

### Setup

```bash
# Clone repository
git clone https://github.com/sw3txn/npm-oidc-release-demo.git
cd npm-oidc-release-demo

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Lint
npm run lint
```

## Security

This package includes SLSA provenance attestation. Verify package authenticity:

```bash
npm audit signatures
```

## Demonstration Progress

This repository demonstrates semantic-release through a series of pull requests that show different commit types and their effects on versioning.

### Story Arc: Building a Math Library

| Version | PR | Type | Change | Release |
|---------|----|----|--------|---------|
| 1.0.0 | - | - | Initial release | [v1.0.0](https://github.com/sw3txn/npm-oidc-release-demo/releases/tag/v1.0.0) |
| 1.0.0 | [#1](https://github.com/sw3txn/npm-oidc-release-demo/pull/1) | `docs:` | Add npm OIDC configuration instructions | No release |
| 1.1.0 | [#2](https://github.com/sw3txn/npm-oidc-release-demo/pull/2) | `feat:` | Add multiply function | [v1.1.0](https://github.com/sw3txn/npm-oidc-release-demo/releases/tag/v1.1.0) |
| 1.1.1 | [#3](https://github.com/sw3txn/npm-oidc-release-demo/pull/3) | `fix:` | Fix multiply for negative numbers | [v1.1.1](https://github.com/sw3txn/npm-oidc-release-demo/releases/tag/v1.1.1) |
| 1.1.1 | [#4](https://github.com/sw3txn/npm-oidc-release-demo/pull/4) | `test:` | Add test for negative multiply | No release |
| 1.1.1 | [#6](https://github.com/sw3txn/npm-oidc-release-demo/pull/6) | `ci:` | Fix beta release workflow | No release |
| 1.2.0-beta.1 | [#5](https://github.com/sw3txn/npm-oidc-release-demo/pull/5) | `feat:` | Add subtract (beta) | [v1.2.0-beta.1](https://github.com/sw3txn/npm-oidc-release-demo/releases/tag/v1.2.0-beta.1) |
| 1.2.0 | [#7](https://github.com/sw3txn/npm-oidc-release-demo/pull/7) | merge | Promote subtract to stable | [v1.2.0](https://github.com/sw3txn/npm-oidc-release-demo/releases/tag/v1.2.0) |
| 1.3.0 | [#8](https://github.com/sw3txn/npm-oidc-release-demo/pull/8) | `feat:` | Add factorial function | [v1.3.0](https://github.com/sw3txn/npm-oidc-release-demo/releases/tag/v1.3.0) |
| 1.3.0 | [#9](https://github.com/sw3txn/npm-oidc-release-demo/pull/9) | `style:` | Add braces to factorial conditionals | No release |
| 1.3.0 | [#10](https://github.com/sw3txn/npm-oidc-release-demo/pull/10) | `refactor:` | Convert factorial to iterative | No release |
| 1.3.1 | [#11](https://github.com/sw3txn/npm-oidc-release-demo/pull/11) | `perf:` | Add memoization to factorial | [v1.3.1](https://github.com/sw3txn/npm-oidc-release-demo/releases/tag/v1.3.1) |
| 1.3.2 | [#12](https://github.com/sw3txn/npm-oidc-release-demo/pull/12) | `revert:` | Remove factorial memoization | [v1.3.2](https://github.com/sw3txn/npm-oidc-release-demo/releases/tag/v1.3.2) |

Each PR demonstrates a different conventional commit type and shows how semantic-release handles versioning and publishing.

## Resources

- [npm package](https://www.npmjs.com/package/@sw3txn/npm-oidc-release-demo)
- [Release process documentation](RELEASE.md)
- [Changelog](CHANGELOG.md)


## License

MIT License - see [LICENSE](LICENSE) file for details.
