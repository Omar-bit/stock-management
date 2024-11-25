import React from 'react'
import PieChartC from '../components/PieChartC'
import BarChartC from '../components/BarChartC'
import Layout from '../Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Statistique() {
  const navigate = useNavigate()

  const [data, setData] = React.useState([])
  const [capital, setCapital] = React.useState(0)
  const [topFive, setTopFive] = React.useState([])
  const [barChartData, setBarChartData] = React.useState([])

  const [norm, setNorm] = React.useState('jour')
  async function getCap() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/stats/getCap',
        {
          headers: { token: localStorage.getItem('token') },
        }
      )
      if (data.status === 'ko') {
        navigate(`/produit`)
      } else {
        setCapital(data.data.cap)
      }
    } catch (err) {
      console.log(err)
    }
    //setData(res.data)
  }
  async function getTopF() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/stats/getTop5',
        {
          headers: { token: localStorage.getItem('token') },
        }
      )
      if (data.status === 'ko') {
        navigate(`/produit`)
      } else {
        console.log(data)
        setTopFive(data.data)
      }
    } catch (err) {
      console.log(err)
    }
    //setData(res.data)
  }
  async function barCharData() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/stats/barChart/' + norm,
        {
          headers: { token: localStorage.getItem('token') },
        }
      )
      console.log(data);
      if (data.status === 'ko') {
        navigate(`/produit`)
      } else {
        console.log(data)
        setBarChartData(data.data)
      }
    } catch (err) {
      console.log(err)
    }
    //setData(res.data)
  }
  React.useEffect(() => {
    getCap()
    getTopF()
  }, [])
  React.useEffect(() => {
    barCharData()
  }, [norm])
  return (
    <Layout>
      <div className='relative  bg-third p-2 w-[100%] h-[90vh] rounded-3xl lg:h-[80vh]  lg:w-[73%]   lg:py-5 overflow-y-scroll	shadow-xl'>
        {/*HEADER*/}
        <h2 className='text-center text-2xl font-bold text-forth '>
          Statistiques
        </h2>
        <div className='mt-5 flex flex-col gap-5 items-center    '>
          <div className='relative w-[100%]  h-[200px] flex justify-center '>
            <BarChartC data={barChartData} />
            <div className='absolute top-0 right-5 flex gap-4'>
              <select
                name=''
                id=''
                value={norm}
                onChange={(e) => setNorm(e.target.value)}
              >
                <option value='jour'>jour</option>
                <option value='mois'>mois</option>
                <option value='annee'>annee</option>
              </select>
            </div>
          </div>
          <div className='w-full flex flex-col gap-5 justify-center   items-end lg:flex-row lg:px-3 md:items-center lg:py-2 lg:items-end'>
            <div className='flex flex-col items-center justify-center h-[250px]  p-2 mx-auto w-[75%] lg:w-[100%]        '>
              <h2 className='font-semibold text-forth'>Top 5 Sold Products</h2>
              <PieChartC data={topFive} />
            </div>
            <div className='flex justify-around w-full items-center  lg:gap-5  md:justify-end  '>
              <h5 className='font-bold text-forth text-xl lg:text-sm'>
                Capital
              </h5>{' '}
              <h4 className='font-bold bg-forth py-1 px-3 rounded-2xl text-third text-lg lg:text-sm'>
                {capital} TND
              </h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Statistique
