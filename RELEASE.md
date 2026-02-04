# Release Process

This repository uses [semantic-release](https://github.com/semantic-release/semantic-release) with a **two-step release process**. This ensures releases are reviewed before publication to npm.

## Conventional Commits

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This is enforced in two places:

- **Locally**: commitlint via git hook (`.husky/commit-msg`) - can be bypassed with `--no-verify`
- **On PRs**: GitHub Actions workflow ([`.github/workflows/commitlint.yml`](.github/workflows/commitlint.yml)) - validates all commits in a PR

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

### Two-Step Release Process

This repository uses a **two-step release process** to ensure releases are reviewed before publication:

#### Step 1: Prepare Release (Automated)

When you merge a PR to `main`:

1. If tests pass, the **Prepare Release** workflow runs automatically
2. It analyzes commits using semantic-release to determine the next version
3. If a release is needed, it:
   - Creates a `release/vX.Y.Z` branch
   - Updates `CHANGELOG.md`, `package.json`, and `package-lock.json`
   - Commits the changes with message: `chore(release): X.Y.Z`
   - Creates a PR from `release/vX.Y.Z` to `main`

#### Step 2: Publish Release (On PR Merge)

When you **review and merge the release PR**:

1. The **Publish Release** workflow runs automatically
2. If it detects the `chore(release):` PR title and branch `release/v` then continues
3. Publishes the package to npm with OIDC authentication and provenance
4. Creates a GitHub release with auto-generated release notes
5. Creates a git tag (e.g., `v1.2.3`)

### Developer Workflow

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes with conventional commits
git commit -m "feat: add new awesome feature"

# 3. Push and create PR
git push origin feature/my-feature

# 4. Get PR approved and merge to main
# → Prepare Release workflow runs automatically
# → Creates release PR

# 5. Review the release PR
# - Check version number is correct
# - Review CHANGELOG.md entries
# - Verify package.json version

# 6. Merge the release PR
# → Publish Release workflow runs automatically
# → Package published to npm
# → GitHub release created
```

### Important Notes

- **No direct commits to main**: GitHub Actions do not commit directly to main.
- **Review before publish**: Every release must be reviewed via the release PR before publication.
- **Source branch validation**: Publish workflow only runs for PRs merged from `release/v*` branches and PR title starting with `chore(release)`. Direct commits to main will not trigger releases.


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

## NPM OIDC Configuration

This repository uses OIDC to authenticate with npm, eliminating the need for long-lived npm tokens.

### Prerequisites

- GitHub repository with Actions enabled
- npm account with publishing permissions

### Setup Steps

#### 1. Configure npm Package Access

On npmjs.com, configure the package to allow GitHub Actions:

1. Go to package settings: `https://www.npmjs.com/package/@scope/package-name/access`
2. Under "Trusted Publisher", add the GitHub repository: `owner/repo`

#### 2. Configure GitHub Actions Workflow

The **Release** workflow (`.github/workflows/release.yml`) includes:

```yaml
permissions:
  id-token: write  # Required for OIDC authentication with npm
```

The **Prepare Release** workflow does NOT need `id-token: write` since it only creates a PR and doesn't publish to npm.
