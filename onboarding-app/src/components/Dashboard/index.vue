<template>
  <div class="all-tasks-container">
    <h1 class="title">OnBoarding Tasks</h1>

    <div class="all-tasks-section">
      <!-- //*TODO Plus icon -->
      <router-link to="/add-task">
        <button class="all-tasks-section-btn" @click="onClick()">
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasksData" :key="task.id">
            <td>
              <input type="checkbox" />
            </td>
            <td>{{ task.module }}</td>
            <td>{{ task.contents }}</td>
            <td>{{ task.duration }}</td>
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
      tasksData: [
        {
          id: 0,
          module: 'OOPS',
          contents:
            'Oops concepts, Inheritance , Abstraction, Abstraction, Abstraction',
          duration: 1,
        },
        {
          id: 0,
          module: 'OOPS',
          contents: 'Oops concepts, Inheritance , Abstraction',
          duration: 1,
        },
        {
          id: 0,
          module: 'OOPS',
          contents: 'Oops concepts, Inheritance , Abstraction',
          duration: 1,
        },
        {
          id: 0,
          module: 'OOPS',
          contents: 'Oops concepts, Inheritance , Abstraction',
          duration: 1,
        },
        {
          id: 0,
          module: 'OOPS',
          contents: 'Oops concepts, Inheritance , Abstraction',
          duration: 1,
        },
      ],
    };
  },
  methods: {
    onClick() {
      console.log(this.testData);
    },
  },

  created() {
    let localData = JSON.parse(localStorage.getItem('task-data'));
    if (localData) {
      this.tasksData = localData;
    }
  },
};
</script>

<style scoped src="./styles.css"></style>
