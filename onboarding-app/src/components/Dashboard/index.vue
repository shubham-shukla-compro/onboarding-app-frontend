<template>
  <div class="all-tasks-container">
    <h1 class="title">OnBoarding Tasks</h1>
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
          <tr
            v-for="(task, index) in tasksData"
            :key="index"
            :class="{ disabledStyle: task.finished }"
          >
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
              <button class="all-task-delete-btn" @click="onDelete(index)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
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
export default {
  data() {
    return {
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
      localStorage.setItem('task-data', JSON.stringify(this.tasksData));
      return this.tasksData;
    },
    onDelete(index) {
      this.tasksData = this.tasksData.filter((tdata) => {
        return tdata.id != index;
      });
      this.checkedTasks = this.checkedTasks.filter((ctask) => {
        return ctask.id != index;
      });
      localStorage.setItem('task-data', JSON.stringify(this.tasksData));
    },
  },

  created() {
    const localData = JSON.parse(localStorage.getItem('task-data'));
    if (localData) {
      this.tasksData = localData;
      localData.map((ldata) => {
        if (ldata.finished) {
          this.checkedTasks.push(ldata);
        }
        return this.checkedTasks;
      });
    }
  },
};
</script>

<style scoped src="./styles.css"></style>
