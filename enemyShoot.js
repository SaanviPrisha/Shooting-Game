AFRAME.registerComponent("enemy-bullets", {
    init:function() {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet:function() {
        var els = document.querySelectorAll(".enemy")
        for(var i = 0; i < els.length; i++) {
            var enemy = els[i].object3D
            var player = document.querySelector("#weapon").object3D

            var enemyBullet = document.createElement("a-entity")
            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1
            })
            enemyBullet.setAttribute("material", "color", "#282b29")
            
            var position = els[i].getAttribute("position")
            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z
            })

            var scene = document.querySelector("#scene")
            scene.appendChild(enemyBullet)

            var position1 = new THREE.Vector3()
            var position2 = new THREE.Vector3()

            player.getWorldPosition(position1)
            enemy.getWorldPosition(position2)

            var direction = new THREE.Vector3()
            direction.subVectors(position1, position2).normalize()

            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10))
            enemyBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: 0
            })

            enemyBullet.addEventListener("collide", function(e) {
                if(e.detail.body.el.id === "weapon") {
                    var element = document.querySelector("#countLife")
                    var playerLife = parseInt(element.getAttribute("text").value)        
                    
                    if(playerLife > 0) {
                        playerLife -= 1
                        element.setAttribute("text", {
                            value: playerLife
                        })
                    }
                    if(playerLife <= 0) {
                        var text = document.querySelector("#over")
                        text.setAttribute("visible", true)
                        text.setAttribute("text", {
                            "value": "You were unsuccesful in defeating the tanks. Beter luck next time ..."
                        })

                        var tankEl = document.querySelectorAll(".enemy")
                        for(var i = 0; i < tankEl.length; i++) {
                            scene.removeChild(tankEl[i])
                        }
                    }
                }
            })
        }
    }
})