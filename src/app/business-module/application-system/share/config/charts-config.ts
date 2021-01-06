import {AlarmLevelStatisticsConst, alarmLevelStatusConst} from '../const/application-system.const';
import {ElectricityFmtModel, StatisticalChartModel} from '../model/lighting.model';
import {getAlarmLevelStatus, getAlarmLevel} from '../util/application.util';
import {AlarmColorUtil} from '../util/alarm-color-util';
import {NzI18nService} from 'ng-zorro-antd';
import {OnlineLanguageInterface} from '../../../../../assets/i18n/online/online-language.interface';
import {ApplicationInterface} from '../../../../../assets/i18n/appliction/application.interface';

export class ChartsConfig {
  /**
   * 设备状态
   */
  public static equipmentStatus(data: object, $nzI18n): object {
    const list = ChartsConfig.emergencyFmt(data, $nzI18n);
    const pieName = list.map(item => item.name);
    return {
      tooltip: {
        trigger: 'item',
        formatter: function (value) {
          return `${value.name}：${value.value}(${Math.round(value.percent)}%)`;
        }
      },
      legend: {
        top: 20,
        type: 'scroll',
        left: 'center',
        data: pieName
      },
      color: ['#248cca', '#FF0000', '#898989', '#36cfc9', '#CCCDCD', '#ff6000', '#5B86E8'],
      series: [
        {
          type: 'pie',
          radius: ['40%', '55%'],
          center: ['50%', '65%'],
          data: list,
          label: {
            formatter: function (val) {
              return `${val.name}：${val.value}(${val.percent.toFixed(2)}%)`;
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  /**
   * 告警分类统计
   */
  public static alarmStatistics(data: object, $nzI18n: NzI18nService): object {
    const list = ChartsConfig.alarmLevelStatistics(data, $nzI18n);
    const pieName = list.map(item => item.name);
    return {
      tooltip: {
        trigger: 'item',
        formatter: function (val) {
          return `${val.name}：${val.value}(${Math.round(val.percent)}%)`;
        },
      },
      legend: {
        top: 20,
        left: 'center',
        data: pieName
      },
      color: ['#FF0000', '#FF5A00', '#FFD215', '#00A0DC'],
      series: [
        {
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          startAngle: 180,
          data: list,
          label: {
            formatter: function (val) {
              return `${val.name}：${val.value}(${Math.round(val.percent)}%)`;
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  /**
   * 亮灯率
   * @ param data
   */
  public static lightingRate(data, type: number, language: OnlineLanguageInterface): object {
    const statisticsData = ChartsConfig.dataFmt(data);
    return {
      tooltip: {
        trigger: 'axis',
        formatter: function (list) {
          for (let i = 0; i < list.length; i++) {
            return `${list[i].name}<br/>${list[i].marker}${list[i].seriesName}: ${list[i].value}%`;
          }
        }
      },
      grid: {
        left: '4%',
        right: '10%',
        bottom: '3%',
        containLabel: true
      },
      color: ['#1890ff'],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: statisticsData._xData,
        axisLine: {
          lineStyle: {
            color: '#d9d9d9',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333',  // 更改坐标轴文字颜色
          }
        },
      },
      yAxis: {
        name: `${language.company}:(%)`,
        nameTextStyle: {
          color: '#333'
        },
        type: 'value',
        min: 0,
        interval: 20,
        max: 100,
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#d9d9d9',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333',  // 更改坐标轴文字颜色
          }
        },
      },
      series: [
        {
          name: language.lightingRate,
          type: 'line',
          stack: language.total,
          data: statisticsData.yAxis
        }
      ]
    };
  }

  /**
   * 告警统计
   */
  public static emergency(data: object, $nzI18n: NzI18nService): object {
    const list = ChartsConfig.alarmLevelFmt(data, $nzI18n);
    return {
      tooltip: {
        trigger: 'item',
        formatter: function (val) {
          return `${val.name}：${val.value}(${Math.round(val.percent)}%)`;
        },
      },
      color: ['#f5a04e', '#00ADCF', '#9186e0', '#efc136', '#f65f31', '#34eec2'],
      legend: {
        top: 20,
        type: 'scroll',
        left: 'center',
        data: list.map(item => item.name)
      },
      series: [
        {
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: list,
          label: {
            formatter: function (val) {
              return `${val.name}：${val.value}(${Math.round(val.percent)}%)`;
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  /**
   * 工单增量
   */
  public static  workOrder(data: object, language: OnlineLanguageInterface) {
    const statisticsData = ChartsConfig.workOrderFmt(data, 'formatDate', 'count');
    return {
      tooltip: {
        trigger: 'axis',
        formatter: function (list) {
          for (let i = 0; i < list.length; i++) {
            return `${list[i].name}<br/>${list[i].marker}${list[i].seriesName}: ${list[i].value}个`;
          }
        }
      },
      grid: {
        left: '4%',
        right: '8%',
        bottom: '3%',
        containLabel: true
      },
      color: ['#1890ff'],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: statisticsData.xAxis,
        axisLine: {
          lineStyle: {
            color: '#d9d9d9',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333',  // 更改坐标轴文字颜色
          }
        },
      },
      yAxis: {
        name: `${language.company}:(${language.individual})`,
        nameTextStyle: {
          color: '#333'
        },
        type: 'value',
        minInterval: 1, // 设置成1保证坐标轴分割刻度显示成整数
        min: 0,
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#d9d9d9',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333',  // 更改坐标轴文字颜色
          }
        },
      },
      series: [
        {
          name: language.workOrderIncrement,
          type: 'line',
          stack: language.total,
          data: statisticsData.yData
        }
      ]
    };
  }

  /**
   * 用电量统计
   */
  public static electricity(data: ElectricityFmtModel[], electricityNumber: number, language: OnlineLanguageInterface): object {
    return {
      tooltip: {
        trigger: 'axis',
        formatter: function (list) {
          for (let i = 0; i < list.length; i++) {
            return `${list[i].name}<br/>${list[i].marker}${list[i].seriesName}: ${list[i].value[1]}kwh`;
          }
        }
      },
      grid: {
        left: '4%',
        right: '8%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
      },
      color: ['#36cfc9'],
      yAxis: [
        {
          name: `${language.company}:(kwh)`,
          type: 'value',
          min: 0,
          splitLine: {
            show: false
          },
        },
      ],
      series: [{
        symbolSize: function (item) {
          return Math.round(item[1]) > 50 ? 50 : Math.round(item[1]);
        },
        name: language.electricityConsumption,
        data: ChartsConfig.electricityFmt(data, 'statisticsTime', 'electCons', electricityNumber),
        type: 'scatter'
      }]
    };
  }

  /**
   * 把数据处理成需要的格式
   * @ param data
   */
  public static dataFmt(data = []) {
    const yAxis = [];
    const yData = [];
    const _xData = [];
    const xAxis = Object.keys(data);
    xAxis.sort((a, b) => Number(a.replace(/-/g, '')) - Number(b.replace(/-/g, '')));
    xAxis.forEach(item => {
      data[item].forEach(elem => {
        yAxis.push((Math.ceil(elem.lightingRate * 100)) / 100);
        yData.push([elem.statisticsTime, elem.lightingRate]);
        _xData.push(elem.statisticsTime);
      });
    });
    return {xAxis, yAxis, yData, _xData};
  }

  /**
   * 用电量统计需要的数据格式
   * @ param data
   */
  public static electricityFmt(data: ElectricityFmtModel[], x: string, y: string, electricityNumber: number): ElectricityFmtModel[] {
    if (data && data.length) {
      return data.reduce((prev, item) => {
        let xAxis;
        switch (electricityNumber) {
          case 5:
            xAxis = `${item[x].replace('-', '年第')}周`;
            break;
          case 6:
            xAxis = `${item[x].replace('-', '年')}月`;
            break;
          case 7:
            xAxis = `${item[x].replace('-', '年第')}季度`;
            break;
          case 8:
            xAxis = `${item[x]}年`;
            break;
          default:
            break;
        }
        prev.push([xAxis, item[y]]);
        return prev;
      }, []);
    }
    return [];
  }

  /**
   * 工单增量统计
   * @ param data 数据
   * @ param x x轴
   * @ param y y轴
   */
  static workOrderFmt(data, x: string, y: string) {
    const xAxis = [];
    const yData = [];
    if (data && data.length) {
      data.forEach(item => {
        xAxis.push(item[x]);
        yData.push((item[y]));
      });
    }
    return {xAxis, yData};
  }

  /**
   * 设备统计
   * @ param data
   */
  public static emergencyFmt(data, $nzI18n: NzI18nService) {
    const emergencyArr = [];
    // 过滤不需要添加的数据
    const alarmData = AlarmColorUtil.alarmStatistics($nzI18n);
    alarmData.forEach(item => {
      data.forEach(value => {
        if (value.equipmentStatus === item.num) {
          item.value = value.equipmentNum;
        }
      });
      emergencyArr.push({
        name: item.name,
        value: item.value || 0
      });
    });
    return emergencyArr;
  }

  /**
   * 告警级别统计
   * @ param data
   * @ param $nzI18n
   */
  public static alarmLevelStatistics(data, $nzI18n: NzI18nService) {
    const alarmLevelArr = [];
    // 过滤不需要添加的数据
    const index = [
      AlarmLevelStatisticsConst.urgent,
      AlarmLevelStatisticsConst.secondary,
      AlarmLevelStatisticsConst.tips,
      AlarmLevelStatisticsConst.main,
    ];
    Object.getOwnPropertyNames(data).forEach(key => {
      if (index.includes(key)) {
        alarmLevelArr.push({
          name: getAlarmLevel($nzI18n, key),
          value: data[key]
        });
      }
    });
    return alarmLevelArr;
  }

  /**
   * 告警统计
   * @ param data
   * @ param $nzI18n
   */
  public static alarmLevelFmt(data, $nzI18n: NzI18nService) {
    const alarmLevelArr = [];
    // 过滤不需要添加的数据
    const index = [
      alarmLevelStatusConst.signal,
      alarmLevelStatusConst.businessQuality,
      alarmLevelStatusConst.environmentalScience,
      alarmLevelStatusConst.power,
      alarmLevelStatusConst.security,
      alarmLevelStatusConst.equipment
    ];
    Object.getOwnPropertyNames(data).forEach(key => {
      if (index.includes(key)) {
        alarmLevelArr.push({
          name: getAlarmLevelStatus($nzI18n, key),
          value: data[key]
        });
      }
    });
    return alarmLevelArr;
  }

  /**
   * 折线图
   * @ param data
   */
  public static workOrderIncrement(data: StatisticalChartModel, type: string , language: ApplicationInterface) {
    //  区分是工单增量/ 设备节目投放数量/ 设备播放时长
    const name = (type === 'workOrderIncrement') ? language.frequentlyUsed.workOrder
      : (type === 'programCount') ? language.informationWorkbench.programLaunchQuantity :
        language.informationWorkbench.playingTime ;
    return {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.xData,
        axisLine: {
          lineStyle: {
            color: '#d9d9d9',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333',  // 更改坐标轴文字颜色
          }
        },
      },
      grid: {
        left: 50,
        right: 50,
        height: '160px'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 去掉移动的指示线
          type: 'none'
        },
        formatter: function (params) {
          return `${params[0].name}<br/>${params[0].marker}${name}: ${params[0].value}`;
        }
      },
      yAxis: {
        name: data.company,
        nameTextStyle: {
          color: '#333'
        },
        type: 'value',
        minInterval: 1, // 设置成1保证坐标轴分割刻度显示成整数
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#d9d9d9', // 更改坐标轴线的颜色
          },
        },
        axisLabel: {
          textStyle: {
            color: '#333',  // 更改坐标轴文字颜色
          }
        },
      },
      series: [{
        data: data.data,
        type: 'line',
        lineStyle: {
          color: '#1890ff' // 改变折线颜色
        },
        itemStyle: {
          normal: {
            color: '#1890ff' // 折线点的颜色
          }
        }
      }]
    };
  }

  /**
   * 报表分析折线图
   */
  public static reportAnalysis(data) {
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        type: 'scroll',
        data: data.legend,
        x: 'center',
        top: 20,
        width: 500,
        height: 20,
        textStyle: {
          padding: 2,
          fontSize: 12,
          lineHeight: 30,
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {
            icon: 'path://M803.61 126.49c26.34 0 51.14 10.24 69.85 28.83 18.71 18.59 29.01 43.25 29.01 69.44v579.28c0 54.19-44.35 98.27-98.85 98.27H220.89c-54.51 0-98.85-44.08-98.85-98.27V224.7' +
              '6c0-54.19 44.35-98.27 98.85-98.27h582.72m0-57.69H220.89C134.38 68.8 64 138.76 64 224.76v579.28c0 86 70.38 155.96 156.89 155.96h582.72c86.5 0 156.89-69.96 156.89-155.96V224.76c0-86-' +
              '70.39-155.96-156.89-155.96z M669.14 435.18H355.37c-28.83 0-51.41-26.94-51.41-61.34V147.49c0-34.39 22.58-61.34 51.41-61.34h313.77c28.83 0 51.41 26.94 51.41 61.34v226.36c0 34.39-22.58 ' +
              '61.33-51.41 61.33z m-306.86-58h299.95c0.19-0.92 0.32-2.04 0.32-3.34V147.49c0-1.29-0.13-2.41-0.32-3.34H362.28c-0.19 0.92-0.32 2.04-0.32 3.34v226.36c-0.01 1.29 0.13 2.41 0.32 3.33z ' +
              'M568.48 313.88h44.83c12.38 0 22.41-9.97 22.41-22.28v-66.84c0-12.3-10.03-22.28-22.41-22.28h-44.83c-12.38 0-22.41 9.97-22.41 22.28v66.84c0 12.3 10.04 22.28 22.41 22.28z',
            iconStyle: {
              color: '#36cfc9',
              borderColor: '#36cfc9',
              borderStyle: 'solid',
              borderWidth: 0.5
            },
            emphasis: {
              iconStyle: {
                color: '#36cfc9', // 图片Tip提示文字颜色
                // textPosition: 'top'
                fontSize: 12,
              }
            },
          }
        },
        itemSize: 17,
        right: 68,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.xData,
        axisLabel: {
            interval: 0,
            rotate: 45
        }
      },
      yAxis: {
        type: 'value',
      },
      series: data.yData
    };
  }
}
