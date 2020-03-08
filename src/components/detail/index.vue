<template>
    <div @click="testClick" class="test">{{test}}</div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component({name: "Home"})
    export default class App extends Vue{
        test: string = "Detail Page"
        created(){
            console.log("DetailPage created")
        }

        testClick(){
            this.test = "Detail Page at " + new Date().toString()
        }
    }
</script>
<style>
    .test{
        font-size: 30px;
    }    
</style>