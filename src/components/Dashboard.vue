<template>
  <div id="dashboard">
    <div class="row">
      <div class="col s4" style="padding-top: 2%; " >
        <vc-date-picker class="" v-model='date' color="teal" is-dark />
      </div>
      <div class="input-field col s4 right">
        <select @change="onChange($event)"  v-model='filter'>
          <option value="" disabled selected>Choose your option</option>
          <option value="1" >Normal</option>
          <option value="2" >Stacked</option>
          <option value="3" >Sprint Progress</option>
        </select>
        <label>View</label>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <div v-if="this.normalView == true">
          <div v-for="user in users" v-if="user.today && user.yesterday != null">
            <div class="row">
              <div class="col m4">
                <h4 class="card-title">{{user.name}} {{user.lastName}}</h4>
              </div>
              <div class="col m4 right" style="padding-top: 13px">
                <h5>{{user.timeStampDate}} @ {{user.timeStamp}}</h5>
              </div>
            </div>
            <div class="row">
              <hr width="50%" color="red">
              <div class="col m4">
                <div class="card">
                  <div class="card-content">
                    <i class="fa fa-line-chart fa-lg"  style="color:#FB7179; font-size: 40px"></i>
                    <span class="card-title" style="padding-top:5%; font-weight: bold">What I did Yesterday</span>
                    <p v-html="user.yesterday" v-linkified class="" style="white-space: pre-line; font-size: 20px; " > {{user.yesterday}} </p>
                  </div>
                  <div class="card-content">
                      <i class="fa fa-arrow-circle-right" style="color:#5E2CED; font-size: 40px"></i>
                  </div>
                </div>
              </div>
              <div class="col m4">
                <div class="card" style="">
                  <div class="card-content">
                    <i class="fa fa-rocket fa-lg"  style="color:#08CA9F; font-size: 40px"></i>
                    <span class="card-title" style="padding-top:5%; font-weight: bold">Today's Agenda</span>
                    <p  v-html="user.today" v-linkified style="white-space: pre-line; font-size: 20px;" > {{user.today}} </p>
                  </div>
                  <div class="card-content">
                      <i class="fa fa-arrow-circle-right" style="color:#5E2CED; font-size: 40px"></i>
                  </div>
                </div>
              </div>
              <div class="col m4">
                <div class="card">
                  <div class="card-content">
                    <i class="fa fa-times fa-lg"  style="color:#F6BA18; font-size: 40px"></i>
                    <span class="card-title" style="padding-top:5%; font-weight: bold">Road Blocks</span>
                    <p v-html="user.blocks" v-linkified style="white-space: pre-line; font-size: 20px;"> {{user.blocks}} </p>
                  </div>
                  <div class="card-content">
                      <i class="fa fa-arrow-circle-right" style="color:#5E2CED; font-size: 40px"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="this.stackView == true">
          <div v-for="user in users" v-if="user.today && user.yesterday != null">
            <div class="row">
              <div class="col m4">
                <h4 class="card-title">{{user.name}} {{user.lastName}}</h4>
              </div>
              <div class="col m4 right" style="padding-top: 13px">
                <h5>{{user.timeStampDate}} @ {{user.timeStamp}}</h5>
              </div>
            </div>
            <div class="row">
              <hr width="50%" color="red">
              <div class="">
                <div class="card">
                  <div class="card-content">
                    <i class="fa fa-line-chart fa-lg"  style="color:#FB7179; font-size: 40px"></i>
                    <span class="card-title" style="padding-top:5%; font-weight: bold">What I did Yesterday</span>
                    <p v-html="user.yesterday" v-linkified class="" style="white-space: pre-line; font-size: 20px; " > {{user.yesterday}} </p>
                  </div>
                  <div class="card-content">
                      <i class="fa fa-arrow-circle-down" style="color:#5E2CED; font-size: 40px"></i>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="card" style="">
                  <div class="card-content">
                    <i class="fa fa-rocket fa-lg"  style="color:#08CA9F; font-size: 40px"></i>
                    <span class="card-title" style="padding-top:5%; font-weight: bold">Today's Agenda</span>
                    <p  v-html="user.today" v-linkified style="white-space: pre-line; font-size: 20px;" > {{user.today}} </p>
                  </div>
                  <div class="card-content">
                      <i class="fa fa-arrow-circle-down" style="color:#5E2CED; font-size: 40px"></i>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="card">
                  <div class="card-content">
                    <i class="fa fa-times fa-lg"  style="color:#F6BA18; font-size: 40px"></i>
                    <span class="card-title" style="padding-top:5%; font-weight: bold">Road Blocks</span>
                    <p v-html="user.blocks" v-linkified style="white-space: pre-line; font-size: 20px;"> {{user.blocks}} </p>
                  </div>
                  <div class="card-content">
                      <i class="fa fa-arrow-circle-down" style="color:#5E2CED; font-size: 40px"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="this.sprintProgress == true">
          <div v-for="user in users" v-if="user.today && user.yesterday != null">
            <h4 class="card-title">{{user.name}} {{user.lastName}}</h4>
            <div class="row">
              <hr width="50%" color="red">
              <div class="">
                <div class="card">
                  <div class="card-content">
                    <i class="fa fa-line-chart fa-lg"  style="color:#FB7179; font-size: 40px"></i>
                    <span class="card-title" style="padding-top:5%; font-weight: bold">What I did Yesterday</span>
                    <p v-html="user.yesterday" v-linkified class="" style="white-space: pre-line; font-size: 20px; " > {{user.yesterday}} </p>
                  </div>
                  <div class="card-content">
                      <i class="fa fa-arrow-circle-right" style="color:#5E2CED; font-size: 40px"></i>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="card" style="">
                  <div class="card-content">
                    <i class="fa fa-rocket fa-lg"  style="color:#08CA9F; font-size: 40px"></i>
                    <span class="card-title" style="padding-top:5%; font-weight: bold">Today's Agenda</span>
                    <p  v-html="user.today" v-linkified style="white-space: pre-line; font-size: 20px;" > {{user.today}} </p>
                  </div>
                  <div class="card-content">
                      <i class="fa fa-arrow-circle-right" style="color:#5E2CED; font-size: 40px"></i>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="card">
                  <div class="card-content">
                    <i class="fa fa-times fa-lg"  style="color:#F6BA18; font-size: 40px"></i>
                    <span class="card-title" style="padding-top:5%; font-weight: bold">Road Blocks</span>
                    <p v-html="user.blocks" v-linkified style="white-space: pre-line; font-size: 20px;"> {{user.blocks}} </p>
                  </div>
                  <div class="card-content">
                      <i class="fa fa-arrow-circle-right" style="color:#5E2CED; font-size: 40px"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fixed-action-btn">
          <router-link to="/userreport" class="btn-floating btn-large blue">
            <i class="fa fa-plus"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import {cloudFunctions, db}  from './FirebaseInit'
  // import UserReport from './UserReport.vue'
  export default {
    name: 'dashboard',
    data(){
      return{
        id: null,
        users:[],
        date: new Date(),
        normalView: true,
        stackView: false,
        sprintProgress: false,
        filter: 1
      }
    },
    // components: {
    //     'app-user-report': UserReport
    // },
    methods: {
      onChange(event){
         if(event.target.value == 1){
           this.normalView = true,
           this.stackView = false,
           this.sprintProgress = false
         }
         if(event.target.value == 2) {
           this.stackView = true,
           this.normalView = false,
           this.sprintProgress = false
         }
         if(event.target.value == 3) {
           this.stackView = false,
           this.normalView = false,
           this.sprintProgress = true
         }
      },
      search() {
        var options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        };
        let searchDate = new Date(this.date).toLocaleDateString("en", options);
        localStorage.setItem('selectedDate', searchDate);
        this.users = []
        if(searchDate < '04/25/2020'){
          db.collectionGroup('reports').where('when', '==', searchDate).get().then(querySnapShot => {
            if(querySnapShot.docs.length > 0){
              querySnapShot.forEach(doc => {
                const data = {
                  'id': doc.id,
                  'name': doc.data().name,
                  'lastName': doc.data().lastName,
                  'yesterday': doc.data().yesterday,
                  'today': doc.data().today,
                  'blocks': doc.data().blocks
                }
              this.users.push(data)
              })
            } else {
              this.$swal.fire({
                title: 'Hmm looks like theres no reports for this day.',
                text: 'You should add one',
                imageUrl: 'https://unsplash.it/400/200',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
              })
            }
          });
        } else{
          db.collectionGroup('reports').where('when', '==', searchDate).orderBy('timeStamp').get().then(querySnapShot => {
          if(querySnapShot.docs.length > 0){
            querySnapShot.forEach(doc => {
              let getShortDate = {
                  month: "short",
                  day: "2-digit"
              };
              let timeStampData = { seconds: doc.data().timeStamp.seconds, nanoseconds: doc.data().timeStamp.nanoseconds }
              let convertDateTime = new Date(timeStampData.seconds * 1000)
              let timeStamp = convertDateTime.toLocaleTimeString()
              let timeStampDate = new Date(convertDateTime).toLocaleDateString("en", getShortDate)
              const data = {
                'id': doc.id,
                'name': doc.data().name,
                'lastName': doc.data().lastName,
                'yesterday': doc.data().yesterday,
                'today': doc.data().today,
                'blocks': doc.data().blocks,
                'timeStamp': timeStamp,
                'timeStampDate': timeStampDate
              }
            this.users.push(data)
            })
          } else {
            this.$swal.fire({
              title: 'Hmm looks like theres no reports for this day.',
              text: 'You should add one',
              imageUrl: 'https://unsplash.it/400/200',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
            })
          }
          });
        }
      }
    },
    watch: {
      'date': function(val, oldVal){
        if(val){
          this.search();
          }
        }
    },
    created(){
      $(document).ready(function(){
        $('select:not(.swal2-select)').formSelect();
        // $('select').formSelect();
      });
      var options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
      };
      let searchDate = new Date(this.date).toLocaleDateString("en", options);
      localStorage.setItem('selectedDate', searchDate);
      db.collectionGroup('reports').where('when', '==', searchDate).orderBy('timeStamp').get().then(querySnapShot => {
        if(querySnapShot.docs.length > 0){
        querySnapShot.forEach(doc => {
          let getShortDate = {
              month: "short",
              day: "2-digit"
          };
          let timeStampData = { seconds: doc.data().timeStamp.seconds, nanoseconds: doc.data().timeStamp.nanoseconds }
          let convertDateTime = new Date(timeStampData.seconds * 1000)
          let timeStamp = convertDateTime.toLocaleTimeString()
          let timeStampDate = new Date(convertDateTime).toLocaleDateString("en", getShortDate)
            const data = {
              'id': doc.id,
              'name': doc.data().name,
              'lastName': doc.data().lastName,
              'yesterday': doc.data().yesterday,
              'today': doc.data().today,
              'blocks': doc.data().blocks,
              'timeStamp': timeStamp,
              'timeStampDate': timeStampDate
            }
          this.users.push(data)
          })
        } else {
          this.$swal.fire({
            title: 'Hmm looks like no reports today :/',
            text: 'You should add one :)',
            imageUrl: 'https://unsplash.it/400/200',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        }
      });
    }
  }
</script>
