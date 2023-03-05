import Project from "./Project";
import ProjectItem from "./ProjectItem";

export class RecentProjects {
    static query = `query projects($owner: String!, $projects: Int!, $items: Int!)
    {
        user(login: $owner){
            recentProjects(first: $projects) {
                nodes {
                    ... on ProjectV2{
                        title
                        shortDescription
                        readme
                        id
                        items(first: $items) {
                            nodes {
                                ... on ProjectV2Item {
                                    id
                                    content {
                                        ... on DraftIssue {
                                            title
                                        }
                                        ... on Issue {
                                            title
                                        }
                                        ... on PullRequest {
                                            title
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }`;
    static params(owner: string, token: string, firstProjects: number = 10, firstItems: number = 50) {
        return {
            owner: owner,
            projects: firstProjects,
            items: firstItems,
            headers: {
                authorization: `token ${token}`,
            },
        };
    }
    static parse(result: any): Array<Project> {
        console.log(result);
        return result.user.recentProjects.nodes.map((project: { id: string; title: string; items: { nodes: any[]; }; }) => new Project(
            project.id, project.title, project.items.nodes
                .filter((item: { content: { title: null; } | null; }) => item.content != null && item.content.title != null)
                .map((item: { id: string; content: { title: string; }; }) => {
                    return new ProjectItem(item.id, item.content.title);
                }
                )));
    }

}
