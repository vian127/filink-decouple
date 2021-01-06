export interface ApplicationInterface {
  // 策略类型
  policyControl: {
    lighting: string;
    information: string;
    broadcast: string;
    linkage: string;
    centralizedControl: string;
  };
  // 执行周期
  execType: {
    nothing: string;
    daily: string;
    workingDay: string;
    vacations: string;
    execution: string;
    custom: string;
  };
  // 门锁
  doorNumber: {
    doorOne: string;
    doorTwo: string;
    doorThree: string;
    doorFour: string;
  };
  // 执行周期
  executionCycleType: {
    none: string;
    everyDay: string;
    workingDay: string;
    holiday: string;
    intervalExecution: string;
    custom: string;
  };
  // 告警级别
  alarmLevel: {
    urgent: string;
    main: string;
    secondary: string;
    tips: string;
  };
  // 执行状态
  execStatus: {
    free: string;
    implement: string;
  };
  // 控制状态
  controlType: {
    platform: string;
    equipment: string;
  };
  // 策略状态
  strategyStatus: {
    open: string;
    close: string;
  };
  // 设备状态
  equipmentStatus: {
    normal: string;
    alarm: string;
    event: string;
    offLine: string;
    contact: string;
  };
  conditionType: {
    event: string;
    alarm: string;
    trigger: string;
  };
  // 告警统计
  alarmLevelStatus: {
    signal: string;
    businessQuality: string;
    environmentalScience: string;
    power: string;
    security: string;
    equipment: string;
  };
  // 节目状态
  programStatus: {
    toBeReviewed: string;
    reviewed: string;
    auditFailed: string;
    disabled: string;
  };
  // 工单状态
  workOrderState: {
    assigning: string;
    assigned: string;
    underReview: string;
    completed: string;
    chargeback: string;
    cancelled: string;
  };
  electricityDate: {
    week: string;
    month: string;
    year: string;
  };
  lightRateList: {
    lastYear: string,
    lastMonth: string,
    lastWeek: string
  };
  workOrderList: {
    lastYear: string;
    lastMonth: string;
    lastWeek: string;
  };
  enableOnvifState: {
    yes: string,
    no: string
  };
  // 表格
  equipmentTable: {
    assetNumber: string;
    equipmentName: string;
    equipment: string;
    facilities: string;
    group: string;
    loop: string;
    equipmentType: string;
    equipmentStatus: string;
    equipmentModel: string;
    supplier: string;
    scrapTime: string;
    open: string;
    close: string;
    confirmOpen: string;
    confirmClose: string;
    upElectric: string;
    downElectric: string;
    confirmUpElectric: string;
    confirmDownElectric: string;
    light: string;
    moreOperate: string;
    details: string;
    equipmentDetail: string;
    distribution: string;
    brightness: string;
    groupName: string;
    remark: string;
    gate: string;
    pull: string;
    confirmPull: string;
    confirmGate: string;
    equipmentList: string;
    groupList: string;
    loopList: string;
    switch: string;
    shut: string;
    play: string;
    confirmPlay: string;
    lighting: string;
    doorOpen: string;
    circuitDetails: string;
    loopControl: string;
    lampControl: string;
    loopOperation: string;
    associatedFacilities: string;
    currentPage: string;
    strategyConsole: string;
    page: string;
    common: string;
    total: string;
    strip: string;
    supported: string;
    groupStatue: string;
    strategyIssued: string;
    strategyOperationIssued: string;
    strategyLightIntensity: string;
  };
  conditionsMet: {
    all: string;
    single: string;
  };
  // 策略列表
  strategyList: {
    strategyName: string;
    strategyType: string;
    effectivePeriodTime: string;
    releaseStrategy: string;
    execCron: string;
    day: string;
    execStatus: string;
    createTime: string;
    applyUser: string;
    remark: string;
    strategyStatus: string;
    strategyAdd: string;
    strategyDelete: string;
    strategyEdit: string;
    confirmDelete: string;
    moveOutOfTheLoop: string;
    enable: string;
    confirmEnable: string;
    deactivation: string;
    confirmDeactivation: string;
    selectDisabled: string;
    deviceModeDoesItMatch: string;
    selectEnable: string;
    equipmentCode: string;
    equipmentName: string;
    equipmentAdd: string;
    newStrategy: string;
    equipmentEdit: string;
    equipmentTip: string;
    conditions: string;
    term: string;
    action: string;
    switch: string;
    lightIntensity: string;
    timeInterval: string;
    eventSources: string;
    event: string;
    dimming: string;
    save: string;
    selectEquipment: string;
    alarmList: string;
    eventList: string;
    alarmName: string;
    alarmObject: string;
    alarmDeviceName: string;
    areaName: string;
    address: string;
    alarmFixedLevel: string;
    responsibleDepartment: string;
    previousStep: string;
    nextStep: string;
    confirm: string;
    cancel: string;
    strategyDetails: string;
    deletePolicy: string;
    sureDelete: string;
    strategiesUse: string;
    allStrategy: string;
    timeSlot: string;
    add: string;
    noData: string;
    programSelection: string;
    loop: string;
    noLoop: string;
    volume: string;
    cycleMode: string;
    moveUp: string;
    moveDown: string;
    programList: string;
    programName: string;
    programPurpose: string;
    duration: string;
    mode: string;
    resolution: string;
    programFileName: string;
    trigger: string;
    sourceType: string;
    performAction: string;
    addDevice: string;
    setCommand: string;
    screen: string;
    singleControl: string;
    multiControl: string;
    equipmentType: string;
    lamp: string;
    enableNow: string;
    applicationScope: string;
    daysBetween: string;
    execution: string;
    intervalTimeTips: string;
    disabledPolicy: string;
    controlType: string;
    enableStatus: string;
    loopId: string;
    loopName: string;
    basicInformation: string;
    updateTime: string;
    createUser: string;
    singleLights: string;
    controlQuantity: string;
    wisdomPoles: string;
    convenient: string;
    policySelected: string;
    lightingRate: string;
    workOrder: string;
    equipmentStatus: string;
    electricity: string;
    alarmStatistics: string;
    loopDefinition: string;
    distribution: string;
    loopCode: string;
    loopStatus: string;
    controlObj: string;
    centralController: string;
    facilities: string;
    more: string;
    effectivePeriodStart: string;
    effectivePeriodEnd: string;
    operationUser: string;
    operationTime: string;
    operationResult: string;
    operationDetails: string;
    workbenchStrategy: string;
    information: string;
    pleaseSelectProgram: string;
    pleaseInputShowTime: string;
    playProgramList: string;
    dragToSort: string;
    timePeriodCrossingErrTip: string;
    execTimeErrorTip: string;
    lightValueErrorTip: string;
    sameTimeErrorTip: string;
    onlyEndTime: string;
    deleteMsg: string;
    sunrise: string;
    sunset: string;
    custom: string;
    coincident: string;
    addTrigger: string;
    addAction: string;
    triggerEquipment: string;
    noXMlInfoMsg: string;
    triggerConditionMustMsg: string;
  };
  // 内容列表
  contentList: {
    programName: string;
    programPurpose: string;
    duration: string;
    format: string;
    fileType: string;
    resolvingPower: string;
    applicant: string;
    addBy: string;
    addTime: string;
    checker: string;
    auditTime: string;
    programFiles: string;
    preview: string;
    initiateAudit: string;
    incident: string;
    add: string;
    delete: string;
    confirmDelete: string;
    theProgramIsPlaying: string;
    failedToReviewThePlayingContent: string;
    playbackDisabled: string;
    editContent: string;
    addContent: string;
    programDescription: string;
    size: string;
    type: string;
    pleaseUploadVideoOrPicture: string;
    describeProgram: string;
    automaticAcquisition: string;
    backstageAutoFill: string;
    successful: string;
    distribution: string;
    groupDetail: string;
    basicOperation: string;
    programAdd: string;
    selectProgram: string;
    displayDuration: string;
    repeatProgram: string;
    contentList: string;
    otherDepartments: string;
    notDelete: string;
    canEnabled: string;
    canDisabled: string;
    fileRestrictions: string;
    resolutionFormat: string;
  };
  // 内容审核
  auditContent: {
    workOrderName: string;
    personLiable: string;
    workOrderStatus: string;
    expectedCompletionTime: string;
    actualCompletionTime: string;
    creationTime: string;
    examineOpinion: string;
    examineContent: string;
    reasonsForTransfer: string;
    chargebackReason: string;
    cannotBeDeleted: string;
    cannotBeCancel: string;
    workOrderInformation: string;
    transfer: string;
    chargeback: string;
    basicOperation: string;
    contentExamine: string;
    programApplicant: string;
    programPurpose: string;
    findingsOfAudit: string;
    designatedPerson: string;
    deleteTheWorkOrder: string;
    cancelTheWorkOrder: string;
    contentAudit: string;
    deleteOthers: string;
    notDelete: string;
    contentWorkOrder: string;
  };
  // 信息工作台
  informationWorkbench: {
    enabledSuccessfully: string;
    disableSuccessfully: string;
    startStatistics: string;
    quantityStatistics: string;
    programLaunchQuantity: string;
    playingTime: string;
    createIt: string;
    workbench: string;
    programDistribution: string;
  };
  // 安防工作台
  securityWorkbench: {
    workbench: string;
    channelName: string;
    channelNumber: string;
    channelStatus: string;
    cameraType: string;
    onvifStatus: string;
    onvifIp: string;
    onvifPort: string;
    onvifAccount: string;
    onvifPassword: string;
    rtspAddr: string;
    onvifAddr: string;
    cameraAccount: string;
    cameraPassword: string;
    videoRetentionDays: string;
    audioSwitch: string;
    selectDevice: string;
    cameraIp: string;
    cameraPort: string;
    sslStatus: string;
    sslCertFile: string;
    httpsPort: string;
    sslKeyFile: string;
    platform: string;
    deviceSerial: string;
    platformIp: string;
    deviceName: string;
    listenPort: string;
    password: string;
    basicConfiguration: string;
    certificateConfiguration: string;
    accessPlatform: string;
    channelList: string;
    channelConfiguration: string;
    splitScreenSetting: string;
    allOn: string;
    closeAll: string;
    noEquipment: string;
    fillInChannel: string;
    fillInBasic: string;
    selectedQuantity: string;
    presetBitSetting: string;
    preset: string;
    enableOnvifProbe: string;
    accessDetails: string;
  };
  // 设备地图
  equipmentMap: {
    addAttention: string;
    changeGroup: string;
    collectSuccess: string;
    notGroup: string;
    pleaseChoose: string;
  };
  // 常用
  frequentlyUsed: {
    // 序号
    serialNumber: string;
    // 操作
    operate: string;
    // 状态
    state: string;
    // 备注
    remarks: string;
    // 新增
    add: string;
    // 删除
    delete: string;
    // 确定删除
    confirmDelete: string;
    // 删除成功
    deleteSucceeded: string;
    // 启用
    enable: string,
    // 是否确认启用
    confirmEnable: string,
    // 停用
    deactivation: string,
    // 是否确认停用
    confirmDeactivation: string,
    // 编辑
    edit: string,
    // 确认
    confirm: string;
    // 取消
    cancel: string;
    // 查看详情
    viewDetails: string;
    // 通过
    pass: string;
    // 不通过
    noPass: string;
    // 提交
    submit: string;
    // 单位
    unit: string;
    // 个
    piece: string;
    // 小时
    hour: string;
    // 秒
    second: string;
    // 使用中的策略
    strategiesUse: string;
    // 全部策略
    allStrategy: string;
    // 开
    open: string;
    // 关
    close: string;
    // 执行周期
    executionCycle: string;
    // 便捷入口
    convenientEntrance: string;
    // 亮度
    brightness: string;
    // 音量
    volume: string;
    // 暂未选中策略
    noPolicySelected: string;
    // 工单增量
    workOrder: string;
    // 设备状态统计
    equipmentStatus: string;
    // 温馨提示
    reminder: string;
    // 有效期
    validity: string;
    // 页
    page: string;
    // 条
    strip: string;
    // 共
    common: string;
    // 当前第
    currentNo: string;
    // 共计
    total: string;
    // 是
    yes: string;
    // 否
    no: string;
    // 单选
    select: string;
    // 禁用
    disabled: string;
    // 是否启用
    isEnable: string;
    // 开启音频
    openVolume: string;
    // 关闭音频
    closeVolume: string;
    // 请上传MP4,3GP,jpg,gif,bmp类型的文件
    uploadTips: string;
    // 设施列表
    facilityList: string;
    // 请选择
    pleaseChoose: string;
    // 开关
    switch: string;
    // 最多输入255位!
    bitsAtMost: string;
    // 操作成功!
    operationSuccess: string;
    // 指令下发成功!
    commandSuccessful: string;
    // 指令下发失败!
    failedCommand: string;
    // 分组详情
    groupDetail: string;
    // 光圈缩小
    apertureReduction: string;
    // 光圈放大
    apertureAmplification: string;
    // 焦点前调
    focusAdjustment: string;
    // 焦点后调
    focusPostAdjustment: string;
    // 焦点变小
    focusBecomesSmaller: string;
    // 焦点变大
    focusBecomesLarger: string;
    // 上电
    upElectric: string;
    // 下电
    downElectric: string;
    // 转到预置位
    goToPresetPosition: string;
    // 请至少选择一个通道
    selectChannel: string;
    // 暂无可播放的通道
    noPlayableChannel: string;
    // 您暂无操作权限
    notPermission: string;
    // 请选择正在播放中的视频
    playingVideo: string;
    // 请先播放视频
    firstVideo: string;
    // 基础配置添加完成
    configurationAdded: string;
    // 已经是第一个啦
    isFirst: string;
    // 已经是最后一个啦
    isLast: string;
    // 提示
    tip: string;
  };
  // 报表分析
  reportAnalysis: {
    analysisTable: string;
    pleaseChooseWeek: string;
    pleaseChooseMonth: string;
    pleaseChooseYear: string;
    exportSuccess: string;
    // 报表分析
    reportAnalysis: string;
    // 电流报表
    electricCurrent: string;
    // 电压报表
    voltage: string;
    // 功率报表
    powerReport: string;
    // 电能报表
    electricEnergy: string;
    // 功率因数报表
    powerFactor: string;
    // 用电量报表
    electricityConsumptionReport: string;
    electricityConsumption: string;
    // 工作时长报表
    workingTimeReport: string;
    workingTime: string;
    // 工作时长报表
    lightingRate: string;
    // 节能率报表
    energySavingRateReport: string;
    energySavingRate: string;
    // 设备类型
    equipmentType: string;
    // 统计维度
    statisticalDimension: string;
    // 统计范围
    statisticalScope: string;
    // 时间类型
    timeType: string;
    // 区域
    area: string;
    // 分组
    group: string;
    // 设备
    equipment: string;
    // 日
    day: string;
    // 周
    week: string;
    // 月
    month: string;
    // 年
    year: string;
    // 区域名称
    areaName: string;
    // 区域级别
    areaLevel: string;
    // 选择区域
    selectArea: string;
    // 分组名称
    groupName: string;
    // 设备名称
    equipmentName: string;
    // 时间
    time: string;
    summaryGraph: string;
    inputCurrent: string;
    minInputCurrent: string;
    maxInputCurrent: string;
    aEffectiveValueOfCurrent: string;
    bEffectiveValueOfCurrent: string;
    cEffectiveValueOfCurrent: string;
    minAEffectiveValueOfCurrent: string;
    maxAEffectiveValueOfCurrent: string;
    minBEffectiveValueOfCurrent: string;
    maxBEffectiveValueOfCurrent: string;
    minCEffectiveValueOfCurrent: string;
    maxCEffectiveValueOfCurrent: string;
    // 输入电压
    inputVoltage: string;
    // 最小输入电压
    minInputVoltage: string;
    // 最大输入电压
    maxInputVoltage: string;
    //  A相电压有效值(V)
    aEffectiveValueOfVoltage: string;
    // B相电压有效值(V)
    bEffectiveValueOfVoltage: string;
    //  C相电压有效值(V)
    cEffectiveValueOfVoltage: string;
    // AB相电压有效值(V)
    abEffectiveValueOfVoltage: string;
    // BC相电压有效值(V)
    bcEffectiveValueOfVoltage: string;
    // CA相电压有效值(V)
    caEffectiveValueOfVoltage: string;
    // 最小A相电压有效值
    minAEffectiveValueOfVoltage: string;
    // 最大A相电压有效值
    maxAEffectiveValueOfVoltage: string;
    // 最小B相电压有效值
    minBEffectiveValueOfVoltage: string;
    // 最大B相电压有效值
    maxBEffectiveValueOfVoltage: string;
    // 最小C相电压有效值
    minCEffectiveValueOfVoltage: string;
    // 最大C相电压有效值
    maxCEffectiveValueOfVoltage: string;
    // 最小AB线电
    minABEffectiveValueOfVoltage: string;
    // 最大AB线电
    maxABEffectiveValueOfVoltage: string;
    // 最小BC线电
    minBCEffectiveValueOfVoltage: string;
    // 最大BC线电
    maxBCEffectiveValueOfVoltage: string;
    // 最小CA线电
    minCAEffectiveValueOfVoltage: string;
    // 最大CA线电
    maxCAEffectiveValueOfVoltage: string;
    // 功率
    power: string;
    // 最小功率
    minPower: string;
    // 最大功率
    maxPower: string;
    // 瞬时总有功功率
    activePower: string;
    // 瞬时A相有功功率
    aActivePower: string;
    // 瞬时B相有功功率
    bActivePower: string;
    // 瞬时C相有功功率
    cActivePower: string;
    // 瞬时总无功功率
    reactivePower: string;
    // 瞬时A相无功功率
    aReactivePower: string;
    // 瞬时B相无功功率
    bReactivePower: string;
    // 瞬时C相无功功率
    cReactivePower: string;
    // 最小瞬时总有功功率
    minActivePower: string;
    // 最大瞬时总有功功率
    maxActivePower: string;
    // 最小瞬时A相有相功率 (kw)
    minAActivePower: string;
    // 最大瞬时A相有相功率(kw)
    maxAActivePower: string;
    // 最小瞬时B相有功功率
    minBActivePower: string;
    // 最大瞬时B相有功功率
    maxBActivePower: string;
    // 最小瞬时C相有功功率
    minCActivePower: string;
    // 最大瞬时C相有功功率
    maxCActivePower: string;
    // 最小瞬时总无功功率
    minReactivePower: string;
    // 最大瞬时总无功功率
    maxReactivePower: string;
    // 最小瞬时A相无功功率
    minAReactivePower: string;
    // 最小瞬时A相无功功率
    maxAReactivePower: string;
    // 最小瞬时B相无功功率
    minBReactivePower: string;
    // 最大瞬时B相无功功率
    maxBReactivePower: string;
    // 最小瞬时C相无功功率
    minCReactivePower: string;
    // 最大瞬时C相无功功率
    maxCReactivePower: string;
    // 电能
    energy: string;
    // 总相正向有功电能量
    activeElectricEnergy: string;
    // A相正向有功电能量
    aActiveElectricEnergy: string;
    // B相正向有功电能量
    bActiveElectricEnergy: string;
    // C相正向有功电能量
    CActiveElectricEnergy: string;
    // 总正向无功电能量
    reactiveEnergy: string;
    // A相正向无功电能量
    aReactiveEnergy: string;
    // B相正向无功电能量
    BReactiveEnergy: string;
    // C相正向无功电能量
    CReactiveEnergy: string;
    // 瞬时总相功率因数
    PowerFactor: string;
    // 瞬时A相功率因数
    APowerFactor: string;
    // 瞬时B相功率因数
    BPowerFactor: string;
    // 瞬时C相功率因数
    CPowerFactor: string;
    // 最小瞬时总相功率因数
    minPowerFactor: string;
    // 最大瞬时总相功率因数
    maxPowerFactor: string;
    // 最小瞬时A相功率因数
    minAPowerFactor: string;
    // 最大瞬时A相功率因数
    maxAPowerFactor: string;
    // 最小瞬时B相功率因数
    minBPowerFactor: string;
    // 最大瞬时B相功率因数
    maxBPowerFactor: string;
    // 最小瞬时C相功率因数
    minCPowerFactor: string;
    // 最大瞬时C相功率因数
    maxCPowerFactor: string;
    // 工作时长 (h)
    workingHours: string;
    // 亮灯率(%)
    lightingRateUnit: string;
    // 节能率(%)
    energySavingRateUnit: string;
  };
}
