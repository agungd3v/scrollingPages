class ScrollPages {
  constructor({ section, navigation = { item: true, color: '#ffffff' } }) {
    try {
      if (section === undefined) {
        console.error('Oops, maybe you forgot to mark the part that is needed :(')
        return false
      }
      this.scrollView(section, navigation)
    } catch (error) {
      console.error(error)
    }
  }
  scrollView(section, navigation) {
    let eLto = 0
    const sections = document.querySelectorAll(section)
    sections.forEach(e => {
      e.classList.add('w-full', 'h-screen')
    })
    sections[0].parentElement.classList.add('h-screen', 'overflow-hidden')
    if (navigation.item === true) {
      const crtWrapperNavs = document.createElement('div')
      crtWrapperNavs.classList.add('fixed', 'nav-container')
      const crtNavs = document.createElement('ul')
      crtNavs.classList.add('navs', 'flex', 'flex-col', 'justify-center', 'items-center')
      crtWrapperNavs.append(crtNavs)
      sections[0].parentElement.append(crtWrapperNavs)
      sections.forEach(() => {
        const navItem = `<li class="nav-item rounded-full"></li>`
        crtNavs.innerHTML += navItem
      })
      const navItem = document.querySelectorAll('.nav-item')
      navItem[eLto].classList.add('active')
      navItem.forEach((e, i) => {
        e.setAttribute('style', `background-color: ${navigation.color}`)
        e.addEventListener('click', function() {
          navItem[eLto].classList.remove('active')
          sections[i].scrollIntoView({
            behavior: 'smooth'
          })
          eLto = i
          navItem[eLto].classList.add('active')
        })
      })
      document.querySelector('html, body').addEventListener('wheel', wheel => {
        wheel.preventDefault()
        let wheelY = Math.floor(wheel.deltaY)
        if (wheelY > 0) {
          if (eLto === sections.length - 1) {
            return false
          } else {
            navItem[eLto].classList.remove('active')
            eLto++
            sections[eLto].scrollIntoView({
              behavior: 'smooth'
            })
            navItem[eLto].classList.add('active')
          }
        } else {
          if (eLto === 0) {
            return false
          } else {
            navItem[eLto].classList.remove('active')
            eLto--
            sections[eLto].scrollIntoView({
              behavior: 'smooth'
            })
            navItem[eLto].classList.add('active')
          }
        }
      }, { passive: false })
    } else if (navigation.item === false || navigation.item === undefined) {
      document.querySelector('html, body').addEventListener('wheel', wheel => {
        wheel.preventDefault()
        let wheelY = Math.floor(wheel.deltaY)
        if (wheelY > 0) {
          if (eLto === sections.length - 1) {
            return false
          } else {
            eLto++
            sections[eLto].scrollIntoView({
              behavior: 'smooth'
            })
          }
        } else {
          if (eLto === 0) {
            return false
          } else {
            eLto--
            sections[eLto].scrollIntoView({
              behavior: 'smooth'
            })
          }
        }
      }, { passive: false })
    } else {
      console.error('Oops. Navigation contains only true or false, the default for navigation is true even if you did not enter it :)')
      return false
    }
  }
}