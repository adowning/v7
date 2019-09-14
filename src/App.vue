<template>
<v-app>
        <!-- <v-card class="box-card" v-if="user">
            <div slot="header"><span>Timecards</span><span style="float: right; padding: 3px 0;">{{ user.getUsername() }}<v-btn style="margin-left: 16px;" type="text" @click="logout">Logout</v-btn></span></div>
            <timecard-list style="height: 50vh; margin-bottom: 16px;"></timecard-list>
            <timecard-form></timecard-form>
        </v-card> -->
        <div v-if="user">
        <Profile style="height: 50vh; margin-bottom: 16px;"></Profile>
            <!-- <timecard-form></timecard-form> -->
        </div>
        <login-form @login="onlogin" v-else/>
        <!-- <v-btn style="margin-left: 16px;" type="text"  @click="onlogin">Logout</v-btn> -->
     
</v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Timecard from "@/models/Timecard";
import Todo from "@/models/Todo";

import TimecardList from "@/components/TimecardList.vue";
import TodoList from "@/components/TodoList.vue";
import Profile from "@/components/Profile.vue";
import TimecardForm from "@/components/TimecardForm.vue";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

@Component({ components: { TimecardList,TodoList, Profile, LoginForm } })
export default class App extends Vue {
    user = this.$parse.user;

    onlogin() {
        this.user = this.$parse.user;
        console.log(this.$parse.user)
    }

    async logout() {
        await this.$parse.logOut();
        this.user = null;
    }
}
</script>
