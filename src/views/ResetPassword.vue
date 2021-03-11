<template>
  <div id="resetPassword">
    <h3>Reset Password</h3>
    <form @submit.prevent="updatePassword" class="col s12">
      <div class="row">
        <div class="input-field col s12" >
          <input type="password" v-model="newPassword" >
          <label>New Password</label>
        </div>
      </div>
    </form>
    <button type="submit" class="btn">Submit</button>
  </div>
</template>
<script>
  export default {
    name: 'resetPassword',
    data(){
      return{
        newPassword: null
      }
    },
    methods:{
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
    }
  }
</script>
