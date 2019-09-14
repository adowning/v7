<template >
            <div>
               <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <div class="flex-grow-1"></div>
             
              
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                  v-model="todo.title"
                    label="Title"
                    name="title"
                    prepend-icon="mdi-face"
                    type="text"
                  ></v-text-field>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary"@click="create()">Create</v-btn>
              </v-card-actions>
            </v-card>

            </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Todo from "@/models/Todo";

import toastr from "toastr";
import { User, Cloud } from "parse";

@Component({})
export default class TodoForm extends Vue {
    todo = { title: "" };

    async create() {
        try {
            const todo = await this.$parse.run("createTodoForUser", this.todo);
            toastr.success(`${todo.id} successfully created`);
        } catch (e) {
            toastr.error(`Error while creating todo: ${e.message}`);
        }
    }
}
</script>
