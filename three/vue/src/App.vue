<template>
<div id="app">
    <button class="btn headBtn" @click="setPositionHead">Head</button>
    <button class="btn behindBtn" @click="setPositionBehind">Behind</button>
    <button class="btn legBtn" @click="setPositionLeg">Leg</button>
    <button class="btn restBtn" @click="ResetPosition">Rest</button>
    <div class="model">
        <model-obj :scale="scale" :position="position" :rotation="rotation" src="static/models/obj/male02/male02.obj" 
            mtl="static/models/obj/male02/male02.mtl">
        </model-obj>
    </div>
</div>
</template>

<script>
import { ModelObj } from 'vue-3d-model'

export default {
    data() {
        return {
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            scale: {
                x: 1,
                y: 1,
                z: 1
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            }

        }
    },
    methods: {
        setPositionHead() {
            this.position.x = -40
            this.position.y = -420
            this.scale.x = 3
            this.scale.y = 3
            this.scale.z = 3
            this.rotation.x = 0.02
            this.rotation.y = 0.5
            this.rotation.z = -0.09
        },
        setPositionBehind() {
            this.position.x = 0
            this.position.y = 0
            this.scale.x = 1
            this.scale.y = 1
            this.scale.z = 1
            this.rotation.x = 0
            this.rotation.y = 3.2
            this.rotation.z = 0
        },
        setPositionLeg() {
            this.position.x = 10
            this.position.y = 40
            this.scale.x = 2.5
            this.scale.y = 2.5
            this.scale.z = 2.5
            this.rotation.x = 0
            this.rotation.y = 0
            this.rotation.z = 0
        },
        ResetPosition() {
            this.position.x = 0
            this.position.y = 0
            this.scale.x = 1
            this.scale.y = 1
            this.scale.z = 1
            this.rotation.x = 0
            this.rotation.y = 0
            this.rotation.z = 0
        }
    },
    components: {
        ModelObj
    }
}
</script>

<style>
.model {
    width: 90%;
}

.btn {
    background-color: #4CAF50;
    /* Green */
    border: none;
    color: white;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
}

.headBtn {
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
}

.headBtn:hover {
    background-color: #4CAF50;
    color: white;
}

.behindBtn {
    background-color: white;
    color: black;
    border: 2px solid #008CBA;
}

.behindBtn:hover {
    background-color: #008CBA;
    color: white;
}

.legBtn {
    background-color: white;
    color: black;
    border: 2px solid #f44336;
}

.legBtn:hover {
    background-color: #f44336;
    color: white;
}

.restBtn {
    background-color: white;
    color: black;
    border: 2px solid #555555;
}

.restBtn:hover {
    background-color: #555555;
    color: white;
}
</style>
