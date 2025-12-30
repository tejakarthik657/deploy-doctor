# Deploy Doctor - Release Process

## Prerequisites

1. **npm Account**: Create account at https://www.npmjs.com/
2. **VS Code Publisher**: Create publisher account at https://marketplace.visualstudio.com/
3. **GitHub Repository**: Set up at https://github.com/yourusername/deploy-doctor

## Step 1: Set Up Repository

```bash
# Create GitHub repository
# Clone locally
git clone https://github.com/yourusername/deploy-doctor.git
cd deploy-doctor

# Copy project files
# Commit initial code
git add .
git commit -m "Initial commit"
git push origin main
```

## Step 2: Configure Publishing Accounts

### npm Configuration
```bash
npm login
# Enter your npm credentials
```

### VS Code Marketplace
```bash
npm install -g @vscode/vsce
vsce login <publisher-name>
# Follow authentication prompts
```

## Step 3: Build All Packages

```bash
# Install dependencies
npm install

# Build all packages
npm run build
```

## Step 4: Publish Core Package

```bash
cd packages/core
npm publish --access public
cd ../..
```

## Step 5: Publish CLI Package

```bash
cd packages/cli
npm publish
cd ../..
```

## Step 6: Publish VS Code Extension

```bash
cd vscode-extension
vsce publish
cd ..
```

## Step 7: Create GitHub Release

```bash
# Create version tag
git tag v0.1.0
git push origin v0.1.0

# Create release on GitHub
# Go to https://github.com/yourusername/deploy-doctor/releases
# Create new release with tag v0.1.0
# Add release notes
```

## Step 8: Update Documentation

- Update README.md with installation instructions
- Update repository URLs in package.json files
- Add badges for npm and marketplace

## Verification

### CLI Installation
```bash
npm install -g deploy-doctor
deploy-doctor --help
```

### VS Code Extension
Search for "Deploy Doctor" in VS Code marketplace and install.

## Maintenance

### Updating Packages
```bash
# Update version in package.json
npm version patch  # or minor/major

# Rebuild and republish
npm run build
npm run release  # Custom script to publish all
```

### Remote Rule Updates
Set up GitHub repository for rules:
```
.github/
  workflows/
    update-rules.yml  # Auto-sync rules on PR merge
```

## Troubleshooting

### npm Publish Issues
- Ensure version is unique
- Check package name availability
- Verify build output exists

### VS Code Extension Issues
- Check publisher permissions
- Verify package.json metadata
- Ensure icon file exists (if specified)

### Common Errors
- **403 Forbidden**: Check npm login status
- **EPUBLISHCONFLICT**: Increment version number
- **Missing Files**: Ensure build completed successfully