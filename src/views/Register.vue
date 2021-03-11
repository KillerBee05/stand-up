<template>
  <div id="register">
    <h3> Register </h3>
    <div class="row">
      <form @submit.prevent="register" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label>First Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="lastName" required>
            <label>Last Name</label>
          </div>
        </div>
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
        <div class="row">
          <div class="input-field col s12" >
            <input type="password" v-model="password2" >
            <label>Confirm Password</label>
          </div>
        </div>
        <!-- <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="password" required>
            <label>Verify Password</label>
          </div>
        </div> -->
        <button type="submit" class="btn">Submit</button>
        &nbsp;
        <router-link to="/login" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import {db} from '../components/FirebaseInit'
export default {
  name: 'register',
  data(){
    return{
      name: '',
      lastName: '',
      email: '',
      password: '',
      password2:''
    }
  },
  methods:{
    register(e){
      if(this.password == this.password2){
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
          this.$swal.fire(
            'Account Created!',
            'You are logged in.',
            'success'
          )
          return db.collection('users').doc(user.user.uid).collection("account").add({
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            isMissing: true,
            isAway: false,
            until: null
          }).then(docRef => this.$router.go({path: this.$router.path}))
          this.$router.go({path: this.$router.path});
        },
          err => {
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message
            })
          }
        );
        e.preventDefault();
      } else{
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your new passwords didnt match'
        })
      }
    }
  }
}
</script>
