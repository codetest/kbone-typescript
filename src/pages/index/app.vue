<template>
    <div>{{msg}}</div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator"
    @Component({name: "Home"})
    export default class Home extends Vue{
        msg: string = "Hello World"
    }
</script>