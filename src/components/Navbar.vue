<template>
  <nav>
    <div class="nav-wrapper pink">
      <a href="#" class="brand-logo"> Daily Task Report </a>
      <a href="#" class="sidenav-trigger" data-target="mobile-links"><i style="font-size: 30px;" class="fa fa-bars"></i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="isLoggedIn"> <span style=" padding-right: 30px;">Hello {{name}}! </span></li>
        <li v-if="isAdmin"><router-link  to="/admin" > Admin </router-link></li>
        <li v-if="isLoggedIn"><router-link  to="/" > Dashboard </router-link></li>
        <li v-if="isLoggedIn"><router-link  to="/summary" > Summary </router-link></li>
        <li v-if="isLoggedIn"><router-link  to="/account" > Account </router-link></li>
        <li v-if="!isLoggedIn"><router-link  to="/login" > Login </router-link></li>
        <li v-if="isLoggedIn"><router-link v-on:click.native="logout" to="" > Logout </router-link></li>
      </ul>
    </div>

    <ul class="sidenav" id="mobile-links">
      <li v-if="isLoggedIn"> <span style=" padding-right: 30px;">Hello {{name}}! </span></li>
      <li v-if="isLoggedIn"><router-link  to="/" > Dashboard </router-link></li>
      <li v-if="isLoggedIn"><router-link  to="/summary" > Summary </router-link></li>
      <li v-if="isLoggedIn"><router-link  to="/account" > Account </router-link></li>
      <li v-if="!isLoggedIn"><router-link  to="/login" > Login </router-link></li>
      <li v-if="isLoggedIn"><router-link v-on:click.native="logout" to="" > Logout </router-link></li>
    </ul>
  </nav>

</template>
<script>
import {cloudFunctions, db} from './FirebaseInit'
import firebase from 'firebase'
export default{
  name: 'navbar',
  data(){
    return{
      isLoggedIn: false,
      currentUser: false,
      isAdmin: false,
      name: ''
    }
  },
  created(){
    $(document).ready(function(){
      $('.sidenav').sidenav();
    });
    const user = firebase.auth().currentUser;
    if(user){
    this.isLoggedIn = true;
      db.collection('users').doc(user.uid).collection("account").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.exists) {
              this.name = doc.data().name;
          }
        })
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      user.getIdTokenResult().then(idTokenResult => {
        this.isAdmin = idTokenResult.claims.admin;
      })
    }
  },
  methods: {
    logout(){
      this.$swal.fire({
        title: 'Are you sure you?',
        text: "Are you sure you want to log out",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Log me out'
      }).then((result) => {
        if (result.value) {
          firebase.auth().signOut().then(() => {

            this.$swal.fire(
              'Logged out!',
              'You are logged out.',
              'success'
            )
            this.$router.go({path: this.$router.path});
            window.location.reload();
          }).catch(function(error) {
            // An error happened.
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message
            })
          });
          this.$swal.fire(
            'Deleted!',
            'You are logged out.',
            'success'
          )
        }
      })
    }
  }
}
</script>
