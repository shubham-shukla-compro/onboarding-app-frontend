<template>
  <div class="all-tasks-container">
    <h1 class="title">{{ title }}</h1>
    <div class="all-tasks-section">
      <router-link to="/add-task">
        <button class="all-tasks-section-btn">
          <i class="fas fa-plus"></i>
          Add Task
        </button>
      </router-link>
      <table class="all-tasks-table" border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>Module</th>
            <th>Contents</th>
            <th>Duration (in days)</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasksData" :key="task.id" v-show="!task.finished">
            <td>
              <input
                type="checkbox"
                :value="task"
                v-model="checkedTasks"
                @click="onClick(task)"
              />
            </td>
            <td>{{ task.module }}</td>
            <td>{{ task.contents }}</td>
            <td>{{ task.duration }}</td>
            <td>
              <router-link
                :to="{ path: '/edit-task/' + task.id }"
                class="all-task-edit-btn"
              >
                <i class="fas fa-edit"></i>
              </router-link>
              <button class="all-task-delete-btn" @click="onDelete(task.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
          <!-- completed -->
          <tr v-show="checkedTasks.length">
            <th colspan="5">Completed Tasks</th>
          </tr>
          <tr v-for="task in checkedTasks" :key="task.id">
            <td>
              <input
                type="checkbox"
                :value="task"
                v-model="checkedTasks"
                @click="onClick(task)"
              />
            </td>
            <td>{{ task.module }}</td>
            <td>{{ task.contents }}</td>
            <td>{{ task.duration }}</td>
            <td>
              <router-link
                :to="{ path: '/edit-task/' + task.id }"
                class="all-task-edit-btn"
              >
                <i class="fas fa-edit"></i>
              </router-link>
              <button class="all-task-delete-btn" @click="onDelete(task.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: 'OnBoarding Tasks',
      tasksData: [],
      checkedTasks: [],
    };
  },
  methods: {
    onClick(task) {
      task.finished = !task.finished;
      this.tasksData.map((tdata) => {
        if (tdata.id === task.id) {
          tdata = task;
        }
        return tdata;
      });
      this.updateData(task);
      return this.tasksData;
    },
    onDelete(index) {
      this.checkedTasks = this.checkedTasks.filter((ctask) => {
        return ctask.id !== index;
      });
      this.tasksData = this.tasksData.filter((tdata) => {
        return tdata.id !== index;
      });
      this.deleteData(index);
    },

    async getAllData() {
      try {
        const res = await axios.get('http://localhost:8000/tasks');
        if (res.status === 200) {
          const localData = res.data;
          if (localData) {
            this.tasksData = localData;
            localData.map((ldata) => {
              if (ldata.finished) {
                this.checkedTasks.push(ldata);
              }
              return this.checkedTasks;
            });
          }
        }
        // console.log(res.data);
        return this.tasksData;
      } catch (err) {
        console.error(err.message);
      }
    },

    async updateData(task) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify(task);
        const res = await axios.put(
          `http://localhost:8000/tasks/${task.id}`,
          body,
          config
        );
        if (res.status !== 200) {
          console.log(res);
        }
      } catch (err) {
        console.log(err.message);
      }
    },

    async deleteData(id) {
      try {
        const res = await axios.delete(`http://localhost:8000/tasks/${id}`);
        if (res.status === 200) {
          // this.getAllData();
        }
      } catch (err) {
        console.error(err.message);
      }
    },
  },

  created() {
    this.getAllData();
  },
};
</script>

<style scoped src="./styles.css"></style>
