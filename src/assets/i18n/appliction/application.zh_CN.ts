export default {
  // 策略类型
  policyControl: {
    lighting: '照明策略',
    information: '信息发布策略',
    broadcast: '广播发布策略',
    linkage: '联动策略',
    centralizedControl: '安防监控策略'
  },
  // 执行周期
  execType: {
    nothing: '无',
    daily: '每天',
    workingDay: '工作日',
    vacations: '节假日',
    execution: '间隔执行',
    custom: '自定义'
  },
  // 门锁
  doorNumber: {
    doorOne: '门1',
    doorTwo: '门2',
    doorThree: '门3',
    doorFour: '门4',
  },
  // 执行周期
  executionCycleType: {
    none: '无',
    everyDay: '每天',
    workingDay: '工作日',
    holiday: '节假日',
    intervalExecution: '间隔执行',
    custom: '自定义',
  },
  // 告警级别
  alarmLevel: {
    urgent: '紧急',
    main: '主要',
    secondary: '次要',
    tips: '提示',
  },
  // 执行状态
  execStatus: {
    free: '空闲',
    implement: '执行中'
  },
  // 控制状态
  controlType: {
    platform: '平台控制',
    equipment: '设备控制'
  },
  // 策略状态
  strategyStatus: {
    open: '启用',
    close: '禁用'
  },
  // 设备状态
  equipmentStatus: {
    unSet: '未配置',
    online: '正常',
    alarm: '告警',
    break: '故障',
    offline: '离线',
    outOfContact: '失联',
    dismantled: '已拆除',
    event: '事件',
  },
  conditionType: {
    event: '事件',
    alarm: '告警',
    trigger: '触发器',
  },
  // 告警统计
  alarmLevelStatus: {
    signal: '通信告警',
    businessQuality: '业务质量告警',
    environmentalScience: '环境告警',
    power: '电力告警',
    security: '安全告警',
    equipment: '设备告警'
  },
  // 节目状态
  programStatus: {
    toBeReviewed: '待审核',
    reviewed: '已审核',
    auditFailed: '审核未通过',
    disabled: '已禁用',
    underReviewed: '审核中',
    enabled: '已启用',
  },
  // 文件类型
  fileType: {
    video: '视频',
    image: '图片',
    text: '字幕'
  },
  // 工单状态
  workOrderState: {
    assigning: '指派中',
    assigned: '已指派',
    underReview: '审核中',
    completed: '已完成',
    chargeback: '已退单',
    cancelled: '已取消'
  },
  // 表格
  equipmentTable: {
    assetNumber: '资产编号',
    equipmentName: '名称',
    equipment: '设备',
    facilities: '设施列表',
    group: '分组',
    loop: '回路',
    equipmentType: '类型',
    equipmentStatus: '状态',
    equipmentModel: '型号',
    supplier: '供应商',
    scrapTime: '报废年限',
    open: '开启',
    close: '关闭',
    confirmOpen: '确定开启',
    confirmClose: '确定关闭',
    upElectric: '上电',
    downElectric: '下电',
    confirmUpElectric: '确定上电',
    confirmDownElectric: '确定下电',
    light: '亮度',
    moreOperate: '更多操作',
    details: '查看详情',
    equipmentDetail: '设备详情',
    distribution: '策略下发',
    brightness: '亮度调整',
    groupName: '分组名称',
    remark: '备注',
    gate: '合闸',
    pull: '拉闸',
    confirmPull: '确认拉闸',
    confirmGate: '确认确认合闸',
    equipmentList: '设备列表',
    groupList: '分组列表',
    loopList: '回路列表',
    switch: '开',
    shut: '关',
    play: '播放',
    confirmPlay: '确认播放',
    lighting: '照明设备',
    doorOpen: '非法开门',
    circuitDetails: '回路详情',
    loopControl: '回路控制',
    lampControl: '照明回路',
    loopOperation: '回路操作',
    associatedFacilities: '回路关联设施',
    currentPage: '当前第',
    strategyConsole: '照明策略工作台',
    page: '页',
    common: '共',
    total: '共计',
    strip: '条',
    supported: '暂时不支持该功能!',
    groupStatue: '分组控制',
    strategyIssued: '策略已下发',
    strategyOperationIssued: '确认执行策略下发',
    strategyLightIntensity: '光照强度值为正整数!'
  },
  electricityDate: {
    week: '周',
    month: '月',
    quarter: '季度',
    year: '年'
  },
  workOrderList: {
    lastYear: '最近一年',
    lastMonth: '最近30天',
    lastWeek: '最近7天'
  },
  lightRateList: {
    lastYear: '本年',
    lastMonth: '本月',
    lastWeek: '本周'
  },
  enableOnvifState: {
    yes: '是',
    no: '否'
  },
  conditionsMet: {
    all: '必须同时满足',
    single: '满足一个即可'
  },
  // 策略列表
  strategyList: {
    strategyName: '策略名称',
    strategyType: '策略类型',
    effectivePeriodTime: '有效期',
    releaseStrategy: '信息发布策略',
    execCron: '执行周期',
    day: '天',
    execStatus: '执行状态',
    createTime: '创建时间',
    applyUser: '申请人',
    remark: '备注',
    strategyStatus: '策略状态',
    strategyAdd: '新增',
    strategyDelete: '删除',
    strategyEdit: '编辑',
    confirmDelete: '是否确定删除',
    moveOutOfTheLoop: '是否确定移出该数据',
    enable: '启用',
    confirmEnable: '是否确定启用',
    deactivation: '停用',
    confirmDeactivation: '是否确定禁用',
    selectDisabled: '请选择禁用的数据',
    deviceModeDoesItMatch: '请校验控制类型和设备模式是否匹配',
    selectEnable: '请选择启用的数据',
    equipmentCode: '资产编号',
    equipmentName: '名称',
    equipmentAdd: '添加策略',
    newStrategy: '新增策略',
    equipmentEdit: '编辑策略',
    equipmentTip: '提示',
    conditions: '以下条件和动作至少各输入一项',
    term: '条件',
    action: '动作',
    switch: '开关',
    lightIntensity: '光照强度',
    timeInterval: '时段',
    eventSources: '其他事件源',
    event: '事件源',
    dimming: '调光',
    save: '保存',
    selectEquipment: '选择设备',
    alarmList: '告警列表',
    eventList: '事件列表',
    alarmName: '告警名称',
    alarmObject: '告警对象',
    alarmDeviceName: '设备名称',
    areaName: '区域',
    address: '详细地址',
    alarmFixedLevel: '告警级别',
    responsibleDepartment: '责任单位',
    previousStep: '上一步',
    nextStep: '下一步',
    confirm: '确认',
    cancel: '取消',
    strategyDetails: '策略详情',
    deletePolicy: '删除策略',
    sureDelete: '是否确定删除',
    strategiesUse: '使用中的策略',
    allStrategy: '全部策略',
    timeSlot: '播放时段',
    add: '添加',
    noData: '暂无数据',
    programSelection: '节目选择',
    loop: '循环',
    noLoop: '不循环',
    volume: '音量',
    cycleMode: '播放模式',
    moveUp: '上移',
    moveDown: '下移',
    programList: '节目列表',
    programName: '节目名称',
    programPurpose: '节目用途',
    duration: '时长',
    mode: '格式',
    resolution: '分辨率',
    programFileName: '节目文件',
    trigger: '触发条件',
    sourceType: '事件源类型',
    performAction: '执行动作',
    addDevice: '添加设备',
    setCommand: '设置指令',
    screen: '信息屏',
    singleControl: '单灯控制器',
    multiControl: '集中控制器',
    equipmentType: '设备类型',
    lamp: '灯',
    enableNow: '立即启用',
    applicationScope: '应用范围',
    daysBetween: '间隔天数',
    execution: '执行日期',
    intervalTimeTips: '间隔天数必须在有效期范围内!',
    disabledPolicy: '禁用中的策略不可下发!',
    controlType: '控制类型',
    enableStatus: '启用状态',
    loopId: '回路id',
    loopName: '分组名称',
    basicInformation: '策略基本信息',
    updateTime: '更新时间',
    createUser: '创建人',
    singleLights: '单灯数量',
    controlQuantity: '集控数量',
    wisdomPoles: '智慧杆数量',
    convenient: '便捷入口',
    policySelected: '暂未选中策略',
    lightingRate: '亮灯率',
    workOrder: '工单增量',
    equipmentStatus: '设备状态统计',
    electricity: '用电量',
    alarmStatistics: '告警统计',
    loopDefinition: '回路名称',
    distribution: '所属配电箱',
    loopCode: '回路编码',
    loopStatus: '回路状态',
    controlObj: '控制对象',
    centralController: '所属集中控制器',
    facilities: '分组设施',
    more: '更多',
    effectivePeriodStart: '开始时间',
    effectivePeriodEnd: '结束时间',
    operationUser: '操作用户',
    operationTime: '操作时间',
    operationResult: '操作结果',
    operationDetails: '操作详情',
    workbenchStrategy: '还没有照明策略哦，快去创建吧~',
    information: '没有更多信息了~',
    pleaseSelectProgram: '请选择节目',
    pleaseInputShowTime: '请输入展示时长',
    playProgramList: '播放列表',
    dragToSort: '拖动表格行数据可排序',
    timePeriodCrossingErrTip: '播放时段与已填写的有交叉,请重新输入！',
    execTimeErrorTip: '请先输入有效期!',
    lightValueErrorTip: '请输入光照强度的数值!',
    sameTimeErrorTip: '时段不能重复！',
    onlyEndTime: '不能只选结束时间',
    deleteMsg: '删除策略成功！',
    sunrise: '日出',
    sunset: '日落',
    custom: '自定义时段',
    coincident: '满足条件',
    addTrigger: '添加触发条件',
    addAction: '添加执行动作',
    triggerEquipment: '触发设备',
    noXMlInfoMsg: '当前选择的设备未配置相关协议脚本！',
    triggerConditionMustMsg: '请先选择触发条件！'
  },
  // 内容列表
  contentList: {
    programName: '节目名称',
    programPurpose: '节目用途',
    duration: '时长',
    format: '格式',
    fileType: '类型',
    resolvingPower: '分辨率',
    applicant: '申请人',
    addBy: '添加人',
    addTime: '添加时间',
    checker: '审核人',
    auditTime: '审核时间',
    programFiles: '节目文件',
    preview: '预览',
    initiateAudit: '发起审核',
    theProgramIsPlaying: '节目正在播放中',
    failedToReviewThePlayingContent: '播放内容审核未通过',
    playbackDisabled: '播放内容已禁用',
    editContent: '编辑内容',
    addContent: '新增内容',
    programDescription: '节目描述',
    size: '大小',
    type: '类型',
    pleaseUploadVideoOrPicture: '请上传视频或图片',
    describeProgram: '描述该节目内容用途',
    automaticAcquisition: '上传文件自动获取',
    backstageAutoFill: '后台自动填充',
    successful: '执行成功',
    distribution: '指令已下发',
    groupDetail: '分组详情',
    basicOperation: '策略基本操作',
    programAdd: '添加节目',
    selectProgram: '选择节目',
    displayDuration: '展示时长',
    repeatProgram: '不能添加重复的节目',
    contentList: '内容列表',
    otherDepartments: '不可操作其他部门!',
    notDelete: '发起审核的节目不可删除!',
    canEnabled: '只有已审核或已禁用的节目才可以启用!',
    canDisabled: '只有已启用的节目才可以禁用!',
    fileRestrictions: '请上传小于10MB的文件!',
    resolutionFormat: '文件内容超出分辨率格式范围(1280*512)!',
  },
  // 内容审核
  auditContent: {
    workOrderName: '工单名称',
    personLiable: '责任人',
    workOrderStatus: '工单状态',
    expectedCompletionTime: '期望完工时间',
    actualCompletionTime: '实际完工时间',
    creationTime: '创建时间',
    examineOpinion: '审核意见',
    examineContent: '审核内容',
    reasonsForTransfer: '转派原因',
    chargebackReason: '退单原因',
    cannotBeDeleted: '已指派的工单不可删除',
    cannotBeCancel: '工单不可取消',
    workOrderInformation: '工单基本信息',
    transfer: '转派',
    chargeback: '退单',
    basicOperation: '策略基本操作',
    contentExamine: '内容审核',
    programApplicant: '节目申请人',
    programPurpose: '节目用途',
    findingsOfAudit: '审核结果',
    designatedPerson: '指定人',
    deleteTheWorkOrder: '是否确认删除工单',
    cancelTheWorkOrder: '是否确认取消工单',
    contentAudit: '内容审核工单',
    deleteOthers: '无法删除他人工单!',
    notDelete: '该工单正在处理中，不能删除',
    contentWorkOrder: '内容工单',
  },
  // 信息工作台
  informationWorkbench: {
    enabledSuccessfully: '启用成功',
    disableSuccessfully: '禁用成功',
    startStatistics: '开始统计',
    quantityStatistics: '告警分类数量统计',
    programLaunchQuantity: '设备节目投放数量',
    playingTime: '设备播放时长',
    createIt: '还没有信息发布哦，快去创建吧 ',
    workbench: '信息发布工作台',
    programDistribution: '节目下发',
  },
  // 安防工作台
  securityWorkbench: {
    workbench: '工作台',
    channelName: '通道名称',
    channelNumber: '通道号',
    channelStatus: '通道状态',
    cameraType: '摄像机接入类型',
    onvifStatus: '是否启用ONVIF探测',
    onvifIp: '探测ONVIF IP',
    onvifPort: '探测ONVIF端口',
    onvifAccount: '探测ONVIF 用户名',
    onvifPassword: '探测ONVIF密码',
    rtspAddr: '摄像机接入RTSP地址',
    onvifAddr: '摄像机接入ONVIF地址',
    cameraAccount: '摄像机用户名',
    cameraPassword: '摄像机密码',
    videoRetentionDays: '录像保留天数（天）',
    audioSwitch: '其它设置',
    selectDevice: '选择设备',
    cameraIp: '摄像机ip',
    cameraPort: '摄像机端口',
    sslStatus: '是否启用',
    sslCertFile: 'SSL证书上传',
    httpsPort: 'HTTPS端口号',
    sslKeyFile: 'SSL秘钥上传',
    platform: '接入平台',
    deviceSerial: '设备序列号',
    platformIp: 'IP地址',
    deviceName: '设备名称',
    listenPort: '监听端口',
    password: '接入密码',
    basicConfiguration: '基础配置',
    certificateConfiguration: '证书配置',
    accessPlatform: '第三方接入平台',
    channelList: '通道列表',
    channelConfiguration: '通道配置',
    splitScreenSetting: '分屏设置',
    allOn: '全部开启',
    closeAll: '全部关闭',
    noEquipment: '无设备',
    fillInChannel: '请填写通道配置',
    fillInBasic: '请填写基础配置',
    selectedQuantity: '选中的数量不能超过',
    presetBitSetting: '预置位设置',
    preset: '预置点',
    enableOnvifProbe: '启用ONVIF探测',
    accessDetails: '通道详情',
  },
  // 设备地图
  equipmentMap: {
    addAttention: '添加关注',
    changeGroup: '分组变更',
    collectSuccess: '关注成功',
    notGroup: '未分组',
    pleaseChoose: '请先框选',
  },
  // 常用
  frequentlyUsed: {
    serialNumber: '序号',
    operate: '操作',
    state: '状态',
    remarks: '备注',
    incident: '事件',
    add: '新增',
    delete: '删除',
    confirmDelete: '是否确认删除',
    enable: '启用',
    confirmEnable: '是否确认启用',
    deactivation: '停用',
    confirmDeactivation: '是否确认禁用',
    edit: '编辑',
    deleteSucceeded: '删除成功',
    confirm: '确认',
    cancel: '取消',
    viewDetails: '查看详情',
    pass: '通过',
    noPass: '不通过',
    submit: '提交',
    unit: '单位',
    piece: '个',
    hour: '小时',
    second: '秒',
    strategiesUse: '使用中的策略',
    allStrategy: '全部策略',
    open: '开',
    close: '关',
    executionCycle: '执行周期',
    convenientEntrance: '便捷入口',
    brightness: '亮度',
    volume: '音量',
    noPolicySelected: '暂未选中策略',
    workOrder: '工单增量',
    equipmentStatus: '设备状态统计',
    reminder: '温馨提示',
    validity: '有效期',
    page: '页',
    strip: '条',
    common: '共',
    currentNo: '当前第',
    total: '共计',
    yes: '是',
    no: '否',
    select: '单选',
    disabled: '禁用',
    isEnable: '是否启用',
    openVolume: '开启音频',
    closeVolume: '关闭音频',
    uploadTips: '请上传MP4,3GP,jpg,gif,bmp类型的文件',
    facilityList: '设施列表',
    pleaseChoose: '请选择',
    switch: '开关',
    bitsAtMost: '最多输入255位!',
    operationSuccess: '操作成功!',
    commandSuccessful: '指令下发成功!',
    failedCommand: '指令下发失败!',
    groupDetail: '分组详情',
    apertureReduction: '光圈+',
    apertureAmplification: '光圈-',
    focusAdjustment: '聚焦+',
    focusPostAdjustment: '聚焦-',
    focusBecomesSmaller: '调焦+',
    focusBecomesLarger: '调焦-',
    upElectric: '上电',
    downElectric: '下电',
    goToPresetPosition: '转到预置位',
    selectChannel: '请至少选择一个通道',
    noPlayableChannel: '暂无可播放的通道',
    notPermission: '您暂无操作权限!',
    playingVideo: '请选择正在播放中的视频!',
    firstVideo: '请先播放视频!',
    configurationAdded: '基础配置添加完成!',
    isFirst: '已经是第一个啦!',
    isLast: '已经是最后一个啦!',
    tip: '提示',
  },
  // 报表分析
  reportAnalysis: {
    analysisTable: '统计表',
    pleaseChooseWeek: '请选择周',
    pleaseChooseMonth: '请选择月份',
    pleaseChooseYear: '请选择年',
    exportSuccess: '创建导出任务成功',
    reportAnalysis: '报表分析',
    electricCurrent: '电流报表',
    voltage: '电压报表',
    powerReport: '功率报表',
    electricEnergy: '电能报表',
    powerFactorReport: '功率因数报表',
    electricityConsumption: '用电量',
    electricityConsumptionReport: '用电量报表',
    workingTime: '工作时长',
    workingTimeReport: '工作时长报表',
    lightingRate: '亮灯率报表',
    energySavingRateReport: '节能率报表',
    energySavingRate: '节能率',
    equipmentType: '设备类型',
    statisticalDimension: '统计维度',
    statisticalScope: '统计范围',
    timeType: '时间类型',
    area: '区域',
    group: '分组',
    equipment: '设备',
    day: '日',
    week: '周',
    month: '月',
    year: '年',
    areaName: '区域名称',
    areaLevel: '区域级别',
    selectArea: '选择区域',
    groupName: '分组名称',
    equipmentName: '设备名称',
    time: '时间',
    summaryGraph : '统计图',
    inputCurrent: '输入电流',
    minInputCurrent: '最小输入电流',
    maxInputCurrent: '最大输入电流',
    aEffectiveValueOfCurrent: 'A相电流有效值 (A)',
    bEffectiveValueOfCurrent: 'B相电流有效值 (A)',
    cEffectiveValueOfCurrent: 'C相电流有效值 (A)',
    minAEffectiveValueOfCurrent : '最小A相电流有效值 (A)',
    maxAEffectiveValueOfCurrent : '最大A相电流有效值 (A)',
    minBEffectiveValueOfCurrent : '最小B相电流有效值 (A)',
    maxBEffectiveValueOfCurrent : '最大B相电流有效值 (A)',
    minCEffectiveValueOfCurrent : '最小C相电流有效值 (A)',
    maxCEffectiveValueOfCurrent : '最大C相电流有效值 (A)',
    // 输入电压
    inputVoltage: '输入电压',
    // 最小输入电压
    minInputVoltage : '最小输入电压 (V)',
    // 最大输入电压
    maxInputVoltage : '最大输入电压 (V)',
    //  A相电压有效值(V)
    aEffectiveValueOfVoltage : 'A相电压有效值 (V)',
    // B相电压有效值(V)
    bEffectiveValueOfVoltage: 'B相电压有效值 (V)',
    //  C相电压有效值(V)
    cEffectiveValueOfVoltage : 'C相电压有效值 (V)',
    // AB相电压有效值(V)
    abEffectiveValueOfVoltage : 'AB线电压',
    // BC相电压有效值(V)
    bcEffectiveValueOfVoltage : 'BC线电压',
    // CA相电压有效值(V)
    caEffectiveValueOfVoltage : 'CA线电压',
    // 最小A相电压有效值
    minAEffectiveValueOfVoltage : '最小A相电压有效值',
    // 最大A相电压有效值
    maxAEffectiveValueOfVoltage : '最大A相电压有效值',
    // 最小B相电压有效值
    minBEffectiveValueOfVoltage : '最小B相电压有效值',
    // 最大B相电压有效值
    maxBEffectiveValueOfVoltage : '最大B相电压有效值',
    // 最小C相电压有效值
    minCEffectiveValueOfVoltage : '最小C相电压有效值',
    // 最大C相电压有效值
    maxCEffectiveValueOfVoltage : '最大C相电压有效值',
    // 最小AB线电压
    minABEffectiveValueOfVoltage : '最小AB线电压',
    // 最大AB线电压
    maxABEffectiveValueOfVoltage : '最大AB线电压',
    // 最小BC线电压
    minBCEffectiveValueOfVoltage : '最小BC线电压',
    // 最大BC线电压
    maxBCEffectiveValueOfVoltage : '最大BC线电压',
    // 最小CA线电压
    minCAEffectiveValueOfVoltage : '最小CA线电压',
    // 最大CA线电压
    maxCAEffectiveValueOfVoltage : '最大CA线电压',
    // 功率
    power : '功率',
    // 最小功率
    minPower : '最小功率',
    // 最大功率
    maxPower : '最大功率',
    // 瞬时总有功功率
    activePower : '瞬时总有功功率',
    // 瞬时A相有功功率
    aActivePower : '瞬时A相有功功率',
    // 瞬时B相有功功率
    bActivePower : '瞬时B相有功功率',
    // 瞬时C相有功功率
    cActivePower : '瞬时C相有功功率',
    // 瞬时总无功功率
    reactivePower : '瞬时总无功功率',
    // 瞬时A相无功功率
    aReactivePower : '瞬时A相无功功率',
    // 瞬时B相无功功率
    bReactivePower : '瞬时B相无功功率',
    // 瞬时C相无功功率
    cReactivePower : '瞬时C相无功功率',
    // 最小瞬时总有功功率
    minActivePower : '最小瞬时总有功功率',
    // 最大瞬时总有功功率
    maxActivePower : '最大瞬时总有功功率',
    // 最小瞬时A相有相功率 (kw)
    minAActivePower : '最小瞬时A相有相功率 (kw)',
    // 最大瞬时A相有相功率(kw)
    maxAActivePower : '最大瞬时A相有相功率 (kw)',
    // 最小瞬时B相有功功率
    minBActivePower : '最小瞬时B相有功功率',
    // 最大瞬时B相有功功率
    maxBActivePower : '最大瞬时B相有功功率',
    // 最小瞬时C相有功功率
    minCActivePower : '最小瞬时C相有功功率',
    // 最大瞬时C相有功功率
    maxCActivePower : '最大瞬时C相有功功率',
    // 最小瞬时总无功功率
    minReactivePower : '最小瞬时总无功功率',
    // 最大瞬时总无功功率
    maxReactivePower : '最大瞬时总无功功率',
    // 最小瞬时A相无功功率
    minAReactivePower : '最小瞬时A相无功功率',
    // 最小瞬时A相无功功率
    maxAReactivePower : '最大瞬时A相无功功率',
    // 最小瞬时B相无功功率
    minBReactivePower : '最小瞬时B相无功功率',
    // 最大瞬时B相无功功率
    maxBReactivePower : '最大瞬时B相无功功率',
    // 最小瞬时C相无功功率
    minCReactivePower : '最小瞬时C相无功功率',
    // 最大瞬时C相无功功率
    maxCReactivePower : '最大瞬时C相无功功率',
    // 电能
    energy : '电能',
    // 总相正向有功电能量
    activeElectricEnergy : '总相正向有功电能量',
    // A相正向有功电能量
    aActiveElectricEnergy : 'A相正向有功电能量',
    // B相正向有功电能量
    bActiveElectricEnergy : 'B相正向有功电能量',
    // C相正向有功电能量
    CActiveElectricEnergy : 'C相正向有功电能量',
    // 总正向无功电能量
    reactiveEnergy : '总正向无功电能量',
    // A相正向无功电能量
    aReactiveEnergy : 'A相正向无功电能量',
    // B相正向无功电能量
    BReactiveEnergy : 'B相正向无功电能量',
    // C相正向无功电能量
    CReactiveEnergy : 'C相正向无功电能量',
    // 瞬时总相功率因数
    powerFactor : '瞬时总相功率因数',
    // 瞬时A相功率因数
    APowerFactor : '瞬时A相功率因数',
    // 瞬时B相功率因数
    BPowerFactor : '瞬时B相功率因数',
    // 瞬时C相功率因数
    CPowerFactor : '瞬时C相功率因数',
    // 最小瞬时总相功率因数
    minPowerFactor : '最小瞬时总相功率因数',
    // 最大瞬时总相功率因数
    maxPowerFactor : '最大瞬时总相功率因数',
    // 最小瞬时A相功率因数
    minAPowerFactor : '最小瞬时A相功率因数',
    // 最大瞬时A相功率因数
    maxAPowerFactor : '最大瞬时A相功率因数',
    // 最小瞬时B相功率因数
    minBPowerFactor : '最小瞬时B相功率因数',
    // 最大瞬时B相功率因数
    maxBPowerFactor : '最大瞬时B相功率因数',
    // 最小瞬时C相功率因数
    minCPowerFactor : '最小瞬时C相功率因数',
    // 最大瞬时C相功率因数
    maxCPowerFactor : '最大瞬时C相功率因数',
    workingHours: '工作时长 (h)',
    lightingRateUnit: '亮灯率 (%)',
    energySavingRateUnit: '节能率 (%)',
  }
};
