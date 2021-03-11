<template>
  <div id="user-report">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{name}}'s Status Report</h4></li>
    </ul>
    <div class="row">
      <form  @submit.prevent="saveReport" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <textarea v-bind:style="{height: yesterdayHeight}" id="yesterday" class="materialize-textarea validate" v-model="yesterday" required></textarea>
            <label  for="yesterday" v-bind:class="{ active: isYesterdayActive} ">What did you do yesterday?</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea v-bind:style="{height: todayHeight}" id="today" class="materialize-textarea validate" v-model="today" required></textarea>
            <label for="today" v-bind:class="{ active: isTodayActive }">What are you doing today?</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea v-bind:style="{height: blocksHeight}" id="roadblocks" class="materialize-textarea validate" v-model="blocks"></textarea>
            <label for="blocks" v-bind:class="{ active: isBlocksActive }">Road blocks?</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12" hidden>
            <input v-model="when" type="text" >
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
         &nbsp;
        <router-link to="/" class="btn grey"> Back </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import {db} from './FirebaseInit'
import firebase from 'firebase'
export default {
  name: 'user-report',
  data(){
    var date = localStorage.getItem('selectedDate');
    if(!date){
      let today = new Date().toLocaleString();
      var date = today.slice(0, 9);
    }
    return{
      user_id: null,
      name: null,
      yesterday: '',
      today: '',
      blocks: '',
      user: null,
      when: date,
      add: false,
      records: false,
      recordID: null,
      isYesterdayActive: false,
      isTodayActive: false,
      isBlocksActive: false,
      timeStamp: new Date(),
      isAway: false
    }
  },
  beforeRouteEnter(to, from, next){
    if(firebase.auth().currentUser){
      // get user data from account
      const user = firebase.auth().currentUser;
      db.collection('users').doc(user.uid).collection('account').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.name = doc.data().name
            vm.isAway = doc.data().isAway
          })
        });
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }
  },
  created(){
      const user = firebase.auth().currentUser;
      db.collection('users').doc(user.uid).collection('reports').get().then(doc => {
        if (doc.docs.length > 0) {
          db.collection('users').doc(user.uid).collection('reports').get().then(querySnapShot => {
            querySnapShot.forEach(doc => {
              if (doc.exists) {
                // pass selected date from the dashboard to update old and future records
                if(doc.data().when == this.when){
                  this.recordID = doc.id,
                  this.name = doc.data().name;
                  this.yesterday = doc.data().yesterday,
                  this.today = doc.data().today,
                  this.blocks = doc.data().blocks,
                  this.when =  doc.data().when,
                  this.add = false
                } else if(!this.recordID){
                  this.add = true;
                }
              }
            });
            if (this.yesterday != null){
              this.isYesterdayActive = true;
              this.yesterdayHeight = '100%';
            }
            if (this.today != null){
              this.isTodayActive = true;
              this.todayHeight = '100%';
            }
            if (this.blocks != null){
              this.isBlocksActive = true;
              this.blocksHeight = '100%';
            }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
        } else {
          this.add = true;
        }
      })
  },
  methods:{
    saveReport(){
      if(firebase.auth().currentUser){
        const user = firebase.auth().currentUser;
        let timeStamp = new firebase.firestore.Timestamp.fromDate(this.timeStamp);
        if(this.add == true){
          if(this.blocks == ''){
            this.blocks = 'None'
          }
          if(this.isAway == true){
            this.isAway = false
            db.collection('users').doc(user.uid).collection('account').get().then(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref.update({
                  isAway: this.isAway
                })
              })
            })
            .catch(error => console.log(err));
          }
          db.collection('users').doc(user.uid).collection("reports").add({
            name: this.name,
            yesterday: this.yesterday,
            today: this.today,
            blocks: this.blocks,
            when: this.when,
            timeStamp: timeStamp
          })
          this.$swal.fire({
            toast:true,
            position: 'top-end',
            icon: 'success',
            title: 'Your report has been saved',
            showConfirmButton: false,
            timer: 1000
          })
        } else {
          if(this.blocks == ''){
            this.blocks = 'None'
          }
          if(this.isAway == true){
            this.isAway = false
            db.collection('users').doc(user.uid).collection('account').get().then(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref.update({
                  isAway: this.isAway
                })
              })
            })
            .catch(error => console.log(err));
          }
          db.collection('users').doc(user.uid).collection('reports').doc(this.recordID).update({
            yesterday: this.yesterday,
            today: this.today,
            blocks: this.blocks
          })
          this.$swal.fire({
            toast:true,
            position: 'top-end',
            icon: 'success',
            title: 'Your report has been updated',
            showConfirmButton: false,
            timer: 1000
          })
        }
      }
      localStorage.removeItem('selectedDate')
      localStorage.removeItem('selectedTimeStamp')
      this.$router.push('/')
    }
  }
}
</script>
