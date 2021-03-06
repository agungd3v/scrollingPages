class ScrollPages {
  constructor({
    section,
    navigation = {
      item: true,
      color: '#ffffff',
      direction: {
        align: 'vertical',
        position: 'right'
      },
      size: 6
    },
    scrolling = 'vertical'
  }) {
    try {
      if (section === undefined) {
        console.error('Oops, maybe you forgot to mark the part that is needed :(')
        return false
      }
      this.scrollView(section, navigation, scrolling)
    } catch (error) {
      console.error(error)
    }
  }
  scrollView(section, navigation, scrolling) {
    let eLto = 0
    const sections = document.querySelectorAll(section)
    sections.forEach(e => {
      e.classList.add('w-full', 'h-screen')
    })
    sections[0].parentElement.classList.add('h-screen', 'overflow-hidden', 'relative')
    if (scrolling === 'horizontal') {
      sections[0].parentElement.style.display = 'flex'
      sections.forEach(e => {
        e.style.flexShrink = '0'
      })
    } else if (scrolling === 'vertical') {
      sections[0].parentElement.style.removeProperty('display')
      sections.forEach(e => {
        e.style.removeProperty('flexShrink')
      })
    } else {
      sections[0].parentElement.style.removeProperty('display')
      sections.forEach(e => {
        e.style.removeProperty('flexShrink')
      })
    }
    if (navigation.item === true) {
      const crtWrapperNavs = document.createElement('div')
      const crtNavs = document.createElement('ul')
      crtNavs.classList.add('navs', 'flex', 'justify-center', 'items-center')
      if (navigation.direction === undefined) {
        crtWrapperNavs.classList.add('fixed', 'nav-vertical-right')
        crtNavs.classList.add('flex-col')
      } else {
        if (navigation.direction.align === 'vertical') {
          crtNavs.classList.add('flex-col')
        } else if (navigation.direction.align === 'horizontal') {
          crtNavs.classList.add('flex-row')
        } else {
          navigation.direction.align = 'vertical'
          crtNavs.classList.add('flex-col')
        }
        if (navigation.direction.position === 'right'
            || navigation.direction.position === 'bottom'
            || navigation.direction.position === 'left'
            || navigation.direction.position === 'top'
            || navigation.direction.position === 'top-right' 
            || navigation.direction.position === 'bottom-right'
            || navigation.direction.position === 'top-left'
            || navigation.direction.position === 'bottom-left'
        ) {
          crtWrapperNavs.classList.add('fixed', `nav-${navigation.direction.align}-${navigation.direction.position}`)
        } else {
          crtWrapperNavs.classList.add('fixed', `nav-${navigation.direction.align}-right`)
        }
      }
      crtWrapperNavs.append(crtNavs)
      sections[0].parentElement.append(crtWrapperNavs)
      sections.forEach(() => {
        const navItem = `<li class="nav-item rounded-full"></li>`
        crtNavs.innerHTML += navItem
      })
      const navItem = document.querySelectorAll('.nav-item')
      navItem[eLto].classList.add('active')
      navItem.forEach((e, i) => {
        if (navigation.color !== undefined) {
          navigation.color.split('')[0].toString() !== '#' ? e.style.backgroundColor = '#ffffff' : e.style.backgroundColor = navigation.color
        } else {
          e.style.backgroundColor = '#ffffff'
        }
        if (!Number.isInteger(navigation.size)) {
          e.style.width = 6 + 'px'
          e.style.height = 6 + 'px'
        } else {
          e.style.width = navigation.size + 'px'
          e.style.height = navigation.size + 'px'
        }
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