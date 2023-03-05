<template>
    <div id="project-items-view">
      <h1 class="title">GitHub Projects</h1>
      <div class="projects-list">
        <div class="project-card" v-for="project, index in projects" :key="project.id">
          <!-- <router-link :to="{ name: 'project', params: { id: project.id } }"> -->
            <div class="project-card-content">
              <div class="project-name">{{ project.title }}</div>
              <!-- <div class="project-description">{{ project.description }}</div> -->
              <div class="project-items-count">{{ project.items.length }} items</div>
            </div>
          <!-- </router-link> -->
          <div class="items-list">
            <div class="item-card" v-for="item in project.items" :key="item.id">
              <!-- <router-link :to="{ name: 'item', params: { projectId: project.id, itemId: item.id } }"> -->
                <div class="item-card-content">
                  <div class="item-title">{{ item.title }}</div>
                </div>
              <!-- </router-link> -->
            </div>
            <div class="add-item">
                <form @submit.prevent="createItem(index, project)">
                    <input type="text" v-model="itemForms[index]" placeholder="New item title">
                    <button type="submit">Add Item</button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.title {
  text-align: center;
  margin-top: 1rem;
}

.projects-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.project-card {
  margin: 1rem;
  width: 100%;
  background-color: #f1f1f1;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12), 0 6px 10px rgba(0, 0, 0, 0.24);
}

.project-card-content {
  padding: 1rem;
}

.project-name {
  font-size: 1.25rem;
  font-weight: bold;
}

.project-description {
  margin-top: 0.5rem;
  font-size: 1rem;
}

.project-items-count {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #999;
}

.items-list {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.item-card {
  margin: 0.5rem;
  width: 100%;
  height: 75px;
  background-color: #f1f1f1;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0,0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
cursor: pointer;
}

.item-card:hover {
transform: translateY(-3px);
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12), 0 6px 10px rgba(0, 0, 0, 0.24);
}

.item-card-content {
padding: 0.5rem;
}

.item-title {
font-size: 1rem;
font-weight: bold;
}

.add-item {
  margin-top: 20px;
}

.add-item input {
  padding: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  margin-right: 10px;
}

.add-item button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #2c3e50;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

/* Media Query for PC */
@media only screen and (min-width: 1024px) {

  .items-list {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr;
    margin-top: 10px;
  }
}
</style>
  
<script lang="ts">
import type Project from '@/domain/Project'
import ProjectItem from '@/domain/ProjectItem';
import { useTokenStore } from '@/stores/token';
import { getRecentProjects, postDraftToProject } from "../domain/GraphQlApi"

export default {
    name: 'ProjectItems',
    data() {
        return {
            projectId: 5,
            projects: Array<Project>(),
            itemForms: Array<string>()
        }
    },
    async mounted() {
        const tokenStore = useTokenStore()
        try {
            let auth = tokenStore.read();
            this.updateItems();
        } catch (error) {
            console.error(error);
            tokenStore.reset()
            this.$router.push('/login')
        }
    },
    methods: {
        async updateItems() {
            return await getRecentProjects().then( projects => {
                console.log(projects)
                this.projects = projects;
                this.itemForms = new Array<string>(projects.length);
            });
        },
        async createItem(index: number, project: Project) {
            return await postDraftToProject(this.itemForms[index], project).then(() => {
                this.updateItems();
            });
        }
    },
};

</script>
  