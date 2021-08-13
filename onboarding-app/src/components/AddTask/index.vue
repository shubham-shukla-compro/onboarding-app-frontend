<template>
  <div>
    <router-link to="/" class="back-btn">
      <i class="fas fa-arrow-left"></i>
      Dashboard
    </router-link>
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
        <button
          class="add-task-btn"
          @click.prevent="onSave()"
          :disabled="submitted"
        >
          SAVE
        </button>
        <p v-show="submitted" class="text-save">Task is saved!</p>
        <p v-show="blank" class="text-blank">Please fill all the fields!</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
      if (this.$route.path.includes('/edit-task')) {
        this.updateData(this.$route.params.id, this.taskDetail);
      } else {
        this.postData(this.taskDetail);
      }
    },
    setEditFields(id) {
      this.getData(id);
    },

    async getData(id) {
      try {
        const res = await axios.get(`http://localhost:8000/tasks/${id}`);
        console.log(res.data);
        if (res.status === 200) {
          this.taskDetail = res.data[0];
        }
      } catch (err) {
        console.error(err.message);
      }
    },

    async postData(formData) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify(formData);
        const res = await axios.post(
          'http://localhost:8000/tasks',
          body,
          config
        );

        if (res.status === 201) {
          this.formReset();
        }
      } catch (err) {
        console.error(err.message);
      }
    },

    formReset() {
      this.blank = false;
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
      }, 4000);
    },
    async updateData(id, formData) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify(formData);
        const res = await axios.put(
          `http://localhost:8000/tasks/${id}`,
          body,
          config
        );
        console.log(res);
        if (res.status === 200) {
          this.formReset();
        }
      } catch (err) {
        console.log(err.message);
      }
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
