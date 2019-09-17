<template>
  <v-app>
    <!-- <v-card class="box-card" v-if="user">
            <div slot="header"><span>Timecards</span><span style="float: right; padding: 3px 0;">{{ user.getUsername() }}<v-btn style="margin-left: 16px;" type="text" @click="logout">Logout</v-btn></span></div>
            <timecard-list style="height: 50vh; margin-bottom: 16px;"></timecard-list>
            <timecard-form></timecard-form>
    </v-card>-->
    <!-- <div v-if="user">
        <Profile style="height: 50vh; margin-bottom: 16px;"></Profile>
            <timecard-form></timecard-form>
        </div>
    <login-form @login="onlogin" v-else/>-->
    <v-app-bar width="100%" elevation="0" height="20px" app>
      <title-bar />
    </v-app-bar>
    <transition name="fade">
      <div id="app" tabindex="0">
        <!-- <transition>
          <navbar />
        </transition>-->

        <transition name="route">
          <router-view :key="$route.params.id ? $route.params.id : $route.path" class="route" />
        </transition>

        <!-- <player-container v-if="isFinishedConnecting" /> -->

        <!-- <toast-overlay />d -->

        <!-- <portal-target slim name="modal" transition="transition-group" /> -->
        <!--  -->
        <!-- <about-modal /> -->

        <!-- <local-source-modal /> -->

        <!-- <edit-modal /> -->
      </div>
    </transition>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

// import Timecard from "@/models/Timecard";
// import Todo from "@/models/Todo";
import TitleBar from "@/components/TitleBar.vue";
// import TimecardList from "@/components/TimecardList.vue";
// import TodoList from "@/components/TodoList.vue";
// import Profile from "@/components/Profile.vue";
// import TimecardForm from "@/components/TimecardForm.vue";
// import LoginForm from "@/components/LoginForm.vue";/
// import RegisterForm from "@/components/RegisterForm.vue";

@Component({
  // components: { TimecardList, TitleBar, TodoList, Profile, LoginForm }
  components: { TitleBar }
})
export default class App extends Vue {
  user = this.$parse.user;

  onlogin() {
    this.user = this.$parse.user;
    console.log(this.$parse.user);
  }

  async logout() {
    await this.$parse.logOut();
    this.user = null;
  }
}
</script>
<style lang="scss">
html {
  overflow: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 0px; /* remove scrollbar space */
  background: transparent;
  /* optional: just make scrollbar invisible */
}
/* optional: show position indicator in red */
.v-toolbar__content,
.v-toolbar__extension {
  padding: 0px 0px;
  padding-top: 0px;
}
.v-app-bar {
  padding-top: 0px;
}
</style>