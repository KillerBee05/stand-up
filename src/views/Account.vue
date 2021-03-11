<template>
  <div id="account">
    <h3> Account </h3>
    <div class="row">
      <form @submit.prevent="updateAccount" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label class="active">Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="lastName" required>
            <label class="active">Last Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="email" disabled>
            <label class="active">Email</label>
          </div>
        </div>
        <div class="switch" style="padding-bottom: 7%;">
          <label>
            Admin
            <input disabled type="checkbox" v-model='isAdmin'>
            <span class="lever" ></span>
          </label>
        </div>
        <div class="switch" style="padding-bottom: 1%;">
          <label>
            Away
            <input type="checkbox" v-model='isAway' >
            <span class="lever"></span>
          </label>
        </div>
        <div class="row">
          <div class="input-field col s12" v-show="showCalendar" >
           Away Until?
          <vc-date-picker class="" v-model='awayDate' color="teal" is-dark is-inline />
          <input type="text" disabled v-model="awayUntil">
          </div>
        </div>
        <div id="passwordModal" class="modal modal-fixed-footer">
          <div class="modal-content">
            <h4>Change Password</h4>
            <div class="row">
              <div class="input-field col s12" >
                <input type="password" v-model="password" v-on:keydown.enter.prevent='updatePassword' >
                <label>Old Password</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12" >
                <input type="password" v-model="newPassword" v-on:keydown.enter.prevent='updatePassword' >
                <label>New Password</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12" >
                <input type="password" v-model="newPassword2" v-on:keydown.enter.prevent='updatePassword' >
                <label>Confirm new Password</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <a v-on:click="updatePassword" @submit.prevent="updateAccount" class="waves-effect waves-green btn-flat" style="background-color: #26A69A; color: white">Change Password</a>
          </div>
        </div>

        <button type="submit" class="btn">Submit</button>
        &nbsp;
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
    <div class="fixed-action-btn" style="padding-bottom: 80px">
      <button class="btn-floating btn-large modal-trigger" href="#passwordModal">
        <i class="fa fa-lock blue" aria-hidden="true"></i>
      </button>
    </div>
    <div class="fixed-action-btn" >
      <button class="btn-floating btn-large" v-on:click="deleteUser">
        <i class="fa fa-trash-o red" aria-hidden="true"></i>
      </button>
    </div>

  </div>
</template>
<script>
import {db} from '../components/FirebaseInit'
import firebase from 'firebase'
  export default {
    name: 'account',
    data(){
      return{
        name: null,
        lastName: null,
        email: null,
        password: null,
        newPassword: null,
        newPassword2: null,
        reauthenticated: false,
        modal:false,
        isAdmin: false,
        isAway: false,
        awayUntil: null,
        awayDate: new Date(),
        showCalendar: false,
        isMissing: false
      }
    },
    created(){
      $(document).ready(function(){
        $('.modal').modal();
      });
      const user = firebase.auth().currentUser;
      user.getIdTokenResult().then(idTokenResult => {
        this.isAdmin = idTokenResult.claims.admin;
      })
    },
    beforeRouteEnter(to, from, next){
      const user = firebase.auth().currentUser;
      if(user){
        db.collection('users').doc(user.uid).collection('account').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            next(vm => {
              vm.name = doc.data().name
              vm.lastName = doc.data().lastName
              vm.email = user.email
              vm.isAway = doc.data().isAway
              vm.awayUntil = doc.data().awayUntil
            })
          })
        })
      }
    },
    watch: {
      'email': function(val, oldVal){
        const user = firebase.auth().currentUser;
        if(val != user.email){
            this.show = true;
          } else {
            this.show = false;
          }
        },
        'isAway': function(val, oldVal){
          if(val == true){
            this.isAway = true;
            this.showCalendar = true;
          } else {
            this.isAway = false;
            this.showCalendar = false;
            this.awayUntil = null;
          }
        },
        'awayDate': function(val){
          var date = new Date();
          if(val <= date){
            alert('thats the past it wont save');
            this.awayUntil = null
          }
        }
    },
    methods:{
      // update registered email
      updatePassword: function() {
        var self = this;
        const user = firebase.auth().currentUser
        if(this.newPassword == this.newPassword2){
          var credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            this.password
          );
          user.reauthenticateWithCredential(credential).then(() => {
            user.updatePassword(this.newPassword).then(function() {
              self.$swal.fire({
                toast:true,
                position: 'top-end',
                icon: 'success',
                title: 'Your password has been updated',
                showConfirmButton: false,
                timer: 3000
              })
            $('.modal').modal('close', "#passwordModal");
            }).catch(function(error) {
              self.$swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
              })
            });
          },(error) => {
            self.$swal.fire({
              icon: 'error',
              title: 'Oops... We cant authenticate you',
              text: 'Try verifying your old password'
            })
          });
        } else {
          self.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your new passwords didnt match'
          })
        }
      },
      deleteUser() {
        const user = firebase.auth().currentUser;
        this.$swal.fire({
          title: 'Are you sure you?',
          text: "Are you sure you want to delete your account?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete my account'
        }).then((result) => {
            if (result.value) {
              user.delete().then(function() {
                 var ref = firebase.database().ref(
                    "users/".concat(user.uid, "/")
                 );
                 ref.remove();
              });
              this.$swal.fire(
                'Removed',
                'Your account has been deleted.',
                'success'
              )
              this.$router.push('/')
              window.location.reload();
            }
          })
      },
      updateAccount(){
        const user = firebase.auth().currentUser;
        if(user){
          var options = {
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
          };
          let awayUntilDate = new Date(this.awayDate).toLocaleDateString("en", options);
          db.collection('users').doc(user.uid).collection('account').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.update({
                name: this.name,
                lastName: this.lastName,
                isAway: this.isAway,
                awayUntil: awayUntilDate,
                isMissing: this.isMissing,
              })
            })
          })
          .catch(error => console.log(err));
          this.$swal.fire({
            toast:true,
            position: 'top-end',
            icon: 'success',
            title: 'Your profile has been saved',
            showConfirmButton: false,
            timer: 1000
          })
          this.$router.push('/')
        }
      }
    }
  }
</script>
