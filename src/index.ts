import * as core from '@actions/core';
import {context, getOctokit} from "@actions/github";
import {OctokitOptions} from "@octokit/core/dist-types/types";

main().catch(err => {
  console.error(err);
  core.setFailed(`Unhandled error: ${err}`);
});

async function main() {
  const token = core.getInput('github-token', {required: true});
  const debug = core.getBooleanInput('debug');

  const opts: OctokitOptions = {
    log: debug ? console : undefined,
  };

  const github = getOctokit(token, opts);

  let buildNumber = 1;

  try {
    const res = await github.rest.actions.getRepoVariable({
      owner: context.repo.owner,
      repo: context.repo.repo,
      name: 'BUILD_NUMBER',
    });

    if (res.status >= 200 && res.status < 300 && !!res.data.value) {
      buildNumber = parseInt(res.data.value);
      if (isNaN(buildNumber)) {
        buildNumber = 1;
      }
      buildNumber++;
    }

  } catch (error: any) {
    if (error.status === 404) {
      buildNumber = 1;
    } else {
      if (debug) {
        console.error(error);
      }
      core.setFailed(`Error retrieving build number: ${error.message}`);
      return;
    }
  }

  try {
    await github.rest.actions.updateRepoVariable({
      owner: context.repo.owner,
      repo: context.repo.repo,
      name: 'BUILD_NUMBER',
      value: buildNumber.toString(),
    });
  } catch (error: any) {
    if (error.status === 404) {
      try {
        await github.rest.actions.createRepoVariable({
          owner: context.repo.owner,
          repo: context.repo.repo,
          name: 'BUILD_NUMBER',
          value: buildNumber.toString(),
        });
      } catch (createError: any) {
        if (debug) {
          console.error(createError);
        }
        core.setFailed(`Error creating build number: ${createError.message}`);
        return;
      }
    } else {
      if (debug) {
        console.error(error);
      }
      core.setFailed(`Error updating build number: ${error.message}`);
      return;
    }
  }

  core.setOutput('build-number', buildNumber.toString());
}
