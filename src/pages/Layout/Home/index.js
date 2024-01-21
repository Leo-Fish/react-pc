import { Bar } from "@/component/Bar"

function Home () {
  return (
    <div>
      <Bar title='title'
        xData={['react', 'vue', 'angular']}
        yData={[20, 30, 40]}
        style={{ width: '300px', height: '300px' }} />
      <Bar title='title2'
        xData={['react', 'vue', 'angular']}
        yData={[20, 30, 40]}
        style={{ width: '300px', height: '300px' }} />
    </div>
  )
}

export default Home