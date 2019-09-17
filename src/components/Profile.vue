<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <v-layout column>
          <v-card>
            <v-card-text>
              <v-flex class="mb-4">
                <v-avatar size="96" class="mr-4">
                  <!-- <img
                    :src="'/avatars/avatar_' + (form.avatar.toLowerCase()) + '.png'"
                    alt="Avatar"
                  />-->
                </v-avatar>
                <!-- <v-btn @click="openAvatarPicker">Change Avatar</v-btn> -->
              </v-flex>
              <!-- <v-text-field v-model="form.firstName" label="FirstName"></v-text-field>
              <v-text-field v-model="form.lastName" label="Last Name"></v-text-field>
              <v-text-field v-model="form.contactEmail" label="Email Address"></v-text-field>-->
            </v-card-text>
            <v-card-actions>
              <!-- <v-btn color="primary" :loading="loading" @click.native="update">
                <v-icon left dark>check</v-icon>Save Changes
              </v-btn>-->
            </v-card-actions>
          </v-card>
        </v-layout>
        <!-- <avatar-picker
          v-model="showAvatarPicker"
          :current-avatar="form.avatar"
          @selected="selectAvatar"
        ></avatar-picker>-->
      </v-col>
      <v-col cols="6" md="4">
        <v-card class="mx-auto" color="#F9F9F9" max-width="400" min-width="300">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">Activities</v-list-item-title>
              <v-list-item-subtitle>{{ new Date() | moment("ddd, DD-MM") }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <!-- <v-row align="center">
            <v-col class="display-3" cols="6">23&deg;C</v-col>
            <v-col cols="6">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sun.png"
                alt="Sunny image"
                width="92"
              ></v-img>
            </v-col>
            </v-row>-->
          </v-card-text>

          <!-- <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-send</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-cloud-download</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>48%</v-list-item-subtitle>
          </v-list-item>-->

          <v-slider v-model="time" :max="6" :tick-labels="labels" class="mx-4" ticks></v-slider>

          <v-list class="transparent">
            <v-timeline align-top-right align-right dense>
              <v-list-item v-for="item in events" :key="item.objectId">
                <!-- <v-list-item-title>{{ item.day }}</v-list-item-title>

            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-subtitle class="text-right">{{ item.temp }}</v-list-item-subtitle>
                </v-list-item>-->
                <div :v-if="item.type == 'Timecard'">
                  <v-timeline-item :v-if="!clockOut" color="green" small>
                    <v-row justify="space-between">
                      <v-col>
                        <strong>Clock In</strong>
                      </v-col>
                      <v-col class="text-right">{{ item.clockInTime | moment("ddd DD-MM") }}</v-col>
                    </v-row>
                  </v-timeline-item>
                </div>
              </v-list-item>
            </v-timeline>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn outlined text>Adjust Time</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-col cols="6" md="4">
      <v-toolbar elevation="0">
        <v-spacer />
        <v-toolbar-title class="ml-5">{{ new Date() | moment("ddd DD-MM") }}</v-toolbar-title>
    </v-toolbar>-->

    <!-- <template>
        <v-timeline align-top-right align-right dense>
          <v-timeline-item color="green" small>
            <v-row justify="space-between">
              <v-col cols="7">
                <strong>Clock In</strong>
              </v-col>
              <v-col class="text-right" cols="5">08:04 EDT</v-col>
            </v-row>
          </v-timeline-item>
          <v-timeline-item
            v-for="event in timeline"
            :key="event.id"
            class="mb-4"
            color="blue"
            small
          >
            <v-row justify="space-between">
              <v-col cols="7" v-text="event.text"></v-col>
              <v-col class="text-right" cols="5" v-text="event.time"></v-col>
            </v-row>
          </v-timeline-item>
          <v-timeline-item color="red" small>
            <v-row justify="space-between">
              <v-col cols="7">
                <strong>Clock Out</strong>
              </v-col>
              <v-col class="text-right" cols="5">04:04 EDT</v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
    </template>-->
    <!-- </v-col> -->
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import moment from "moment";
import Event from "@/models/Event";

import toastr from "toastr";
import { extend } from "vue-parse";

@Component({
  parse: {
    events: extend({
      object: Event,
      subscribe: true
      // sort: (a.attributes.clockIn, b.attributes.clockIn ) => a.attributes.clockIn - b.attributes.clockIn
      // result: r => r.author.getUsername()
    })
  }
})
export default class extends Vue {
  data() {
    return {
      time: 0,
      labels: ["SU", "MO", "TU", "WED", "TH", "FR", "SA"],
      // headers: [
      //   { text: "Date", align: "left", sortable: true, value: "date" },
      //   { text: "Employee", align: "left", sortable: false, value: "employee" },
      //   {
      //     text: "Clock In",
      //     align: "center",
      //     sortable: false,
      //     value: "clockIn",
      //     sort: (a: any, b: any) => "number"
      //   },
      //   {
      //     text: "Clock Out",
      //     align: "center",
      //     sortable: false,
      //     value: "clockOut"
      //   }
      //   // { text: 'finished', align: 'center', sortable: false, value: 'finished' }
      // ],
      selected: [],
      expanded: [],
      singleExpand: false
    };
  }

  created() {
    console.log("sup");
  }
  // remove(event: Event) {
  //   console.log("remove");
  //   try {
  //     event.destroy();
  //     toastr.success(`${event.id} successfully deleted`);
  //   } catch (e) {
  //     toastr.error(`Error while deleting event: ${e.message}`);
  //   }
  // }

  update(event: Event, state: boolean) {
    if (!this.$parse.user.attributes.isManager) {
      toastr.error(`Only managers can approve Events`);
      return;
    }
    try {
      // event.approved = state;
      if (state == true && !event.attributes.clockOut) {
        toastr.error(`Cannot approve active Events`);
        return;
      }
      event.save();
      toastr.success(`${event.id} successfully updated`);
    } catch (e) {
      toastr.error(`Error while updating event: ${e.message}`);
    }
  }
}
</script>
