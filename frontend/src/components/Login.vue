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
      <b-button type="button" v-b-modal.modal-1 variant="info">Submit</b-button>
    </b-form>

    <b-modal id="modal-1" title="BootstrapVue">
      <b-form v-if="show">

            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.cadastro.nome"
                placeholder="Enter nome"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.cadastro.password"
                placeholder="Enter password"
                required
                ></b-form-input>
            </b-form-group>
            
            <b-form-group id="input-group-2" label="Your Login:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.cadastro.login"
                placeholder="Enter login"
                required
                ></b-form-input>
            </b-form-group>

             <b-form-group id="input-group-2" label="Your idequipe:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.cadastro.idequipe"
                placeholder="Enter idequipe"
                type="number"
                required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" @click="adicionarNovoUsuario()">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
    </b-modal>
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
            nome: '',
            password: '',
            login: '',
            idequipe: ''
          }
        },
        show: true,
        infoUsers: null,
        login: ''
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        const baseURI = process.env.VUE_APP_ENDPOINT + '/login'
        this.$http.post(baseURI, {login: this.form.login.email, password: this.form.login.password})
        .then((result) => {
          console.log(result.data.token)
          document.cookie = `token=${result.data.token}`;
          //console.log(document.cookie.split('=')[1])
          this.$router.push({ path: '/home' })

         
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
      },
      adicionarNovoUsuario(){
        console.log(document.cookie)
        // this.$http.post(process.env.VUE_APP_ENDPOINT + '/usuarios', 
        //     {
        //         nome: this.form.cadastro.nome, 
        //         password: this.form.cadastro.password,
        //         login: this.form.cadastro.login,
        //         idequipe: this.form.cadastro.idequipe,
        //         ativo: 1
        //     },
        //     {
        //       headers: {
        //           'Content-Type': 'application/json',
        //           'x-access-token': "'"+document.cookie.split('=')[1]+"'",
        //           'Authorization': `Basic ${token}`
        //       }
        // })

        this.$bvModal.hide('modal-1')

        this.$http.get(process.env.VUE_APP_ENDPOINT + '/usuarios')
        .then((result) => {
          
          console.log(result.data)
          this.infoUsers = result.data
          var arr = this.infoUsers
          for (let i = 0; i < arr.length; i++) {
              var equip;
              if(arr[i].m2_equipe.nome){
                  equip = arr[i].m2_equipe.nome;
              }
              else{
                  equip = "sem equipe"
              }
              var obj = {
                  Id: arr[i].id,
                  Nome: arr[i].nome,
                  Equipe: equip,
                  Ativo: arr[i].ativo
              }
              this.items.push(obj)
             
          }
        })
      },
    }
  }
</script>