const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: true,
  delay: 3000,
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    720: {
      slidesPerView: 2,
    },
  },
})

document.addEventListener('DOMContentLoaded', () => {
  const dropdownToggleList = document.getElementsByClassName('dropdown-toggle')
  const dropdownMenu = document.getElementById('dropdown-menu')
  const body = document.body

  for (let i = 0; i < dropdownToggleList.length; i++) {
    addDropdownEventListener(dropdownToggleList[i])
  }

  function addDropdownEventListener(element) {
    element.addEventListener('click', () => {
      if (dropdownMenu.classList.contains('open')) {
        dropdownMenu.classList.remove('open')
        body.classList.remove('open')
      } else {
        dropdownMenu.classList.add('open')
        body.classList.add('open')
      }
    })
  }

  let counter = 0
  const favoriteEls = document.getElementsByClassName('card__icon')
  const badgeEl = document.getElementById('badge')
  badgeEl.classList.add('display-none')

  for (let i = 0; i < favoriteEls.length; i++) {
    addFavoriteEventListener(favoriteEls[i])
  }

  function addFavoriteEventListener(element) {
    element.addEventListener('click', () => {
      if (element.classList.contains('active')) {
        element.classList.remove('active')
        counter--
      } else {
        element.classList.add('active')
        counter++
      }

      badgeEl.innerHTML = counter
      if (counter > 0) {
        badgeEl.classList.remove('display-none')
      } else {
        badgeEl.classList.add('display-none')
      }
    })
  }
})
