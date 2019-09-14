<template >
<v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12" >
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
                  id="name"
                  v-model="user.name"
                    label="Login"
                    name="name"
                    prepend-icon="mdi-face"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="pass"
                v-model="user.pass"

                    label="Password"
                    name="pass"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="$router.push({ path: 'register' })">Register</v-btn>

                <div class="flex-grow-1"></div>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
            <!-- <v-card class="elevation-12" v-else>
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Registration form</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                  id="name"
                  v-model="user.name"
                    label="Login"
                    name="name"
                    prepend-icon="mdi-face"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="pass"
                v-model="user.pass"

                    label="Password"
                    name="pass"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card> -->
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { User } from "parse";
import toastr from "toastr";

@Component({})
export default class LoginForm extends Vue {
    user = {
        name: "",
        pass: ""
    };
 data () {
      return {
          register: false
      }
      }
    async login() {
        try {
            await this.$parse.logIn(this.user.name, this.user.pass);
            this.$emit("login");
            toastr.success(`Successfully authorized`);
        } catch (e) {
            toastr.error(`Authorization error: ${e.message}`);
        }
    }

    async create() {
        try {
            const user = new User();
            user.setUsername(this.user.name);
            user.setPassword(this.user.pass);
            await user.save();
            this.login();
            toastr.success(`Successfully registered`);
        } catch (e) {
            toastr.error(`Registration error: ${e.message}`);
        }
    }
}
</script>
