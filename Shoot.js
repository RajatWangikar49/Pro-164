AFRAME.registerComponent("bullets", {

    schema : {
        
        height  : {type : "number", default : 2},
        width : {type : "number", default : 2},
        depth : {type : "number", default : 2}

    },

    init : function(){

        this.shootBullets();

    },

    shootBullets : function(){

        window.addEventListener("keydown", (e)=>{

            if (e.key === "x"){
                var bullet = document.createElement("a-entity");
                bullet.setAttribute("geometry", {primitive : "sphere", radius : "0.1"});
                bullet.setAttribute("material", {color : "black"});

                var cam = document.querySelector("#camera-rig");
                var pos = cam.getAttribute("position");

                bullet.setAttribute("position", {x : pos.x, y : pos.y + 1, z : pos.z - 0.5});

                var camera = document.querySelector("#camera").object3D;

                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);

                bullet.setAttribute("velocity", direction.multiplyScalar(-20));

                var scene = document.querySelector("#scene");

                bullet.setAttribute("dynamic-body", {shape : "sphere", mass : 0});
                bullet.addEventListener("collide", this.removeBullets);
                
                scene.appendChild(bullet);

                this.shootSound();
            }

        })

    },

    removeBullets : function(e){

        var scene = document.querySelector("#scene");
        var element = e.detail.target.el;
        var elementHit = e.detail.body.el;

        var paint = document.createElement("a-entity");
        var pos = element.getAttribute("position");
        var rotate = elementHit.getAttribute("rotation");

        paint.setAttribute("position", {x : pos.x, y : pos.y, z : pos.z});
        paint.setAttribute("rotation", {x : rotate.x, y : rotate.y, z : rotate.z});
        paint.setAttribute("material", {src : "image/paint_splash.png", transparent : true, opacity : 1});
        paint.setAttribute("scale", {x : 2, y : 2, z : 2});
        paint.setAttribute("geometry", {primitive : "plane", width : 0.5, height : 0.5});

        scene.appendChild(paint);

        element.removeEventListener("collide", this.removeBullets);
        scene.removeChild(element);

    },

    shootSound : function(){

        var sound = document.querySelector("#sound1");
        sound.components.sound.playSound();

    }

})