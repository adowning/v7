<template>
<div>
   <v-data-table
    v-model="selected"
    item-key="id"
    :headers="headers"
    :items="todos"
    :items-per-page="5"
     show-select
    class="elevation-1"
     single-select="false"

  >
    <template  v-slot:item.data-table-select="{ item, select }">
        <v-simple-checkbox color="green" :value="item.finished" @input="update(item, $event)"></v-simple-checkbox>
      </template>
         <template v-slot:item.id="{ item }">
        {{ item.author.attributes.username }}
      </template>
        <template v-slot:item.author="{ item }">
        {{ item.author.attributes.username }}
      </template>
       <template v-slot:item.finished="item">
     
             <v-checkbox v-model="item.finished" :value="item.finished" ></v-checkbox>
          
      </template>
  
  </v-data-table>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Todo from "@/models/Todo";

import toastr from "toastr";
import { extend } from "vue-parse";

@Component({
    parse: {
        todos: extend({
            object: Todo,
            subscribe: true,
            // result: r => r.author.getUsername()
        })
        
    }
})
export default class extends Vue {
    data () {
      return {
headers:  [
    { text: 'title', align: 'center', sortable: false, value: 'title' },
    { text: 'author', align: 'center', sortable: false, value: 'author' },
    // { text: 'finished', align: 'center', sortable: false, value: 'finished' }
  ],
  selected:[]
     
      }}

    remove(todo: Todo) {
        try {
            todo.destroy();
            toastr.success(`${todo.id} successfully deleted`);
        } catch (e) {
            toastr.error(`Error while deleting todo: ${e.message}`);
        }
    }

    update(todo: Todo, state: boolean) {
        try {
            todo.finished = state;
            todo.save();
            toastr.success(`${todo.id} successfully updated`);
        } catch (e) {
            toastr.error(`Error while updating todo: ${e.message}`);
        }
    }
}
</script>
