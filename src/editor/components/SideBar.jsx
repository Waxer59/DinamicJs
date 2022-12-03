import { useState } from 'react';

export const SideBar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const onSkypackClick = () => {
    window.open("https://www.skypack.dev/", '_blank', 'noopener,noreferrer');
  };
  return (
    <aside className={`menu ${menuActive ? 'menu-active' : ''}`} id="menu">
      <header>
        <ul>
          <li
            className="menu-btn-toggle"
            onClick={() => setMenuActive(!menuActive)}
            key={0}
          >
            <button className="menu-btn">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </li>
          <li key={1}>
            <button>
              <i className="fa-solid fa-upload"></i>
            </button>
            <span>Upload</span>
          </li>
          <li key={2}>
            <button>
              <i className="fa-solid fa-file-arrow-down"></i>
            </button>
            <span>Download</span>
          </li>
          <li key={3}>
            <button onClick={onSkypackClick}>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m19.82 11.27-5.997-2.994 5.999-2.993c.28-.14.453-.42.453-.734a.815.815 0 0 0-.454-.735L12.366.087a.814.814 0 0 0-.733 0L4.178 3.814a.815.815 0 0 0-.453.735v7.454c0 .28.15.548.384.699l.07.034 5.998 2.994-5.999 2.993a.815.815 0 0 0-.453.734c0 .314.174.594.453.735l7.455 3.727a.814.814 0 0 0 .361.081.814.814 0 0 0 .361-.081l7.454-3.727c.28-.14.455-.42.455-.735v-7.454a.785.785 0 0 0-.443-.733zm-7.814-9.54 5.625 2.819-5.625 2.818L6.38 4.55zm-6.64 4.135 4.811 2.41-4.81 2.412zm1.014 6.138 5.626-2.819 5.625 2.82-5.625 2.818zm4.81 5.044v4.81l-4.81-2.41zm7.455 1.91-5.824 2.911v-5.625l5.824-2.912v5.625z" />
              </svg>
            </button>
            <span>Skypack</span>
          </li>
          <li key={4}>
            <button>
            <i className="fa-solid fa-face-smile"></i>
            </button>
            <span>Emojis</span>
          </li>
        </ul>
      </header>
      <footer>
        <ul>
          <li className="settings" key={5}>
            <button>
              <i className="fa-solid fa-gear"></i>
            </button>
            <span>Settings</span>
          </li>
        </ul>
      </footer>
    </aside>
  );
};
