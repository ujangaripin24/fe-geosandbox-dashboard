import React from 'react'
import MainHeader from '../../components/MainHeader'
import MainFooter from '../../components/MainFooter'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between pt-16">
      <MainHeader />
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-heading">HomePage</h1>
        </div>
      </main>
      <MainFooter />
    </div>
  )
}

export default HomePage
