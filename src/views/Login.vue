<template>
  <div id="login">
    <h3> Login </h3>
    <div class="row">
      <form @submit.prevent="login" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="email" required>
            <label>Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="password" v-model="password" required>
            <label>Password</label>
          </div>
        </div>
        <div id="resetEmailModal" class="modal ">
          <div class="modal-content">
            <h4>Reset Password</h4>
            <div class="row">
              <div class="input-field col s12" >
                <input type="text" v-model="resetEmail" v-on:keydown.enter.prevent='forgotPassword'>
                <label>Email</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <a v-on:click="forgotPassword" @submit.prevent="updateAccount"  class="waves-effect waves-green btn-flat" style="background-color: #26A69A; color: white">Resest Passowrd</a>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
      </form>
    </div>
    <div class="fixed-action-btn" style="padding-bottom: 80px">
      <button class="btn-floating btn-large modal-trigger" href="#resetEmailModal">
        <i class="fa fa-question-circle-o pink" aria-hidden="true"></i>
      </button>
    </div>
    <div class="fixed-action-btn">
      <router-link to="/register" class="btn-floating btn-large">
        <i class="fa fa-wpforms blue"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../components/FirebaseInit'
export default {
  name: 'login',
  data(){
    return{
      email: null,
      password: null,
      resetEmail: null
    }
  },
  created(){
    $(document).ready(function(){
      $('.modal').modal();
    });
  },
  methods:{
    login(e){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
        this.$swal.fire(
          'Logged in!',
          'You are logged in.',
          'success'
        )
        this.$router.go({path: this.$router.path});
        window.location.reload();
      },
      err => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
      e.preventDefault();
    },
    forgotPassword(){
      var self = this;
      firebase.auth().sendPasswordResetEmail(this.resetEmail).then(() => {
        self.$swal.fire(
          'email has been sent!!',
          'Check email to reset password.',
          'success'
        )
        $('.modal').modal('close', "#passwordModal");
        console.log('email sent!');
      }).catch(function(error) {
        // An error happened.
        // evan.herring@oxbowdms.com
        self.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        })
      });
    }
  }
}
</script>
