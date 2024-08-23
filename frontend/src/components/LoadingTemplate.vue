<template>
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-80 flex items-center">
        <div id="fountainTextG" class="flex justify-center items-center">
            <div class="cssload-bell">
                <div class="cssload-circle">
                    <div class="cssload-inner"></div>
                </div>
                <div class="cssload-circle">
                    <div class="cssload-inner"></div>
                </div>
                <div class="cssload-circle">
                    <div class="cssload-inner"></div>
                </div>
                <div class="cssload-circle">
                    <div class="cssload-inner"></div>
                </div>
                <div class="cssload-circle">
                    <div class="cssload-inner"></div>
                </div>
            </div>
            <div id="fountainTextG_1" class="fountainTextG">L</div>
            <div id="fountainTextG_2" class="fountainTextG">o</div>
            <div id="fountainTextG_3" class="fountainTextG">a</div>
            <div id="fountainTextG_4" class="fountainTextG">d</div>
            <div id="fountainTextG_5" class="fountainTextG">i</div>
            <div id="fountainTextG_6" class="fountainTextG">n</div>
            <div id="fountainTextG_7" class="fountainTextG">g</div>
            <div id="fountainTextG_8" class="fountainTextG">.</div>
            <div id="fountainTextG_9" class="fountainTextG">.</div>
            <div id="fountainTextG_10" class="fountainTextG">.</div>
        </div>
    </div>
</template>


<script lang='ts' setup>

</script>


<style scoped>
#fountainTextG {
    width: 480px;
    margin: auto;
}

.fountainTextG {
    color: rgb(227, 202, 202);
    font-family: Arial;
    font-size: 80px;
    text-decoration: none;
    font-weight: normal;
    font-style: normal;
    float: left;
    animation-name: bounce_fountainTextG;
    -o-animation-name: bounce_fountainTextG;
    -ms-animation-name: bounce_fountainTextG;
    -webkit-animation-name: bounce_fountainTextG;
    -moz-animation-name: bounce_fountainTextG;
    animation-duration: 2.09s;
    -o-animation-duration: 2.09s;
    -ms-animation-duration: 2.09s;
    -webkit-animation-duration: 2.09s;
    -moz-animation-duration: 2.09s;
    animation-iteration-count: infinite;
    -o-animation-iteration-count: infinite;
    -ms-animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-direction: normal;
    -o-animation-direction: normal;
    -ms-animation-direction: normal;
    -webkit-animation-direction: normal;
    -moz-animation-direction: normal;
    transform: scale(.5);
    -o-transform: scale(.5);
    -ms-transform: scale(.5);
    -webkit-transform: scale(.5);
    -moz-transform: scale(.5);
}

#fountainTextG_1 {
    animation-delay: 0.75s;
    -o-animation-delay: 0.75s;
    -ms-animation-delay: 0.75s;
    -webkit-animation-delay: 0.75s;
    -moz-animation-delay: 0.75s;
}

#fountainTextG_2 {
    animation-delay: 0.9s;
    -o-animation-delay: 0.9s;
    -ms-animation-delay: 0.9s;
    -webkit-animation-delay: 0.9s;
    -moz-animation-delay: 0.9s;
}

#fountainTextG_3 {
    animation-delay: 1.05s;
    -o-animation-delay: 1.05s;
    -ms-animation-delay: 1.05s;
    -webkit-animation-delay: 1.05s;
    -moz-animation-delay: 1.05s;
}

#fountainTextG_4 {
    animation-delay: 1.2s;
    -o-animation-delay: 1.2s;
    -ms-animation-delay: 1.2s;
    -webkit-animation-delay: 1.2s;
    -moz-animation-delay: 1.2s;
}

#fountainTextG_5 {
    animation-delay: 1.35s;
    -o-animation-delay: 1.35s;
    -ms-animation-delay: 1.35s;
    -webkit-animation-delay: 1.35s;
    -moz-animation-delay: 1.35s;
}

#fountainTextG_6 {
    animation-delay: 1.5s;
    -o-animation-delay: 1.5s;
    -ms-animation-delay: 1.5s;
    -webkit-animation-delay: 1.5s;
    -moz-animation-delay: 1.5s;
}

#fountainTextG_7 {
    animation-delay: 1.65s;
    -o-animation-delay: 1.65s;
    -webkit-animation-delay: 1.65s;
    -moz-animation-delay: 1.65s;
}

#fountainTextG_8 {
    animation-delay: 1.8s;
    -o-animation-delay: 1.8s;
    -ms-animation-delay: 1.8s;
    -webkit-animation-delay: 1.8s;
    -moz-animation-delay: 1.8s;
}

#fountainTextG_9 {
    animation-delay: 1.95s;
    -o-animation-delay: 1.95s;
    -ms-animation-delay: 1.95s;
    -webkit-animation-delay: 1.95s;
    -moz-animation-delay: 1.95s;
}

#fountainTextG_10 {
    animation-delay: 2.10s;
    -o-animation-delay: 1.64s;
    -ms-animation-delay: 2.10s;
    -webkit-animation-delay: 2.10s;
    -moz-animation-delay: 2.10s;
}



@keyframes bounce_fountainTextG {
    0% {
        transform: scale(1);
        color: rgb(226, 202, 202);
    }

    100% {
        transform: scale(.5);
        color: rgb(255, 255, 255);
    }
}

@-o-keyframes bounce_fountainTextG {
    0% {
        -o-transform: scale(1);
        color: rgb(226, 202, 202);
    }

    100% {
        -o-transform: scale(.5);
        color: rgb(255, 255, 255);
    }
}

@-ms-keyframes bounce_fountainTextG {
    0% {
        -ms-transform: scale(1);
        color: rgb(226, 202, 202);
    }

    100% {
        -ms-transform: scale(.5);
        color: rgb(255, 255, 255);
    }
}

@-webkit-keyframes bounce_fountainTextG {
    0% {
        -webkit-transform: scale(1);
        color: rgb(226, 202, 202);
    }

    100% {
        -webkit-transform: scale(.5);
        color: rgb(255, 255, 255);
    }
}

@-moz-keyframes bounce_fountainTextG {
    0% {
        -moz-transform: scale(1);
        color: rgb(226, 202, 202);
    }

    100% {
        -moz-transform: scale(.5);
        color: rgb(255, 255, 255);
    }
}


/* ---------- */
.cssload-bell {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    margin-right: 24px;
}

.cssload-circle {
    width: 100%;
    height: 100%;
    position: absolute;
}

.cssload-circle .cssload-inner {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 5px solid rgba(226, 202, 202, 0.7);
    border-right: none;
    border-top: none;
    background-clip: padding;
    box-shadow: inset 0px 0px 10px rgba(226, 202, 202, 0.15);
}

.cssload-circle:nth-of-type(0) {
    transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
}

.cssload-circle:nth-of-type(0) .cssload-inner {
    animation: cssload-spin 2.3s infinite linear;
    -o-animation: cssload-spin 2.3s infinite linear;
    -ms-animation: cssload-spin 2.3s infinite linear;
    -webkit-animation: cssload-spin 2.3s infinite linear;
    -moz-animation: cssload-spin 2.3s infinite linear;
}

.cssload-circle:nth-of-type(1) {
    transform: rotate(70deg);
    -o-transform: rotate(70deg);
    -ms-transform: rotate(70deg);
    -webkit-transform: rotate(70deg);
    -moz-transform: rotate(70deg);
}

.cssload-circle:nth-of-type(1) .cssload-inner {
    animation: cssload-spin 2.3s infinite linear;
    -o-animation: cssload-spin 2.3s infinite linear;
    -ms-animation: cssload-spin 2.3s infinite linear;
    -webkit-animation: cssload-spin 2.3s infinite linear;
    -moz-animation: cssload-spin 2.3s infinite linear;
}

.cssload-circle:nth-of-type(2) {
    transform: rotate(140deg);
    -o-transform: rotate(140deg);
    -ms-transform: rotate(140deg);
    -webkit-transform: rotate(140deg);
    -moz-transform: rotate(140deg);
}

.cssload-circle:nth-of-type(2) .cssload-inner {
    animation: cssload-spin 2.3s infinite linear;
    -o-animation: cssload-spin 2.3s infinite linear;
    -ms-animation: cssload-spin 2.3s infinite linear;
    -webkit-animation: cssload-spin 2.3s infinite linear;
    -moz-animation: cssload-spin 2.3s infinite linear;
}

.cssload-bell {
    animation: cssload-spin 5.75s infinite linear;
    -o-animation: cssload-spin 5.75s infinite linear;
    -ms-animation: cssload-spin 5.75s infinite linear;
    -webkit-animation: cssload-spin 5.75s infinite linear;
    -moz-animation: cssload-spin 5.75s infinite linear;
}



@keyframes cssload-spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@-o-keyframes cssload-spin {
    from {
        -o-transform: rotate(0deg);
    }

    to {
        -o-transform: rotate(360deg);
    }
}

@-ms-keyframes cssload-spin {
    from {
        -ms-transform: rotate(0deg);
    }

    to {
        -ms-transform: rotate(360deg);
    }
}

@-webkit-keyframes cssload-spin {
    from {
        -webkit-transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
    }
}

@-moz-keyframes cssload-spin {
    from {
        -moz-transform: rotate(0deg);
    }

    to {
        -moz-transform: rotate(360deg);
    }
}
</style>