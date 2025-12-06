import styled from '@emotion/styled'

import '../../hamburger-menu.css'

export const HamburgerMenu = ({ selectedPage }: { selectedPage: string }) => {
  return (
    <nav role="navigation" data-testid="hamburger-menu">
      <div id="menuToggle">
        <input type="checkbox" id="menuCheckbox" />

        <span></span>
        <span></span>
        <span></span>

        <ul id="menu">
          <li>
            {selectedPage === 'home' ? (
              <SelectedMenuItem data-testid="selected-menu-item-home">
                Home
              </SelectedMenuItem>
            ) : (
              <label htmlFor="menuCheckbox">
                <a href="/">Home</a>
              </label>
            )}
          </li>
          <li>
            {selectedPage === 'about' ? (
              <SelectedMenuItem data-testid="selected-menu-item-about">
                About
              </SelectedMenuItem>
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
