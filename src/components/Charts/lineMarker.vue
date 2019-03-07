<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    charts_data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      chart: null,
      legend: []
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const option = {
        backgroundColor: '#f9f9f9',
        /* title: {
         top: 20,
         text: 'Requests',
         textStyle: {
         fontWeight: 'normal',
         fontSize: 16,
         color: '#F1F1F3'
         },
         left: '1%'
         },*/
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
            /* lineStyle: {
              color: '#57617B'
            }*/
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          // data: ['CMCC', 'CTCC', 'CUCC'],
          // data: this.charts_data.legend,
          // data: ['庆阳市', '武威市', '益阳市', '金华市']
          data: this.legend
          /* right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }*/
        },
        grid: {
          top: 100,
          left: '0%',
          right: '4%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,

          data: this.charts_data.x_axis
        }],
        yAxis: [{
          type: 'value',
          name: '价格',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: []
      }

      this.charts_data.series.map((v, i) => {
        v.type = 'line'
        v.stack = '总量' + i
        // v.data = v.value
        this.legend.push(v.name)
      })
      option.series = this.charts_data.series
      console.log('option', option)
      this.chart.setOption(option)
    }
  }
}
</script>
