AFRAME.registerComponent('soundcomponent', {
  schema: {
    name: { type: 'string' },
    audio: { type: 'string' },
    radius: { type: 'string', default: '0.1' },
  },
  init: function () {
    let clicked = false;
    let el = this.el;
    let pos = el.getAttribute('position');
    let audio = new Audio(this.data.audio);

    el.setAttribute('geometry', 'radius', this.data.radius);
    el.setAttribute('material', 'color', 'rgb(255, 255, 255)');
    el.setAttribute('geometry', 'height', '0.05');
    el.object3D.position.set(pos.x, pos.y, pos.z);
    el.classList.add('js--interact');

    this.PlayFragment = () => {
      clicked = true;
      if (!clicked) {
        el.setAttribute('material', {
          color: 'rgb(255, 255, 255)',
        });

        el.getObject3D('mesh').material = materials;
      } else {
        el.setAttribute('material', {
          color: 'rgb(0, 0, 0)',
        });

        audio.play();
        audio.addEventListener('ended', () => {
          el.setAttribute('material', {
            color: 'rgb(255, 255, 255)',
          });
        });
      }
    };
    el.addEventListener('click', this.PlayFragment);
  },
  update: function () {},
});

AFRAME.registerPrimitive('a-soundFragment', {
  defaultComponents: {
    geometry: { primitive: 'cylinder' },
    soundcomponent: {},
  },

  mappings: {
    name: 'soundcomponent.name',
    audio: 'soundcomponent.audio',
    radius: 'soundcomponent.radius',
  },
});
