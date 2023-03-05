import type ProjectItem from './ProjectItem'

export default class Project {
    id: string;
    title: string;
    items: Array<ProjectItem>;

    constructor(id: string, title: string, items: Array<ProjectItem>) {
        this.id = id;
        this.title = title;
        this.items = items;
    }
}
