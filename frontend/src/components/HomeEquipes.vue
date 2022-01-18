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

            <b-button type="submit" variant="primary" @click="adicionarNovaEquipe()">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </b-modal>
        <b-table striped hover 
           :items="items"
           :fields="fields">
        
                <template #cell(actions)="items">
                    <b-button size="sm" variant="danger" @click="deletarEquipe(items.item.Id)">
                        <b-iconstack font-scale="1">
                            <b-icon stacked icon="trash"></b-icon>
                        </b-iconstack>
                    </b-button>
                    <b-button size="sm" v-b-modal.modal-2 variant="info" @click="form.update.idUpdate = items.item.Id">
                        <b-iconstack font-scale="1">
                            <b-icon stacked icon="pencil-fill"></b-icon>
                        </b-iconstack>
                    </b-button>
                </template>
        
        </b-table>

        <b-modal id="modal-2" title="BootstrapVue">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">

            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input
                id="input-3"
                v-model="form.update.nome"
                placeholder="Enter nome"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input
                id="input-4"
                v-model="form.update.ativo"
                placeholder="Enter nome"
                required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" @click="alterarEquipe()">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
      return {
        info:null,
        items:[],
        form: {
            nome: '', 
            ativo: 1,
            update:{
                idUpdate:'',
                nome: '', 
                ativo: 1
            }
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
        
        this.$http.get(process.env.VUE_APP_ENDPOINT + '/equipes')
        .then((result) => {
          console.log(process.env.VUE_APP_ENDPOINT + '/equipes')
          console.log(result.data)
          this.info = result.data
          var arr = this.info
          for (let i = 0; i < arr.length; i++) {
              var obj = {
                  Id: arr[i].id,
                  Nome: arr[i].nome,
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
      adicionarNovaEquipe(){
        this.$http.post(process.env.VUE_APP_ENDPOINT + '/equipes', 
            {
                nome: this.form.nome, 
                ativo: this.form.ativo
            },{
            headers: {
                  'Content-Type': 'application/json',
                  'x-access-token': "'"+document.cookie.split('=')[1]+"'",
                  'Authorization': `Bearer ${document.cookie.split('=')[1]}`
                  
            }
            })
        window.location.reload()
        this.$bvModal.hide('modal-1')
        this.$http.get(process.env.VUE_APP_ENDPOINT + '/equipes')
        .then((result) => {
          
          console.log(result.data)
          this.info = result.data
          var arr = this.info
          for (let i = 0; i < arr.length; i++) {
              var obj = {
                  Id: arr[i].id,
                  Nome: arr[i].nome,
                  Ativo: arr[i].ativo
              }
              this.items.push(obj)
             
          }
        })
      },
      deletarEquipe(id){
        console.log(typeof id)
       
        this.$http.delete(process.env.VUE_APP_ENDPOINT + '/equipes', { data: { id: id } })
        window.location.reload()
        },
      alterarEquipe(){
            this.$http.put(process.env.VUE_APP_ENDPOINT + '/equipes', 
            {
                id: this.form.update.idUpdate,
                nome: this.form.update.nome, 
                ativo: this.form.update.ativo
            },
            {
              headers: {
                  'Content-Type': 'application/json',
                  'x-access-token': "'"+document.cookie.split('=')[1]+"'",
                  'Authorization': `Bearer ${document.cookie.split('=')[1]}`
                  
              }
            })
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