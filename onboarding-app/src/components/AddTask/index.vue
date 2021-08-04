<template>
  <div class="add-task-form">
    <h3 class="add-task-form-title">{{ formTitle }}</h3>
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
        id: 0,
        module: '',
        contents: '',
        duration: '',
        finished: false,
      },
      taskData: [],
      submitted: false,
      blank: false,
      formTitle: 'Add a New Task',
    };
  },
  methods: {
    onSave() {
      const taskFields = this.taskDetail;
      if (
        taskFields.module === '' ||
        taskFields.contents === '' ||
        taskFields.duration === ''
      ) {
        this.submitted = false;
        this.blank = true;
        return;
      }
      this.taskData = [...this.taskData, this.taskDetail];
      let localData = JSON.parse(localStorage.getItem('task-data'));
      if (localData) {
        if (this.$route.path.includes('/edit-task')) {
          const index = Number(this.$route.params.id);
          localData = localData.map((ldata) => {
            if (ldata.id === index) {
              ldata = this.taskDetail;
            }
            return ldata;
          });
        } else {
          this.taskDetail.id = Math.floor(Math.random() * 10000);
          localData = [...localData, this.taskDetail];
        }
        localStorage.setItem('task-data', JSON.stringify(localData));
      } else {
        localStorage.setItem('task-data', JSON.stringify(this.taskData));
      }
      this.blank = false;
      this.submitted = true;
      this.taskDetail.module = '';
      this.taskDetail.contents = '';
      this.taskDetail.duration = '';

      setTimeout(() => {
        this.$router.push('/');
      }, 3000);
    },
    setEditFields(id) {
      const localData = JSON.parse(localStorage.getItem('task-data'));
      localData.map((ldata) => {
        if (ldata.id === Number(id)) {
          this.taskDetail = ldata;
        }
        return this.taskDetail;
      });
    },
  },

  watch: {
    $route(to, from) {
      if (to.path === '/add-task') {
        this.formTitle = 'Add a New Task';
        this.taskDetail.module = '';
        this.taskDetail.contents = '';
        this.taskDetail.duration = '';
      } else if (from.path === '/add-task') {
        this.formTitle = 'Edit Task';
      }
    },
  },

  created() {
    const path = this.$route.path;
    if (path.includes('/edit-task')) {
      this.formTitle = 'Edit Task';
      this.setEditFields(this.$route.params.id);
    }
  },
};
</script>

<style scoped src="./styles.css"></style>
