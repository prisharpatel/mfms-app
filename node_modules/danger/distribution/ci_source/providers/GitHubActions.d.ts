import { Env, CISource } from "../ci_source";
/**
 * ### CI Setup
 *
 * To use Danger JS with GitHub Actions, you'll need want to set up
 * Danger to run on a `pull_request` webhook. To do this, you'll need
 * to add/amend your repo's workflow file with something like:
 *
 * ```
 * workflow "Dangerfile JS Eval" {
 *   on = "pull_request"
 *   resolves = "Danger JS"
 * }
 *
 * action "Danger JS" {
 *   uses = "danger/danger-js"
 *   secrets = ["GITHUB_TOKEN"]
 * }
 * ```
 *
 * You can pass additional CLI to Danger JS in an action via:
 *
 * ```
 * action "Danger JS" {
 *   [...]
 *   args = "--dangerfile artsy/peril-settings/org/allPRs.ts"
 * }
 * ```
 *
 * This runs the file [`org/allPRs.ts`](https://github.com/artsy/peril-settings/blob/master/org/allPRs.ts)
 * from the repo [artsy/peril-settings](https://github.com/artsy/peril-settings).
 *
 * ### Token Setup
 *
 * You need to make sure that the secret `"GITHUB_TOKEN"` is
 * enabled in your workspace. This is so that Danger can connect
 * to GitHub.
 *
 * ```
 * action "Danger JS" {
 *   uses = "danger/danger-js"
 *   secrets = ["GITHUB_TOKEN"]
 * }
 * ```
 *
 */
export declare class GitHubActions implements CISource {
    private readonly env;
    private event;
    constructor(env: Env);
    readonly name: string;
    readonly isCI: boolean;
    readonly isPR: boolean;
    readonly useEventDSL: boolean;
    readonly pullRequestID: string;
    readonly repoSlug: string;
}
