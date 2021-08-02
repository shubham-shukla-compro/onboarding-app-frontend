<template>
  <div class="add-task-form">
    <h3 class="add-task-form-title">Add a New Task</h3>
    <form>
      <label for="modules">Module</label>
      <input
        type="text"
        id="modules"
        class="add-task-input"
        v-model="taskDetail.module"
        placeholder="Enter module name..."
        required
      />
      <label for="contents">Contents</label>
      <textarea
        id="contents"
        class="add-task-input"
        cols="30"
        rows="10"
        placeholder="Enter Contents..."
        v-model="taskDetail.contents"
      ></textarea>
      <label for="duration">Duration(in days)</label>
      <input
        type="number"
        id="duration"
        class="add-task-input"
        v-model="taskDetail.duration"
        placeholder="Enter Duration..."
        required
      />
      <button class="add-task-btn" @click.prevent="onSave()">SAVE</button>
      <p v-show="submitted" class="text-save">Task is saved!</p>
      <p v-show="blank" class="text-blank">Please fill all the fields!</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskDetail: {
        module: '',
        contents: '',
        duration: '',
      },

      taskData: [],
      submitted: false,
      blank: false,
    };
  },
  methods: {
    onSave() {
      const taskFields = this.taskDetail;
      if (
        taskFields.module == '' ||
        taskFields.contents == '' ||
        taskFields.duration == ''
      ) {
        this.submitted = false;
        this.blank = true;
        return;
      }

      this.taskData = [...this.taskData, this.taskDetail];
      // console.log('clicked');
      let localData = JSON.parse(localStorage.getItem('task-data'));
      if (localData) {
        localData = [...localData, this.taskDetail];
        localStorage.setItem('task-data', JSON.stringify(localData));
      } else {
        localStorage.setItem('task-data', JSON.stringify(this.taskData));
      }
      this.blank = false;
      this.submitted = true;

      setTimeout(() => {
        this.$router.push('/');
      }, 3000);
    },
  },
};
</script>

<style scoped src="./styles.css"></style>
