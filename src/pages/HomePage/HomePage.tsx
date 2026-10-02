import React from 'react'
import MainHeader from '../../components/MainHeader'
import MainFooter from '../../components/MainFooter'
import MainHome from '../../components/MainHome'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-amber-50/30">
      <MainHeader />
      <main className="flex-grow">
        <MainHome />
      </main>
      <MainFooter />
    </div>
  )
}

export default HomePage
