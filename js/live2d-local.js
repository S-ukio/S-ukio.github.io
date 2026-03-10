window.addEventListener('load', async () => {
  console.log('Live2D: start');

  const container = document.getElementById('live2d-container');
  if (!container) {
    console.error('Live2D: 没找到容器');
    return;
  }

  if (!window.PIXI) {
    console.error('Live2D: PIXI 没加载成功');
    return;
  }

  if (!window.PIXI.live2d || !window.PIXI.live2d.Live2DModel) {
    console.error('Live2D: cubism4 插件没加载成功', window.PIXI.live2d);
    return;
  }

  const app = new PIXI.Application({
    width: container.clientWidth || 280,
    height: container.clientHeight || 420,
    transparent: true,
    antialias: true
  });

  container.innerHTML = '';
  container.appendChild(app.view);

  try {
    const modelPath = '/live2d/xiao/大袁基1.model3.json';
    console.log('Live2D: load ->', modelPath);

    const model = await PIXI.live2d.Live2DModel.from(modelPath);

    console.log('Live2D: model loaded', model);

    app.stage.addChild(model);

    model.anchor.set(0.5, 1);
    model.x = app.renderer.width / 2;
    model.y = app.renderer.height;

    model.scale.set(0.18);

    model.interactive = true;
    model.buttonMode = true;

    model.on('hit', (hitAreas) => {
      console.log('Live2D hit:', hitAreas);
    });

    window.__live2dApp = app;
    window.__live2dModel = model;
  } catch (err) {
    console.error('Live2D 加载失败:', err);
  }
});