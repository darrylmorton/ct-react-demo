import styled from '@emotion/styled'

import '../../hamburger-menu.css'

export const HamburgerMenu = ({ selectedPage }: { selectedPage: string }) => {
  return (
    <nav role="navigation">
      <div id="menuToggle">
        <input type="checkbox" id="menuCheckbox" />

        <span></span>
        <span></span>
        <span></span>

        <ul id="menu">
          <li>
            {selectedPage === 'home' ? (
              <SelectedMenuItem>Home</SelectedMenuItem>
            ) : (
              <label htmlFor="menuCheckbox">
                <a href="/">Home</a>
              </label>
            )}
          </li>
          <li>
            {selectedPage === 'about' ? (
              <SelectedMenuItem>About</SelectedMenuItem>
            ) : (
              <label htmlFor="menuCheckbox">
                <a href="/about">About</a>
              </label>
            )}
          </li>
          <li>
            <label htmlFor="menuCheckbox">
              <a>Contact</a>
            </label>
          </li>
        </ul>
      </div>
    </nav>
  )
}

const SelectedMenuItem = styled.div`
  color: grey;
`
