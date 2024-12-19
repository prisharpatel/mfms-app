import { Env, CISource } from "../ci_source";
/**
 * ### CI Setup
 *  1. Log in to your Netlify account and add the `DANGER_GITHUB_API_TOKEN`
 *  environment variable to your site's deploy settings.
 *  `https://app.netlify.com/sites/[site-name]/settings/deploys#build-environment-variables`.
 *
 *  2. Prepend `yarn danger ci && ` to your build command in the Netlify web UI
 *  or in your netlify.toml. For example, `yarn danger ci && yarn build`
 */
export declare class Netlify implements CISource {
    private readonly env;
    constructor(env: Env);
    readonly name: string;
    readonly isCI: boolean;
    readonly isPR: boolean;
    readonly pullRequestID: string;
    readonly repoSlug: string;
}
