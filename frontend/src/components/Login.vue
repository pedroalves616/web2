<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Login:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.login.email"
          type="text"
          placeholder="Enter Login"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Sua Senha:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.login.password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        form: {
          login:{
            email: '',
            password: '',
          },
          cadastro:{
            email: '',
            password: '',
          }
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        const baseURI = process.env.VUE_APP_ENDPOINT + '/usuarios'
        this.$http.get(baseURI)
        .then((result) => {
          console.log(baseURI)
          console.log(result.data)
          var arr = result.data
          for (var index = 0; index < arr.length; index++) {
            if(arr[index].login == this.form.login.email && arr[index].login == this.form.login.password){
              console.log('ok')
              this.$router.push({name: 'Home'})
            }
            else{
              console.log('no')
            }
          }
        })
        //alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.login.email = ''
        this.form.login.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>