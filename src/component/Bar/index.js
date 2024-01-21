import * as echarts from 'echarts'
import React, { useRef, useEffect } from 'react'

function Bar ({ title, xData, yData, style }) {
  const domRef = useRef()

  useEffect(() => {
    const charInit = () => {
      const myChart = echarts.init(domRef.current)
      // 绘制图表
      myChart.setOption({
        title: { text: title },
        tooltip: {},
        xAxis: { data: xData },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: yData,
          },
        ],
      })
    }

    charInit()
  }, [title, xData, yData, style]) // Add dependencies here

  return (
    <div>
      <div ref={domRef} style={style}></div>
    </div>
  )
}

export { Bar }
