import styles from './Header.module.css';

export default function Header(props) {
  function changeMode(event) {
    props.setExpertMode(event.target.checked);
  }

  return (
    <header className="flex mb-16">
      <h1 className="w-min table-caption font-black">Root Finder</h1>
      <div className="flex ml-auto my-auto">
        <span className="my-auto">Expert Mode</span>
        <label className={`ml-4 ${styles.switch}`}>
          <input type="checkbox" onChange={changeMode}></input>
          <span className={`${styles.slider} ${styles.round}`}></span>
          <span></span>
        </label>
      </div>
    </header>
  );
}
