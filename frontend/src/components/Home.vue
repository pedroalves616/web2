<template>
    <div>
        <b-nav>
            <b-nav-item active to="/home">Home</b-nav-item>
            <b-nav-item to="/equipes">Equipes</b-nav-item>
        </b-nav>
        <b-button v-b-modal.modal-1 variant="success">Adicionar</b-button>

        <b-modal id="modal-1" title="BootstrapVue">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">

            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.nome"
                placeholder="Enter nome"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.password"
                placeholder="Enter password"
                required
                ></b-form-input>
            </b-form-group>
            
            <b-form-group id="input-group-2" label="Your Login:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.login"
                placeholder="Enter login"
                required
                ></b-form-input>
            </b-form-group>

             <b-form-group id="input-group-2" label="Your idequipe:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.idequipe"
                placeholder="Enter idequipe"
                type="number"
                required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" @click="adicionarNovoUsuario()">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </b-modal>
        <b-table striped hover 
           :items="items"
           :fields="fields">
        
                <template #cell(actions)="items">
                    <b-button size="sm" variant="danger" @click="deletarUsuario(items.item.Id)">
                        <b-iconstack font-scale="1">
                            <b-icon stacked icon="trash"></b-icon>
                        </b-iconstack>
                    </b-button>
                </template>
        
        </b-table>
        <b-modal id="modal-2" title="BootstrapVue">
            <p class="my-4">Hello from modal!</p>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
      return {
        infoUsers:null,
        items:[],
        form: {
            nome: '', 
            password: '',
            login: '',
            idequipe: '',
            ativo: 1
        },
        show: true,
        fields: [
            {
                key: "Id",
                label: ""
            },
            {
                key: "Nome",
                label: "Nome"
            },
            { 
                key: "Equipe" 
            },
            { 
                key: "Ativo" 
            },
            { 
                key: "actions",
                label: "Ações" 
            }
        ]
      }
    },
    mounted() {
        
        this.$http.get(process.env.VUE_APP_ENDPOINT + '/usuarios')
        .then((result) => {
          console.log(process.env.VUE_APP_ENDPOINT + '/usuarios')
          console.log(result.data)
          this.infoUsers = result.data
          var arr = this.infoUsers
          for (let i = 0; i < arr.length; i++) {
              var equip;
              if(arr[i].m2_equipe != null){
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
    methods: {
        onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      adicionarNovoUsuario(){
        this.$http.post(process.env.VUE_APP_ENDPOINT + '/usuarios', 
            {
                nome: this.form.nome, 
                password: this.form.password,
                login: this.form.login,
                idequipe: this.form.idequipe,
                ativo: this.form.ativo
            }
        )

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
      deletarUsuario(id){
        console.log(typeof id)
       
        this.$http.delete(process.env.VUE_APP_ENDPOINT + '/usuarios', { data: { id: id } })
        window.location.reload()
        }
    },
    
}
</script>
<style>
    footer{
        visibility: hidden;
    }
</style>