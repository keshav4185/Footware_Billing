import React from 'react'
import Homesection1 from '../../Component/Home/Homesection1'
import Homesection2 from '../../Component/Home/Homesection2'
import Homesection3 from '../../Component/Home/Homesection3'
import Homesection4 from '../../Component/Home/Homesection4'
import Homesection5  from '../../Component/Home/Homesection5'
import Homesection6 from '../../Component/Home/Homesection6'
import Homesection7 from '../../Component/Home/Homesection7'
import Homesection8 from '../../Component/Home/Homesection8'
import Homesection9 from '../../Component/Home/Homesection9'
import ScrollReveal from '../../Component/ScrollReveal'

function HomePage() {
  return (
    <div className="overflow-hidden">
      
      <ScrollReveal animation="fadeIn">
        <Homesection1/>
      </ScrollReveal>

      <ScrollReveal animation="slideInLeft" delay={100}>
        <Homesection2/>
      </ScrollReveal>

      <ScrollReveal animation="slideInRight" delay={200}>
        <Homesection3/>
      </ScrollReveal>

      <ScrollReveal animation="fadeInUp">
        <Homesection4/>
      </ScrollReveal>

      <ScrollReveal animation="scale-in" delay={100}>
        <Homesection5/> 
      </ScrollReveal>

      <ScrollReveal animation="slideInLeft">
        <Homesection6/>
      </ScrollReveal>

      <ScrollReveal animation="slideInRight" delay={100}>
        <Homesection7/>
      </ScrollReveal>

      <ScrollReveal animation="fadeInUp">
        <Homesection8/>
      </ScrollReveal>

      <ScrollReveal animation="fadeIn">
        <Homesection9/>
      </ScrollReveal>
    </div>
  )
}

export default HomePage;
