window.addEventListener('load', async () => {
  // ... 前面的 app 初始化代码保持不变 ...

  try {
    const modelPath = '/live2d/xiao/大袁基1.model3.json';
    const model = await PIXI.live2d.Live2DModel.from(modelPath);
    app.stage.addChild(model);

    // 1. 自动获取模型内置的所有动作名称
    const motions = model.internalModel.motionManager.definitions;
    const motionGroups = Object.keys(motions);
    let motionIndex = 0;

    console.log('袁基已就绪，发现动作组:', motionGroups);

    // 2. 交互设置
    model.interactive = true;
    model.buttonMode = true;

    // 3. 点击互动：每点一次，按顺序换一个动作播
    model.on('hit', (hitAreas) => {
      // 这里的 'Tap' 是点击区域，如果模型支持局部点击可以判断
      // 我们直接做切换动作的逻辑
      const currentGroupName = motionGroups[motionIndex];
      console.log('正在播放动作:', currentGroupName);
      
      model.motion(currentGroupName);
      
      // 循环索引
      motionIndex = (motionIndex + 1) % motionGroups.length;
    });

    // 4. 让袁基“活”起来：每 15 秒随机做一个动作
    setInterval(() => {
      if (!model.internalModel.motionManager.playing) {
        const randomMotion = motionGroups[Math.floor(Math.random() * motionGroups.length)];
        model.motion(randomMotion);
      }
    }, 15000);

    // ... 缩放比例 0.18 和位置保持不变 ...
    
  } catch (err) {
    console.error('加载袁基失败:', err);
  }
});