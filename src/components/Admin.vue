<template>
  <div id="admin">
    <div class="row">
      <div class="col s12">
        <!-- <div v-for="user in users" v-if="user.today && user.yesterday != null"> -->
        <div class="row">
          <div class="col s12 m6">
            <div class="card ">
              <div class="card-content black-text">
                <span class="card-title">Manage users</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>
          <div class="col s12 m6">
            <div class="card ">
              <div class="card-content black-text">
                <span class="card-title">User status</span>
                <div v-for="user in users">
                  <p>{{user.name}} {{user.lastName}} is away until {{user.awayUntil}}</p>
                </div>
              </div>
              <div class="card-action">
                <div class="right" >
                  <button class="btn pink" v-on:click="userStatus" >
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col m12">
            <div class="card ">
              <div class="card-content black-text">
                <span class="card-title">Manage Sprints</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div class="card-action">
                <div class="right">
                  <router-link to="/manageproject" class="btn-floating btn-large blue">
                    <i class="fa fa-plus"></i>
                  </router-link>
                </div>
                <router-link to="/allprojects" class="">
                <i class="fa fa-book"> All Sprints </i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col s12 m6">
            <div class="card ">
              <span class="card-title">Whos missing reports</span>
              <div v-for="user in users">
                <p>{{user.name}}</p>
              </div>
              <div class="card-action">
                <div class="right"style="padding-top: 2%;">
                  <button class="btn" v-on:click="missingReports" >
                    <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import {cloudFunctions, db} from './FirebaseInit'
import firebase from 'firebase'
export default {
  name: 'admin',
  data(){
    return{
      users: [],
      isMissing: true
    }
  },
  methods: {
    userStatus(){
      this.users = [];
      db.collectionGroup('account').where('isAway', '==', true).get().then(querySnapShot => {
        if(querySnapShot.docs.length > 0){
          querySnapShot.forEach(doc => {
            const data = {
              'id': doc.id,
              'name': doc.data().name,
              'lastName': doc.data().lastName,
              'awayUntil': doc.data().awayUntil
            }
          this.users.push(data)
          })
        } else {
          alert('No one is away')
        }
      });
    },
    missingReports(){
      const user = firebase.auth().currentUser;
      if(user){
        const getUsers = cloudFunctions.httpsCallable('getUserList');
        test({ email: myEmail}).then(result => {
          debugger;
          console.log(result);
        })
      }
      // const myEmail = 'evan.herring@oxbowdms.com';
      // const test = cloudFunctions.httpsCallable('addAdmin');
      // test({ email: myEmail}).then(result => {
      //   debugger;
      //   console.log(result);
      // })
      // this.users = []
      // var options = {
      //     year: "numeric",
      //     month: "2-digit",
      //     day: "2-digit"
      // };
      // let today = new Date().toLocaleDateString("en", options);
      // db.collection('users').doc(user.uid).collection('reports').where('when', '==', today).get().then(querySnapShot => {
      //   // debugger;
      //   if(!querySnapShot.empty){
      //       alert('we got data');
      //       this.missing = false;
      //   } else {
      //     alert('Empty');
      //       // save this value to users account
      //       db.collection('users').doc(user.uid).collection('account').get().then(querySnapshot => {
      //         querySnapshot.forEach(doc => {
      //           doc.ref.update({
      //             isMissing: this.isMissing
      //           })
      //         })
      //       })
      //   }
      // });
      //
      // db.collectionGroup('account').where('isMissing', '==', true).get().then(querySnapShot => {
      //   // debugger;
      //   if(!querySnapShot.empty){
      //       querySnapShot.forEach(doc => {
      //         // debugger;
      //         const data = {
      //           'name': doc.data().name
      //         }
      //       this.users.push(data)
      //     })
      //   } else {
      //     alert('Empty');
      //   }
      // });
    }
  },
  watch: {
  }
}
</script>
