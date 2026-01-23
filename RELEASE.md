# Release Process

This repository uses [semantic-release](https://github.com/semantic-release/semantic-release) for automated releases. Releases are triggered automatically when commits are pushed to the `main` branch.

> **Note**: Pre-releases via a `beta` branch are supported but **optional**.

## Conventional Commits

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This is enforced by commitlint via a git hook.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

All commit types listed below are **allowed by commitlint** ([.commitlintrc.json](.commitlintrc.json)). However, only certain types trigger releases:

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat:` | New feature | Minor (0.X.0) |
| `fix:` | Bug fix | Patch (0.0.X) |
| `perf:` | Performance improvement | Patch (0.0.X) |
| `revert:` | Revert a previous commit | Patch (0.0.X) |
| `BREAKING CHANGE:` or `!` | Breaking change | Major (X.0.0) |
| `docs:` | Documentation only | None |
| `style:` | Code style changes (formatting, etc.) | None |
| `refactor:` | Code refactoring without feature/fix | None |
| `test:` | Adding or updating tests | None |
| `chore:` | Maintenance tasks | None |
| `ci:` | CI/CD changes | None |

> **Note**: Version bump rules come from [@semantic-release/commit-analyzer defaults](https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js). By default, `feat`, `fix`, `perf`, and `revert` trigger releases.

### Reverting Commits

**Using `git revert` (recommended):**

```bash
git revert <commit-hash>
```

Git opens an editor with a pre-filled commit message:
```
Revert "feat: add login feature"

This reverts commit 1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t.
```

You can accept it as-is or use `git revert <commit-hash> --no-edit` to skip the editor.

**Manual revert commits:**

You can also write manual revert commits using the conventional format:
```bash
git commit -m "revert: undo feature X"
```

Both methods trigger **patch releases** (0.0.X) by default.

### Breaking Changes

To trigger a **major version bump** (X.0.0), add `BREAKING CHANGE:` in the commit body or use `!` after the type:

```
feat!: remove deprecated API

BREAKING CHANGE: The old authenticate() method has been removed.
Use the new login() method instead.
```

### Examples

```bash
# Feature (minor version bump)
feat: add user authentication

# Bug fix (patch version bump)
fix: prevent race condition in login flow

# Breaking change (major version bump)
feat!: replace JWT with session tokens

BREAKING CHANGE: JWT tokens are no longer supported.
Update your code to use session-based authentication.

# Documentation (no version bump)
docs: update installation instructions

# Chore (no version bump)
chore: update dependencies
```

## Release Workflow

### Automatic Releases

1. **Make changes** on a feature branch
2. **Commit** using conventional commit messages
3. **Create PR** and get it reviewed
4. **Merge to `main`** → semantic-release automatically:
   - Analyzes commits since last release
   - Determines next version number
   - Generates release notes
   - Updates CHANGELOG.md
   - Publishes to npm with provenance
   - Creates GitHub release
   - Creates git tag
   - Commits CHANGELOG.md and package.json back to repo

### Pre-releases (Beta) - Optional

> **This is optional.** Pre-releases are only needed if you want to test changes with early adopters before publishing to the stable `latest` npm tag. Most projects can skip this and only use the `main` branch.

If you want to publish pre-releases, you can use the `beta` branch:

```bash
git checkout -b feature/experimental
# Make changes with conventional commits
git push origin feature/experimental

# Create PR to beta branch
# After merge, semantic-release publishes as:
# 1.0.0-beta.1, 1.0.0-beta.2, etc.
```

Beta releases are published to npm with the `beta` dist-tag:
```bash
npm install @sw3txn/npm-oidc-release-demo@beta
```

## What Gets Published

### NPM Package Contents
- `dist/` - Compiled JavaScript and TypeScript definitions
- `README.md` - Package documentation
- `LICENSE` - License file

### Artifacts Created
- **npm package** - Published to npmjs.com with SLSA provenance
- **GitHub release** - Created with auto-generated release notes
- **Git tag** - `vX.Y.Z` tag pushed to repository
- **CHANGELOG.md** - Updated with release notes

## Version Numbers

semantic-release follows [Semantic Versioning](https://semver.org/):

- **Major** (X.0.0) - Breaking changes
- **Minor** (0.X.0) - New features (backward compatible)
- **Patch** (0.0.X) - Bug fixes (backward compatible)
