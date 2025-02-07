# Repo Build Number

This action automatically increments and returns the build number for a given 
repository. The build number is stored in the `BUILD_NUMBER` repository variable.

## Usage

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Get Build Number
        uses: rozd/build-number-github-action@v1
        id: build-number
        with:
          github-token: ${{ secrets.REPO_MANAGE_VARS_TOKEN }}
      - name: Echo Build Number
        run: echo "Build number is ${{ steps.build-number.outputs.build-number }}"
```

## Inputs

### `github-token`
A GitHub token with the read/write repository permissions for "Variables".
#### Create fine-grained personal access token
1. In the upper-right corner of any page on GitHub, click your profile photo, then click  **Settings**.
2. In the left sidebar, click **Developer settings**.
3. In the left sidebar, click **Personal access tokens**, click **Fine-grained tokens**.
4. Click **Generate new token**.
5. Under **Token name**, enter a name for the token, for example `{{repo-name}}-manage-repo-vars`.
6. Under **Resource owner**, select the organization or user that owns the repository, if you don't see the organization or user you want to select, you may need to [Enroll the organization in the beta program for fine-grained PAT](#enroll-the-organization-in-the-beta-program-for-fine-grained-personal-access-tokens).
7. Under **Expiration**, select the expiration date for the token.
8. Under **Repository access**, select the repositories where you want to use the token.
9. Under **Permissions**, select the **Repository permissions** and select the _Read and write_ access level for the **Variables** permission.
10. Click **Generate token**.
11. Copy the token to your clipboard.
12. Navigate to the repository or the organization where you want to store the token and click **Settings**.
13. In the left sidebar, click **Secrets and variables** and click **Actions**.
14. Click **New repository secret**/**New organization secret**.
15. Under **Name**, enter `REPO_MANAGE_VARS_TOKEN`.
16. Under **Value**, paste the token you copied.
17. For the organization make sure you selected the repo in the **Repository access** dropdown.
18. Click **Add secret**.

#### Enroll the organization in the beta program for fine-grained personal access tokens
1. In the upper-right corner of any page on GitHub, click your profile photo, then click  **Your organizations**.
2. In the list of organizations, click the organization where the repository is located.
3. In the organization's tab bar, click **Settings**.
4. In the left sidebar, click **Personal access tokens**.
5. Enroll the organization in the beta program for fine-grained personal access tokens.

Useful links:
* https://github.blog/security/application-security/introducing-fine-grained-personal-access-tokens-for-github/
* https://docs.github.com/en/organizations/managing-programmatic-access-to-your-organization/setting-a-personal-access-token-policy-for-your-organization
* https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token

### `debug`
Prints debug information if set to `true`.

## Outputs
### `build-number`
The build number incremented by 1.
