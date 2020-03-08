<template>
    <div @click="homePageClick" class="title">HomePage</div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import {Global} from "../../model/Global"
    import "../../style/common.css"
    @Component({name: "Home"})
    export default class App extends Vue{
        created(){
            console.log("HomePage created")
        }

        homePageClick() {
            console.log("home page click")
            Global.Player.Play()
        }
    }
</script>
<style>
</style>