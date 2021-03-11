<template>
  <div id="report-summary">
    <div class="row">
      <div class="col s5" style="padding-top: 2%; " >
        start date
        <vc-date-picker class="" v-model='startDate' color="teal" is-dark />
      </div>
      <div class="col s5" style="padding-top: 2%; " >
        end date
        <vc-date-picker class="" v-model='endDate' color="teal" is-dark />
      </div>
      <div class="right"style="padding-top: 2%;">
        <button class="btn "v-on:click="search" >
          <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
        </button>
      </div>
      <div class="input-field col s12">
        <select @change="onChange($event)"  v-model='filter'>
          <option value="" disabled selected>Choose your option</option>
          <option value="1" >Normal</option>
          <option value="2" >Road Blocks</option>
        </select>
        <label>Filter</label>
      </div>
    </div>

    <div class="row" v-if="this.normalView == true">
      <div class="col s12">
        <div v-for="user in users" v-if="user.today && user.yesterday != null">
          <h4 class="card-title">{{user.name}} {{user.lastName}} {{user.when}}</h4>
          <div class="row">
            <hr width="50%" color="red">
            <div class="col m4">
              <div class="card">
                <div class="card-content">
                  <i class="fa fa-line-chart fa-lg"  style="color:#FB7179; font-size: 40px"></i>
                  <span class="card-title" style="padding-top:5%; font-weight: bold">What I did Yesterday</span>
                  <p class="" style="white-space: pre-line; font-size: 20px; " > {{user.yesterday}} </p>
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
                  <p style="white-space: pre-line; font-size: 20px;" > {{user.today}} </p>
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
                  <p style="white-space: pre-line; font-size: 20px;"> {{user.blocks}} </p>
                </div>
                <div class="card-content">
                    <i class="fa fa-arrow-circle-right" style="color:#5E2CED; font-size: 40px"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="this.blocksView == true">
      <div class="col s12">
        <div v-for="user in users" v-if="user.blocks != 'None'">
          <h4 class="card-title">{{user.name}} {{user.when}}</h4>
          <div class="row">
            <hr width="50%" color="red">
            <div class="col m12">
              <div class="card">
                <div class="card-content">
                  <i class="fa fa-times fa-lg"  style="color:#F6BA18; font-size: 40px"></i>
                  <span class="card-title" style="padding-top:5%; font-weight: bold">Road Blocks</span>
                  <p style="white-space: pre-line; font-size: 20px;"> {{user.blocks}} </p>
                </div>
                <div class="card-content">
                    <i class="fa fa-arrow-circle-right" style="color:#5E2CED; font-size: 40px"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {db} from './FirebaseInit'
  import firebase from 'firebase'
  export default {
    name: 'report-summary',
    data(){
      return{
        id: null,
        users:[],
        startDate: '04/30/2020',
        endDate: null,
        blocksView: false,
        normalView: true,
        filter: 1
      }
    },
    methods: {
      onChange(event){
         if(event.target.value == 1){
           this.normalView = true,
           this.blocksView = false
         }
         if(event.target.value == 2) {
           this.blocksView = true,
           this.normalView = false
         }
      },

      search() {
        var options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        };
        let startDate = new Date(this.startDate).toLocaleDateString("en", options);
        let endDate = new Date(this.endDate).toLocaleDateString("en", options);
        this.users = []

        db.collectionGroup('reports').where('when', '>=', startDate).where('when', '<=', endDate).get().then(querySnapShot => {
          if(querySnapShot.docs.length > 0){
            querySnapShot.forEach(doc => {
              const data = {
                'id': doc.id,
                'name': doc.data().name,
                'lastName': doc.data().lastName,
                'yesterday': doc.data().yesterday,
                'today': doc.data().today,
                'blocks': doc.data().blocks,
                'when': doc.data().when
              }
            this.users.push(data)
            })
          } else {
            this.$swal.fire({
              title: 'Hmm looks like theres no reports for these days.',
              text: 'try searching another date range',
              imageUrl: 'https://unsplash.it/400/200',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
            })
          }
        });
      }
    },
    created(){

      $(document).ready(function(){
        // $('select').formSelect();
        $('select:not(.swal2-select)').formSelect();
      });
    },
  }
</script>
