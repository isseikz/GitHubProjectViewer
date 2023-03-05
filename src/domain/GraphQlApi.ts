// @ts-ignore
import { graphql } from "https://cdn.skypack.dev/@octokit/graphql";
import type Project from "./Project";
import { RecentProjects } from "./RecentProjects";
import { useTokenStore } from "@/stores/token";
import { AddItemRequest } from "./AddItemRequest";

async function getRecentProjects(firstProjects: number = 10, firstItems: number = 50): Promise<Array<Project>> {
    const auth = useTokenStore().read();
    let result = await graphql(RecentProjects.query, RecentProjects.params(auth.user, auth.token));
    return RecentProjects.parse(result)
}

async function postDraftToProject(title: string, project: Project) {
    const auth = useTokenStore().read();
    let result = await graphql(AddItemRequest.query, AddItemRequest.params(auth.token, project, title));
    return AddItemRequest.parse(result);
}

export {
    getRecentProjects, postDraftToProject
}
