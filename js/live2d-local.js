async function loadLive2D() {
  const container = document.getElementById('live2d-container')
  if (!container || !window.PIXI || !window.PIXI.live2d) return

  const app = new PIXI.Application({
    width: container.clientWidth,
    height: container.clientHeight,
    transparent: true,
    antialias: true
  })

  container.innerHTML = ''
  container.appendChild(app.view)

  try {
    const model = await PIXI.live2d.Live2DModel.from('/live2d/yuanji/大袁基1.model3.json')

    app.stage.addChild(model)

    model.anchor.set(0.5, 1)
    model.x = container.clientWidth / 2
    model.y = container.clientHeight
    model.scale.set(0.18)

    model.interactive = true

    model.on('hit', (hitAreas) => {
      console.log('hit:', hitAreas)
    })
  } catch (err) {
    console.error('Live2D 加载失败:', err)
  }
}

window.addEventListener('load', loadLive2D)