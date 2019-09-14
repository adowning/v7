<template>
<div>
   <v-data-table
    v-model="selected"
    item-key="id"
    :headers="headers"
    :items="timecards"
        :expanded.sync="expanded"
    :single-expand="singleExpand"
    show-expand

    :items-per-page="12"
     show-select
    class="elevation-1"
     :single-select="true"

  >
   <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length">Peek-a-boo!</td>
    </template>
    <template  v-slot:item.data-table-select="{ item, select }">
        <v-simple-checkbox v-if="item.attributes.clockOut" color="green" :value="item.approved" @input="update(item, $event)"></v-simple-checkbox>
        <!-- <v-chip color="green" small v-else>approved</v-chip> -->
      </template>
        <template v-slot:item.date="{ item }">
        {{ item.attributes.clockIn | moment("ddd MM")  }}
      </template>
        <template v-slot:item.employee="{ item }">
        {{ item.employee.attributes.username }}
      </template>
             <template v-slot:item.clockIn="{ item }">
        {{ item.attributes.clockIn | moment("HH:MM")  }}
      </template>
      
     <template v-slot:item.clockOut="{ item }">
        {{ item.attributes.clockOut | moment("HH:MM")  }}
      </template>

      <template v-slot:expanded-item="{ item }">
      <td :colspan="headers.length"> clock in location: {{ item.attributes.clockInLocation }} out location: {{ item.attributes.clockOutLocation }} device: {{ item.attributes.device }} method: {{ item.attributes.method }}</td>
    </template>

  </v-data-table>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import moment from 'moment'
import Timecard from "@/models/Timecard";

import toastr from "toastr";
import { extend } from "vue-parse";

@Component({
    parse: {
        timecards: extend({
            object: Timecard,
            subscribe: true,
            // sort: (a.attributes.clockIn, b.attributes.clockIn ) => a.attributes.clockIn - b.attributes.clockIn
            // result: r => r.author.getUsername()
        })
        
    }
})
export default class extends Vue {
    data () {
      return {
headers:  [
    { text: 'Date', align: 'left', sortable: true, value: 'date' },
    { text: 'Employee', align: 'left', sortable: false, value: 'employee' },
    { text: 'Clock In', align: 'center', sortable: false, value: 'clockIn', sort: (a: any, b: any) => 'number' },
    { text: 'Clock Out', align: 'center', sortable: false, value: 'clockOut' },
    // { text: 'finished', align: 'center', sortable: false, value: 'finished' }
  ],
  selected:[],
          expanded: [],
        singleExpand: false,

     
      }}

    remove(timecard: Timecard) {
        try {
            timecard.destroy();
            toastr.success(`${timecard.id} successfully deleted`);
        } catch (e) {
            toastr.error(`Error while deleting timecard: ${e.message}`);
        }
    }

    update(timecard: Timecard, state: boolean) {
        if(!this.$parse.user.attributes.isManager){
            toastr.error(`Only managers can approve Timecards`);
            return
        }
        try {
            timecard.approved = state;
            if(state == true && !timecard.attributes.clockOut ){
            toastr.error(`Cannot approve active Timecards`);
            return
            }
            timecard.save();
            toastr.success(`${timecard.id} successfully updated`);
        } catch (e) {
            toastr.error(`Error while updating timecard: ${e.message}`);
        }
    }
}
</script>
