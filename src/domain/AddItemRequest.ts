import type Project from "./Project";
import ProjectItem from "./ProjectItem";

interface AddItemResult {
    addProjectV2DraftIssue: {
        projectItem: {
            id: string,
            content: {
                title: string
            }
        }
    }
}

export default class AddItemRequest {
    static query = `mutation addDraft($projectId: ID!, $title: String!, $body: String)
    {
      addProjectV2DraftIssue(input: {projectId: $projectId title: $title body: $body}) {
        projectItem {
          id
          content {
            ... on DraftIssue {
                title
            }
          }
        }
      }
    }`;
    static params(token: string, project: Project, title: string, body: string = '') {
        return {
            projectId: project.id,
            title: title,
            body: body,
            headers: {
                authorization: `token ${token}`,
            }
        };
    }
    static parse(result: AddItemResult): ProjectItem {
        let item = result.addProjectV2DraftIssue.projectItem;
        return new ProjectItem(item.id, item.content.title);
    }

}
