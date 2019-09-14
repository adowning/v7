<template>
    <v-container fluid>
         <v-row
      
      :key="n"
      :class="n === 1 ? 'mb-6' : ''"
      no-gutters
    >
      <v-col
      >
        <v-layout column>
            <v-card>
                <v-card-text>
                    <v-flex class="mb-4">
                        <v-avatar size="96" class="mr-4">
                            <img :src="'/avatars/avatar_' + (form.avatar.toLowerCase()) + '.png'" alt="Avatar">
                        </v-avatar>
                        <v-btn @click="openAvatarPicker">Change Avatar</v-btn>
                    </v-flex>
                    <v-text-field
                        v-model="form.firstName"
                        label="FirstName"></v-text-field>
                    <v-text-field
                        v-model="form.lastName"
                        label="Last Name"></v-text-field>
                    <v-text-field
                        v-model="form.contactEmail"
                        label="Email Address"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" :loading="loading" @click.native="update">
                        <v-icon left dark>check</v-icon>
                        Save Changes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
        <avatar-picker
            v-model="showAvatarPicker"
            :current-avatar="form.avatar"
            @selected="selectAvatar"></avatar-picker>
     </v-col>
      <v-col>

          <template>


      <v-timeline
        align-top-right
        align-right
        dense
      >
        <v-timeline-item
          color="green"
          small
        >
          <!-- <v-row class="pt-1">
            <v-col cols="2">
              <strong>8:05am</strong>
            </v-col>
            <v-col>
              <strong>Friday 08/09</strong>
             <div class="caption">Mobile App</div> 
            </v-col>
          </v-row> -->
<v-row justify="space-between">
            <v-col cols="7" ><strong>Clock In</strong></v-col>
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
        <v-timeline-item
          color="red"
          small
        >
            <v-row justify="space-between">
            <v-col cols="7" ><strong>Clock Out</strong></v-col>
            <v-col class="text-right" cols="5">04:04 EDT</v-col>
          </v-row>
            <!-- <v-col cols="2">
              <strong>4:35pm</strong>
            </v-col> -->

           </v-timeline-item>

      </v-timeline>

</template>
</v-col>
          </v-row>

    </v-container>
    
</template>

<script>
    import AvatarPicker from '@/components/AvatarPicker'
    export default {
        pageTitle: 'My Profile',
        components: { AvatarPicker },
        data () {
            return {
                loading: false,
                form: {
                    firstName: 'John',
                    lastName: 'Doe',
                    contactEmail: 'john@doe.com',
                    avatar: 'MALE_CAUCASIAN_BLOND_BEARD'
                },
                showAvatarPicker: false,
                events: [{id: 1, text: 'a job', time: "15:26 EDT"}],
            }
        },
         computed: {
      timeline () {
        return this.events.slice().reverse()
      },
         },
        methods: {
             comment () {
        const time = (new Date()).toTimeString()
        this.events.push({
          id: this.nonce++,
          text: this.input,
          time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
            return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
          }),
        })

        this.input = null
      },
            openAvatarPicker () {
                this.showAvatarPicker = true
            },
            selectAvatar (avatar) {
                this.form.avatar = avatar
            }
        }
    }
</script>