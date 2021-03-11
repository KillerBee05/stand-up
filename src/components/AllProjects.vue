<template>
  <div id="ManageProject">
    <h1>sup</h1>
  </div>
</template>
<script>
  export default {
    name: 'manageproject',
    data(){
      return{
        id: null,
        projects:[],
      }
    },
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
        this.projects = []
        db.collectionGroup('reports').where('when', '==', searchDate).orderBy('timeStamp').get().then(querySnapShot => {
          if(querySnapShot.docs.length > 0){
            querySnapShot.forEach(doc => {
              const data = {
                'id': doc.id,
                'name': doc.data().name
              }
            this.projects.push(data)
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
    },
    watch: {
      'date': function(val, oldVal){
        if(val){
          this.search();
          }
        }
    },
  }
</script>
