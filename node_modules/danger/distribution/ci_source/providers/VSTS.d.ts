import { Env, CISource } from "../ci_source";
/**
 * ### CI Setup
 *
 * You'll need to add a build step and set the custom command to `[run_command]`.
 *
 * Danger only supports using VSTS with GitHub as the repository, Danger doesn't yet support VSTS as a repository
 * platform for providing feedback
 *
 *  ### Token Setup
 *
 *  You need to add the `DANGER_GITHUB_API_TOKEN` environment variable
 */
export declare class VSTS implements CISource {
    private readonly env;
    constructor(env: Env);
    readonly name: string;
    readonly isCI: boolean;
    readonly isPR: boolean;
    readonly pullRequestID: string;
    readonly repoSlug: string;
}
