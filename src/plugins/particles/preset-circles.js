export default {
    "background": {
      "color": {
        "value": "#efefef"
      },
      "position": "50% 50%",
      "repeat": "no-repeat",
      "size": "cover"
    },
    "fullScreen": {
      "enable": false,
      "zIndex": 1
    },
    "interactivity": {
      "events": {
        "onClick": {
          "mode": "push"
        },
        "onHover": {
          "enable": true,
          "mode": "bubble"
        }
      },
      "modes": {
        "bubble": {
          "distance": 400,
          "duration": 2,
          "opacity": 0.8,
          "color": {
            "value": "#ff0000"
          },
          "size": 40
        },
        "grab": {
          "distance": 400
        }
      }
    },
    "particles": {
      "color": {
        "value": "#0d1173"
      },
      "links": {
        "color": {
          "value": "#ffffff"
        },
        "distance": 200,
        "width": 2
      },
      "move": {
        "attract": {
          "rotate": {
            "x": 600,
            "y": 1200
          }
        },
        "enable": true,
        "outModes": {
          "bottom": "out",
          "left": "out",
          "right": "out",
          "top": "out"
        },
        "speed": 2
      },
      "number": {
        "density": {
          "enable": true
        },
        "value": 6
      },
      "opacity": {
        "random": {
          "enable": true,
          "minimumValue": 0.3
        },
        "value": {
          "min": 0.3,
          "max": 0.5
        },
        "animation": {
          "speed": 1,
          "minimumValue": 0.1
        }
      },
      "shape": {
        "options": {
          "polygon": {
            "sides": 6
          },
          "star": {
            "sides": 6
          }
        },
        "type": "circle"
      },
      "size": {
        "random": {
          "enable": true,
          "minimumValue": 100
        },
        "value": {
          "min": 100,
          "max": 160
        },
        "animation": {
          "minimumValue": 40
        }
      }
    }
  }