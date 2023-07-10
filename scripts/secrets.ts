export function getNpmToken() {
  return process.env.DATA_SCRIPTS_NPM_TOKEN;
}

/**
 * This token is from the Ionic org and allows access to private repos like @ionic-enterprise
 * as well as all other public packages
 */
export function getGitHubToken() {
  return process.env.DATA_SCRIPTS_GITHUB_TOKEN;
}

export function secretList(): string {
  return 'DATA_SCRIPTS_NPM_TOKEN, DATA_SCRIPTS_GITHUB_TOKEN';
}

export function checkSecretsAreSet(): boolean {
  if (!getNpmToken()) {
    console.error(`DATA_SCRIPTS_NPM_TOKEN is undefined`);
    return false;
  }
  if (!getGitHubToken()) {
    console.error(`DATA_SCRIPTS_GITHUB_TOKEN is undefined`);
    return false;
  }
  return true;
}
