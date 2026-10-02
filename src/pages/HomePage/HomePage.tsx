import React from 'react'
import MainHeader from '../../components/ui/MainHeader'
import MainFooter from '../../components/ui/MainFooter'
import MainHome from '../../components/ui/MainHome'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-amber-50/30">
      <MainHeader />
      <main className="grow">
        <MainHome />
      </main>
      <MainFooter />
    </div>
  )
}

export default HomePage
