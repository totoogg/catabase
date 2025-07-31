import csl from './Author.module.css';

export const Author = () => {
  return (
    <div className={csl.author}>
      <h2>About the author</h2>
      <div className={csl.content}>
        <div className={csl.photo}></div>
        <div className={csl.text}>
          <h3>Uladzimir Hancharou</h3>
          <p>
            Frontend developer with experience in creating modern web
            applications on React.
          </p>
          <p>
            Aspiring React developer with foundational knowledge of JavaScript,
            HTML, and CSS. Gained experience through personal projects and
            online courses. Eager to develop skills in web application
            development and learn new technologies. Confident in my ability to
            work in a team and quickly adapt to new tools.
          </p>
        </div>
      </div>
    </div>
  );
};
